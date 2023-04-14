import InputFile, {IUploadedFiles} from "../../components/Input/InputFile";
import {useRef, useState} from "react";
import React from 'react'
import {useApiPost} from "../../../API";
import { IMessageModel } from "./IChat";


interface ISendMessage{
    chatId: number,
    isPrivat: boolean
    onSend: (message: IMessageModel ) => void
}



export const SendMessage = ({chatId, isPrivat, onSend}: ISendMessage) => {

    const [message, setMessage] = useState<string>('')
    const [messageFile, setMessageFile] = useState<IUploadedFiles[]>([])

    // Костыль для окрываеия окна с файлами
    const fileInputWrap: any = useRef(null);
    const addFile = () => {
        fileInputWrap.current.querySelector('input[type="file"]').click()
    }
    //Костыль для файлов
    const [keyFile, setKeyFile] = useState(0)


    const onChangeFile = (value: any) => {
        setMessageFile(value)
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            sendMessage()
        }
    }


    interface IChatSend{
        Y: string,
        post: string,
        qqq: null
    }
    const [fetch, {isLoading}] = useApiPost<IMessageModel>('chat/send')

    const sendMessage = () => {
        fetch({
            chatId,
            privat: isPrivat ? 'Y' : 'N',
            message,
            messageFile: messageFile
        }).then(r => {
            console.log("!!!!!!!!!!!!",keyFile);
            onSend(r)
            setMessage('')
            setMessageFile([])
            setKeyFile(prev => (prev + 1))
        })

    }


    return (<>


        <div
            className='card-footer pt-2 pb-0 px-0 d-flex'
        >
                <textarea
                    className='form-control form-control-flush mb-3'
                    rows={1}
                    data-kt-element='input'
                    placeholder='Сообщение'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onEnterPress}
                ></textarea>

            <div className='d-flex flex-stack'>
                <div className='d-flex align-items-center me-2'>
                    <button
                        onClick={addFile}
                        className='btn btn-sm btn-icon btn-active-light-primary me-1'
                        type='button'
                        data-bs-toggle='tooltip'
                        title='Coming soon'
                    >
                        <i className='bi bi-paperclip fs-3'></i>
                    </button>
                    {/* <button
                            className='btn btn-sm btn-icon btn-active-light-primary me-1'
                            type='button'
                            data-bs-toggle='tooltip'
                            title='Coming soon'
                        >
                            <i className='bi bi-upload fs-3'></i>
                        </button>*/}
                </div>

                <button
                    className='custom-btn bg-main'
                    type='button'
                    data-kt-element='send'
                    onClick={sendMessage}
                >
                    Отправить
                    {isLoading && (<span>...</span>)}
                </button>
            </div>
        </div>

        <div ref={fileInputWrap}>
            <InputFile key={keyFile} onChange={onChangeFile} value={messageFile} isEdit={true} isShowBtn={false} />
        </div>
    </>)
}