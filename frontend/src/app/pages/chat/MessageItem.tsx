import InputFile, {IUploadedFiles} from "../../components/Input/InputFile";

interface IMessageItem{
    message: string,
    date: string
    files: IUploadedFiles[]
}

export const MessageItem = ({message, date, files}:IMessageItem) => {

    return (<>
        {message && <div className="py-1 px-3 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start"
                         data-kt-element="message-text" dangerouslySetInnerHTML={{__html: message}}>

        </div>}


        <InputFile value={files} isEdit={false} listType={"text"}/>
        <span className={`text-muted fs-8 mb-1`}>{date}</span>
    </>)
}