/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {API_GET, useApiGet, useApiPost} from "../../../API";
import {IBxImMessage, IBxImMessageChat, IBxImMessageDelete, IBxImMessageUpdate} from "../../interface/IWS";
import {IUser, IMessageModel, IResponse} from './IChat'
import {PicChat} from './PicChat'
import {MessageItem} from './MessageItem'
import {SendMessage} from './SendMessage'
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {IUnreadMessages} from "../../store/user.slice";

interface iChatInner{
    chatId: number
    isPrivat: boolean
}



const ChatInner = ({chatId, isPrivat}: iChatInner) => {
    //const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)

    const [messages, setMessages] = useState<IMessageModel[]>([])
    const chatDiv = useRef(null);
    //const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<IUser[]>([])

    /*const userMessage:IUnreadMessages[] = useSelector((state:RootState) => {
        let a = state.user.unreadMessages.filter(i => {
            return i.messageType === 'P' && i.dialogId === chatId
        })
        console.log(a);
        return a
    })*/

    const setMessagesAdd = (m: IMessageModel) => {

        setMessages((prevent) => {
            if(!prevent.find(i => i.id === m.id)){
                return [...prevent, m]
            }
            return prevent
        })
        scrollChat()
    }

    const setMessagesUpdate = (m: IMessageModel) => {
        setMessages((prevent) => {
            let itemMessage = prevent.find(i => i.id === m.id)
            if(itemMessage){
                itemMessage.text = m.text
                itemMessage.files = m.files
                return [...prevent]
            }
            return prevent
        })
        scrollChat()
    }

    const setMessagesDelite = (id: number) => {
        setMessages((prevent) => {
            let itemMessage = prevent.find(i => i.id === id)
            if(itemMessage){
                itemMessage.text = "Это сообщение было удалено."
                itemMessage.files = []
                return [...prevent]
            }
            return prevent
        })
        scrollChat()
    }

    useEffect(() => {
        loadChat()
    }, [chatId, isPrivat]);

    const [fetchLoadChat,{isLoading}] = useApiGet<IResponse>('chat/chat')
    const loadChat = () => {
        fetchLoadChat({
            chatId,
            privat: isPrivat ? 'Y' : 'N'
        }).then(r => {
            setMessages(r.message)
            setUsers(r.users)
            scrollChat()
        })
    }

    const scrollChat = () => {
        setTimeout(() => {
            if(chatDiv && chatDiv.current){
                // @ts-ignore
                chatDiv.current.scrollTop = parseInt(chatDiv.current.scrollHeight);
            }
        }, 1)
    }

    const [fetchSetReadMessage] = useApiPost('chat/setReadMessage')
    const setReadMessage = () => {
        if(isPrivat){
            fetchSetReadMessage({toUserId: chatId, isPrivat: isPrivat ? 'Y' : 'N'})
        }
    }

    const focusRite = () => {
        if(document.hasFocus()){
            setReadMessage()
        }
    }

    useEffect(() => {
        const onEvent = (e:CustomEvent) => {inMessage(e.detail)}
        const onEventChat = (e:CustomEvent) => {inMessageChat(e.detail)}
        const onEventUpdate = (e:CustomEvent) => {inMessageUpdate(e.detail)}
        const onEventDelete = (e:CustomEvent) => {inMessageDelete(e.detail)}

        window.addEventListener("focus", focusRite, false);
        document.addEventListener('bx-im-message', onEvent);
        document.addEventListener('bx-im-messageChat', onEventChat);
        document.addEventListener('bx-im-messageUpdate', onEventUpdate);
        document.addEventListener('bx-im-messageDelete', onEventDelete);
        return () => {
            document.removeEventListener('bx-im-message', onEvent);
            document.removeEventListener('bx-im-messageChat', onEventChat);
            document.removeEventListener('bx-im-messageUpdate', onEventUpdate);
            document.removeEventListener('bx-im-messageDelete', onEventDelete);
            window.removeEventListener("focus", focusRite, false);
        }
    }, [])

    useEffect(() => {

    },[])

    const inMessageDelete = (messageUpdate: IBxImMessageDelete) => {
        setMessagesDelite(messageUpdate.id)
    }

    const inMessageUpdate = (messageUpdate: IBxImMessageUpdate) => {
        fetchMessage({messageId: messageUpdate.id, isPrivat: 'Y'})
            .then(setMessagesUpdate)

    }

    const [fetchMessage] = useApiPost<IMessageModel>('chat/message')

    const inMessageChat = (message: IBxImMessageChat) => {
        const focused = document.hasFocus();
        console.log('inMessageChat',message.message.chatId, chatId);
        if(message.message.chatId === chatId){
            if(focused){
                setReadMessage()
            }
            fetchMessage({messageId: message.message.id, isPrivat: 'N'}).then(r => {
                setMessagesAdd(r)
            })
        }
    }

    const inMessage = (message: IBxImMessage) => {
        const focused = document.hasFocus();
        console.log('message',message);
        if(message.message.senderId === chatId){
            if(focused){
                setReadMessage()
            }
            fetchMessage({messageId: message.message.id, isPrivat: 'Y'}).then(r => {
                setMessagesAdd(r)
            })
        }
    }



    const sendMessage = (message: IMessageModel) => {
        setMessagesAdd(message)
    }

    return (
        <div className='card-body' >

            {isLoading && <div>loading</div>}

            <div
                style={{height: 'calc(100vh - 335px)', overflow: 'auto'}}
                ref={chatDiv}
            >

                {messages && messages.map(message => {
                    let senderId = message.senderId;
                    let user = users.find(i => parseInt(i.id) === senderId)
                    if(!user){
                        console.log('message false');
                        return false;
                    }

                    let src = user.avatar_id ? user.avatar : undefined
                    let name = user.name
                    let lastName = user.last_name

                    return(<div key={message.id}>
                        <div className={`d-flex justify-content-start`}>
                            <div className="d-flex flex-column align-items-start">
                                <div className={`d-flex mb-2`}>
                                    <div className="me-3">
                                        <PicChat src={src} lastName={lastName} name={name}/>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <MessageItem message={message.text} date={message.date} files={message.files}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}

                )}
            </div>

            <SendMessage chatId={chatId} isPrivat={isPrivat} onSend={sendMessage}/>

        </div>
    )
}

export {ChatInner}
