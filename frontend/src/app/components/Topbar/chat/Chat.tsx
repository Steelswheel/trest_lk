import {useDispatch, useSelector} from "react-redux";
import {userActions} from '../../../store/user.slice'
import {RootState} from "../../../store";
import {useEffect} from "react";
import {IBxImMessage, IBxImMessageChat, IBxImReadMessage, IBxImReadMessageChat} from "../../../interface/IWS";







export function Chat() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state:RootState) => state.user)


    const readMessageOpponent = () => {
        // console.log('readMessageOpponent');
    }

    const readMessageChat = (e: CustomEvent<IBxImReadMessageChat>) => {
        dispatch(userActions.chatReadMessage({
            chatId: e.detail.chatId,
            messageId: e.detail.lastId,
            isPrivat: false
        }))
    }
    const readMessage = (e: CustomEvent<IBxImReadMessage>) => {
        dispatch(userActions.chatReadMessage({
            chatId: e.detail.dialogId,
            messageId: parseInt(e.detail.lastId),
            isPrivat: true
        }))
    }

    const messageChat = (e: CustomEvent<IBxImMessageChat>) => {
        if(e.detail.message.senderId !== currentUser.id){
            dispatch(userActions.chatAddMessage({
                chatId: e.detail.message.chatId,
                messageId: e.detail.message.id,
                isPrivat: false,
            }))
        }
    }

    const message = (e: CustomEvent<IBxImMessage>) => {
        if(e.detail.message.senderId !== currentUser.id){
            dispatch(userActions.chatAddMessage({
                chatId: e.detail.message.senderId,
                messageId: e.detail.message.id,
                isPrivat: true,
            }))
        }
    }

    useEffect(() => {
        document.addEventListener('bx-im-readMessageOpponent', readMessageOpponent);
        document.addEventListener('bx-im-readMessage', readMessage);
        document.addEventListener('bx-im-readMessageChat', readMessageChat);
        document.addEventListener('bx-im-message', message);
        document.addEventListener('bx-im-messageChat', messageChat);
    },[])

    return (
        <div className="chat cursor-pointer">
            <div className="chat-icon"></div>
            <div className="chat-count bg-danger d-flex align-items-center justify-content-center">
                <div>{currentUser.unreadMessages.length}</div>
            </div>
        </div>
    );
}