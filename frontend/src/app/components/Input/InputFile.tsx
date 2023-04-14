import {useEffect, useRef, useState} from 'react';
import * as authHelper from '../../modules/auth/core/AuthHelpers';
import {
    UploadOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileExclamationOutlined
} from '@ant-design/icons';
import {Button, Upload} from 'antd';
import type { UploadProps, UploadFile} from 'antd/es/upload/interface';
import 'antd/dist/antd.css';
import {toAbsoluteUrl} from "../../../_metronic/helpers";


const API_URL = process.env.REACT_APP_API_URL + '/api';

interface IInputFile {
    value: IUploadedFiles[]
    isEdit: boolean
    onChange?: any
    accept?: string | undefined
    listType?: 'text' | 'picture' | 'picture-card',
    isShowBtn?: boolean,
    openWindow?: void
}

export interface IUploadedFiles{
    "id": string
    "url": string
    "name": string
    "original_name"?: string
    "size"?: number
    "type"?: string
    "is_image"?: boolean
    thumbUrl?: string
    date?: string
}

export default function InputFile(
    {
        value,
        isEdit,
        onChange,
        accept = '.docx,.pdf,.png,.git,.jpg,.jpeg,.xls,.xlsx,.zip',
        listType = 'picture',
        isShowBtn = true,

    }: IInputFile
) {


    const [files, setFiles] = useState<UploadFile[] | []>([]);
    const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles[] | []>([]); // Загруженные файлы


    useEffect(() => {

        updateValue(value)

    },[value])

    const updateValue = (filesUpdate:IUploadedFiles[] ) => {

        if(!filesUpdate){
            setFiles([])
            return false
        }

        const uids = files.map(i => i.uid)

        const removeList = [...uids]
        filesUpdate.forEach(i => {
            removeList.splice(removeList.findIndex(f => f === i.id),1)
            if(!uids.includes(i.id)){
                // Добавляем
                let filesUpdateAdd: UploadFile = {...i,
                    uid: i.id,
                    url: process.env.REACT_APP_API_URL+i.url,
                    thumbUrl: i.thumbUrl ? process.env.REACT_APP_API_URL+i.thumbUrl : undefined
                }
                setFiles(preventState => {return [...preventState, filesUpdateAdd]})
            }
        })

        // Удаляем значения
        setFiles(preventState => {
            removeList.forEach(i => {
                let f = preventState.find(ii => ii.uid === i)
                if(f && f.url){
                    preventState.splice(preventState.findIndex(f => f.uid === i),1)
                }
            })
            return [...preventState]
        })

    }

    const updateUploadAdd = (files: UploadFile[] | [] ) => {

        const filesFilter:UploadFile[] = files.filter(i => i.response)

        const uploaded:IUploadedFiles[] = filesFilter.map(i => {
            return {
                "id": i.uid,
                "url": i.response?.url,
                "name": i.name,
                "original_name": i.name,
                "size": i.size,
                "type": i.type
            }})

        setUploadedFiles(prev => {
            let ids = prev.map(i => i.id)
            let newValue = uploaded.filter(i => !ids.includes(i.id))
            let newState = [...prev,...newValue]
            onChange(newState);
            return newState
        })
    }

    const updateUpload = (files: UploadFile[] | [] ) => {
        const uploaded:IUploadedFiles[] = files.map(i => {
            return {
            "id": i.uid,
            "url": i.response?.url,
            "name": i.name,
            "original_name": i.name,
            "size": i.size,
            "type": i.type
        }})
        onChange(uploaded);
        setUploadedFiles(uploaded)
    }

    function getFileIcon(file: UploadFile, fontSize = '1rem') {

        const ext = file.name
            ? file.name.match(/\.([^.]+)$|$/)?.[1]
            : ''

        switch (ext) {
            /*case 'png':
            case 'jpeg':
                return <FileImageOutlined style={{color: '#8757E8', fontSize}}/>;*/
            case 'doc':
            case 'docx':
                return <FileWordOutlined style={{color: '#2c77b1', fontSize}}/>;
            //case 'text/plain':
            case 'pdf':
                return <FilePdfOutlined style={{color: '#d73b41', fontSize}}/>;
            case 'xlsx':
            case 'xls':
                return <FileExcelOutlined style={{color: '#54b51e', fontSize}}/>;
            default:
                if (file.thumbUrl) {
                    return (
                        <a className="ant-upload-list-item-thumbnail" href={file.thumbUrl}>
                            <img
                                style={{maxWidth: '30px'}}
                                src={file.thumbUrl}
                                alt={file.name}
                                className="ant-upload-list-item-image"
                            />
                        </a>
                    );
                } else {
                    return <FileExclamationOutlined style={{color: 'grey', fontSize}}/>;
                }
        }
    }

    const token = authHelper.getAuth();

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        accept: accept,
        fileList: files,
        listType: listType,
        action: `${API_URL}/upload`,
        className: 'form-control-input-file',
        headers: {
            Authorization: `${token?.api_token}`
        },
        onChange({file, fileList}) {

            if(file.status === 'done'){
                let updateUploadList = fileList.filter(i => i.response);

                updateUploadAdd(updateUploadList);
            }

            if(file.status === 'removed'){
                updateUpload(fileList);
            }



            setFiles(fileList);
        },
        iconRender: getFileIcon,
        showUploadList: {
            //showDownloadIcon: true,
            //downloadIcon: 'Download',
            showRemoveIcon: isEdit,
            //removeIcon: false,
        },
    };

    return (
        <>
            <Upload {...props}  >
                {isShowBtn && isEdit && <>
                    {listType === 'picture-card' &&
                    <span className='fs-1'>+</span>
                    }

                    {(listType === 'picture' || listType === 'text') &&
                    <Button icon={<UploadOutlined/>}>
                        Добавить
                    </Button>
                    }
                </>}
            </Upload>
        </>
    );
}