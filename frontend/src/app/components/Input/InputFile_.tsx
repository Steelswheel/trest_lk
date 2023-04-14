import {useEffect, useState} from 'react';
import * as authHelper from '../../modules/auth/core/AuthHelpers';
import {
    UploadOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileExclamationOutlined,
    FileImageOutlined
} from '@ant-design/icons';
import {Button, Upload} from 'antd';
import type {RcFile, UploadProps, UploadFile} from 'antd/es/upload/interface';
import {cloneDeep} from 'lodash';
import 'antd/dist/antd.css';

const API_URL = process.env.REACT_APP_API_URL + '/api';

interface IInputFile {
    value: Array<UploadFile> | []
    isEdit: boolean
    onChange: any
    accept?: string | undefined
    listType?: 'text' | 'picture' | 'picture-card',
    isShowBtn?: boolean,
    openWindow?: void,
    uploadDir?: {[key: string]: string} | undefined
}

export default function InputFile(
    {
        value,
        isEdit,
        onChange,
        accept = '.docx,.pdf,.png,.git,.jpg,.jpeg,.xls,.xlsx,.zip',
        listType = 'picture',
        isShowBtn = true,
        uploadDir = undefined
    }: IInputFile
) {
    let startValue: Array<UploadFile> | [] = [];

    useEffect(() => {
        startValue = value && value.length > 0 ? value : [];
    }, [value])

    const [files, setFiles] = useState(startValue); //основные загруженные файлы
    const [uploadedFiles, setUploadedFiles] = useState(startValue); //вспомогательный state для исправления бага

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            setFiles(prevState => {
                const arr: Array<UploadFile> = [];

                uploadedFiles.forEach(file => {
                    if (!arr.find(item => item.uid === file.uid)) {
                        arr.push(file);
                    }
                });

                prevState.forEach(file => {
                    if (!arr.find(item => item.uid === file.uid)) {
                        arr.push(file);
                    }
                });

                return arr;
            });

            onChange(uploadedFiles);
        }
    }, [uploadedFiles, setFiles]);

    function getFileIcon(file: UploadFile, fontSize = '1rem') {
        switch (file.type) {
            case 'image/png':
            case 'image/jpeg':
                return <FileImageOutlined style={{color: '#8757E8', fontSize}}/>;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FileWordOutlined style={{color: '#2c77b1', fontSize}}/>;
            case 'text/plain':
            case 'application/pdf':
                return <FilePdfOutlined style={{color: '#d73b41', fontSize}}/>;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
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
        data: uploadDir,
        onChange({file, fileList}) {
            /**
             * Этот кусок кода убирает баг в библиотеке
             * Если не использовать, то часть файлов будет
             * отображаться как недозагруженные
             */
            if (file.status === 'done') {
                let find = uploadedFiles.find(item => item.uid === file.uid);

                if (!find) {
                    setUploadedFiles((prevState) => [...prevState, file]);
                }
            }

            setFiles(fileList);
        },
        onRemove(file) {
            let copy = cloneDeep(files);
            let index = copy.findIndex(item => item.uid === file.uid);
            copy.splice(index, 1);

            setFiles(copy);
            setUploadedFiles(copy);
        },
        onPreview: async function (file) {
            let url = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + file.url : file.url;

            let src = url as string;

            if (!src) {
                src = await new Promise((resolve) => {
                    const reader = new FileReader();

                    reader.readAsDataURL(file.originFileObj as RcFile);
                    reader.onload = () => resolve(reader.result as string);
                });
            }

            const image = new Image();
            image.src = src;

            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        },
        iconRender: getFileIcon
    };

    return (
        <>
            {isEdit &&
                <Upload {...props}>
                    {isShowBtn && <>
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
            }

            {!isEdit && files &&
                files.map((file: UploadFile, index: number) => (
                    <div
                        className="d-flex align-items-center"
                        key={`uploaded-file-${file.uid}-${index}`}
                    >
                        {file.url && getFileIcon(file, '2rem')}

                        <div className="ms-2 my-2">
                            <a
                                href={process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + file.url : file.url}
                                rel="noreferrer"
                                download
                                target="_blank"
                                className="text-main"
                            >
                                {file.name}
                            </a>
                        </div>
                    </div>
                ))
            }
        </>
    );
}