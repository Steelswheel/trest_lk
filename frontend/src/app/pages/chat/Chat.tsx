import {KTSVG} from "../../../_metronic/helpers";
import {ChatInner} from "./ChatInner";
import React, {useEffect, useState} from "react";
import {useApiGet} from "../../../API";
import {PicChat} from "./PicChat";
import {useSelector} from "react-redux";
import {RootState} from "../../store";


interface IChatList{
    name: string
    description: string
    lastMessage: string
    chatId: number
    isPrivat: boolean,
    src: string
    users: object
}

export function Chat() {
    const currentUser = useSelector((state:RootState) => state.user)

    const [chatSelected, setChatSelected] = useState<IChatList>()
    const [getChatList, {isLoading: isLoadingChat, data: chatList}] = useApiGet<IChatList[]>('chat/list')

    useEffect(() => {

        getChatList()

    }, []);

    let chatSelect = (e: React.MouseEvent, chat: IChatList) => {
        setChatSelected(chat)
        e.preventDefault()
    }

    return (
        <div className='d-flex flex-column flex-lg-row'>
            <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
                <div className='card card-flush'>
                    <div className='card-header pt-7' id='kt_chat_contacts_header'>
                        <form className='w-100 position-relative' autoComplete='off'>
                            <KTSVG
                                path='/media/icons/duotune/general/gen021.svg'
                                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
                            />

                            <input
                                type='text'
                                className='form-control form-control-solid px-15'
                                name='search'
                                placeholder='Search by username or email...'
                            />
                        </form>
                    </div>

                    <div className='card-body pt-5' id='kt_chat_contacts_body'>
                        <div
                            className='scroll-y me-n5 pe-5 h-200px h-lg-auto'
                            data-kt-scroll='true'
                            data-kt-scroll-activate='{default: false, lg: true}'
                            data-kt-scroll-max-height='auto'
                            data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                            data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                            data-kt-scroll-offset='0px'
                        >

                            {isLoadingChat && (<span>...</span>)}
                            {!isLoadingChat && chatList && (<>




                                {chatList.map(chat => {

                                    let countMessage = currentUser.unreadMessages.filter(i => {
                                        return i.chatId === chat.chatId && i.isPrivat === chat.isPrivat
                                    }).length

                                    return (<div key={chat.chatId} className='d-flex flex-stack py-4'>
                                        <div className='d-flex align-items-center'>

                                            <PicChat src={chat.src} lastName={chat.name} name={chat.name} size={45}/>

                                            <div className='ms-5'>
                                                <a href='#' onClick={e => chatSelect(e,chat)} className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                                    {chat.name}
                                                </a>
                                                <div className='fw-bold text-gray-400'>{chat.description}</div>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-column align-items-end ms-2'>
                                            <span className='text-muted fs-7 mb-1'> {countMessage}</span>
                                        </div>
                                    </div>)
                                })}

                            </>)}

                        </div>
                    </div>
                </div>
            </div>

            <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
                <div className='card' id='kt_chat_messenger'>
                    <div className='card-header' id='kt_chat_messenger_header'>
                        <div className='card-title'>
                            <div className='symbol-group symbol-hover'></div>
                            <div className='d-flex justify-content-center flex-column me-3'>
                                <a
                                    href='#'
                                    className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1'
                                >
                                    {chatSelected?.name}
                                </a>

                                <div className='mb-0 lh-1'>
                                    <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                                    <span className='fs-7 fw-bold text-gray-400'>Active</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    { chatSelected && <ChatInner chatId={chatSelected.chatId} isPrivat={chatSelected.isPrivat} key={chatSelected.chatId}/> }


                    { !chatSelected && <span>Чат не выбран</span> }

                </div>
            </div>
        </div>
    )
}