import {IUploadedFiles} from "../../components/Input/InputFile";



export interface IUser {
    id:                 string
    name:               string
    first_name:         string
    last_name:          string
    work_position:      string
    avatar:             string
    avatar_id:          string
}

export interface IMessageModel {
    id:           number
    chatId:       string
    senderId:     number
    date:         string
    text:         string
    files:        IUploadedFiles[],
}

export interface IResponse {
    message: IMessageModel[]
    users: IUser[]
}

