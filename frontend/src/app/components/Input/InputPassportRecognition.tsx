import { useState, useRef } from 'react';
import { useLazyUploadPdfQuery, useLazyPassportApiQuery } from './../../store/appApi';
import { upperFirst, lowerCase } from 'lodash';
import { Button, Modal, notification } from 'antd';
import InputString from './InputString';
import InputNumber from './InputNumber';
import InputTextarea from './InputTextarea';
import InputSelect from './InputSelect';
import InputDate from './InputDate';
import 'antd/dist/antd.css';
import moment from 'moment';

interface IPassportParsedData {
    [key: string]: any
}

interface IServerImageResponse {
    tempName: string;
    thumb: string;
    type: string;
    url: string;
}

export default function InputPassportRecognition ({fields, setData, isEdit}: {fields: any, setData: any, isEdit: Boolean}) {
    const [reposPdfData] = useLazyUploadPdfQuery({
        refetchOnFocus: false
    });

    const [reposPassportData] = useLazyPassportApiQuery({
        refetchOnFocus: false
    });

    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [passportImage, setPassportImage] = useState('');
    const [dialogImages, setDialogImages] = useState(false);
    const [serverResponse, setServerResponse] = useState<any>();
    const [parsedPassportData, setParsedPassportData] = useState<IPassportParsedData>();
    const inputFile = useRef<HTMLInputElement>(null);

    function parserData(passportData: any) {
        if (passportData.length > 0) {
            let ar = passportData[0].data.results;

            let NAME = upperFirst(lowerCase(ar.filter((i: any) => i.label === 'name')[0]?.text));
            let LAST_NAME = upperFirst(lowerCase(ar.filter((i: any) => i.label === 'lastname')[0]?.text));
            let SECOND_NAME = upperFirst(lowerCase(ar.filter((i: any) => i.label === 'middlename')[0]?.text));

            let NUMBER = '';
            let SER = '';

            let serial_1_filter = ar.filter((i: any) => i.label === 'serial_1')[0];

            if (serial_1_filter) {
                let serial_1 = serial_1_filter.text;

                if (serial_1) {
                    SER = serial_1.split(' ')[0];
                    NUMBER = serial_1.split(' ')[1];
                }
            }

            let serial_2_filter = ar.filter((i: any) => i.label === 'serial_2')[0];

            if (serial_2_filter) {
                let serial_2 = serial_2_filter.text;

                if (serial_2) {
                    SER = serial_2.split(' ')[0];
                    NUMBER = serial_2.split(' ')[1];
                }
            }

            let KOD = ar.filter((i: any) => i.label === 'issued_number')[0]?.text;

            let issued_date = ar.filter((i: any) => i.label === 'issued_date')[0]?.text;
            let DATE = moment(issued_date).format('DD.MM.YYYY');

            let KEM_VIDAN = ar.filter((i: any) => i.label === 'issued')[0]?.text;

            let BIRTH_PLACE = ar.filter((i: any) => i.label === 'birth_place')[0]?.text;

            let GENDER = ar.filter((i: any) => i.label === 'sex')[0]?.text;

            let bd = ar.filter((i: any) => i.label === 'birth_date')[0]?.text;
            let BIRTHDATE = moment(bd).format('DD.MM.YYYY');

            if (GENDER.match(/^МУЖ/)) {
                GENDER = 'm';
            } else if (GENDER.match(/^ЖЕН/)) {
                GENDER = 'w';
            } else {
                GENDER = '';
            }

            return {
                NAME,
                LAST_NAME,
                SECOND_NAME,
                NUMBER,
                SER,
                KOD,
                DATE,
                KEM_VIDAN,
                BIRTH_PLACE,
                GENDER,
                BIRTHDATE
            }
        }
    }

    function parserApi(imageData: any) {
        let formData = new FormData();

        formData.append('filePath', imageData['tempName']);

        reposPassportData(formData)
        .then((response) => {
            if (response.data && response.data.length > 0) {
                let passportData = JSON.parse(response.data);

                setPassportImage(imageData['url']);
                setLoading(false);

                if (passportData instanceof Object) {
                    if (passportData.result) {
                        let data = parserData(passportData.data);

                        setParsedPassportData(data);

                        setVisibility(true);
                    } else {
                        notification.error({
                            message: 'Ошибка',
                            description: passportData.message,
                            placement: 'top'
                        });
                    }
                } else {
                    notification.error({
                        message: 'Ошибка',
                        description: 'Ошибка сервиса',
                        placement: 'top'
                    });
                }
            }
        })
        .catch(e => {
            notification.error({
                message: 'Ошибка',
                description: e.message,
                placement: 'top'
            });
        })
        .finally(() => setLoading(false));
    }

    function loadFile(file: any) {
        setLoading(true);

        let formData = new FormData();

        formData.append(file.name, file);

        reposPdfData(formData)
        .then((response: any) => {
            if (response.data && response.data.length > 0) {
                let fileDataServer = response.data.filter((i: IServerImageResponse) => i.type === 'img');

                if (fileDataServer.length === 1) {
                    parserApi(fileDataServer[0]);
                } else if (fileDataServer.length > 1) {
                    setServerResponse(fileDataServer);
                    setDialogImages(true);
                } else {
                    notification.error({
                        message: 'Ошибка',
                        description: 'Недопустимый формат файла',
                        placement: 'top'
                    });
                }
            }
        }).catch(e => {
            notification.error({
                message: 'Ошибка',
                description: e.message,
                placement: 'top'
            });
        });
    }

    function onLoadFiles(e: React.ChangeEvent<HTMLInputElement>) {
        let filesObject = e.target.files;

        if (filesObject) {
            for (let file of Array.from(filesObject)) {
                loadFile(file);
            }
        }
        if (inputFile.current) {
            inputFile.current.value = '';
        }
    }

    function handleSetData() {
        if (parsedPassportData) {
            setData(parsedPassportData);
            setVisibility(false);
        }
    }

    function parsedPassportDataHandleChange(value: any, key: string) {
        setParsedPassportData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        });
    }

    return (<>
        {isEdit && 
        <Button 
            onClick={() => inputFile.current?.click()}
            loading={loading}
            className="custom-btn-small bg-main mb-4"
        >
            Распознать реквизиты по фото, PDF
        </Button>}

        <Modal 
            title="Выберите изображение" 
            open={dialogImages}
            footer={false}
            onCancel={() => setDialogImages(false)}
        >
            {serverResponse && dialogImages && 
                serverResponse.map((item: IServerImageResponse) => (
                    <div 
                        key={item.url}
                        style={{
                            width: '150px', 
                            height: '150px', 
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setDialogImages(false);
                            parserApi(item);
                        }}
                    >
                        <img 
                            src={process.env.REACT_APP_API_URL + item.thumb} 
                            style={{objectFit: 'contain', width: '100%', height: '100%'}}
                            alt="pic"
                        />
                    </div>
                ))
            }
        </Modal>

        <Modal 
            title="Паспорт API" 
            open={visibility}
            footer={false}
            onCancel={() => setVisibility(false)}
            style={{minWidth: '50vw'}}
        >
            <div className="d-flex alig-items-center">
                {parsedPassportData && 
                    <div className="row">
                        <div className="col-md-6">
                            <div className="passport-parser-form">
                                <div className="row">
                                    <div className="col-md-4 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Фамилия
                                            </label>
                                            <InputString
                                                value={parsedPassportData.LAST_NAME}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'LAST_NAME')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Имя
                                            </label>
                                            <InputString
                                                value={parsedPassportData.NAME}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'NAME')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Отчество
                                            </label>
                                            <InputString
                                                value={parsedPassportData.SECOND_NAME}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'SECOND_NAME')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Серия
                                            </label>
                                            <InputNumber
                                                value={parsedPassportData.SER}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'SER')}
                                                isEdit={true}
                                                settings={{step: 1}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Номер
                                            </label>
                                            <InputNumber
                                                value={parsedPassportData.NUMBER}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'NUMBER')}
                                                isEdit={true}
                                                settings={{step: 1}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Код
                                            </label>
                                            <InputString
                                                value={parsedPassportData.KOD}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'KOD')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Дата выдачи
                                            </label>
                                            <InputDate
                                                value={parsedPassportData.DATE}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'DATE')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Дата рождения
                                            </label>
                                            <InputDate
                                                value={parsedPassportData.BIRTHDATE}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'BIRTHDATE')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Место рождения
                                            </label>
                                            <InputString
                                                value={parsedPassportData.BIRTH_PLACE}
                                                onChange={(value) => parsedPassportDataHandleChange(value, 'BIRTH_PLACE')}
                                                isEdit={true}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group my-2">
                                    <label htmlFor="">
                                        Кем выдан
                                    </label>
                                    <InputTextarea 
                                        value={parsedPassportData.KEM_VIDAN}
                                        onChange={(e) => parsedPassportDataHandleChange(e, 'KEM_VIDAN')}
                                        isEdit={true}
                                    />
                                </div>

                                <div className="form-group my-2">
                                    <label htmlFor="">
                                        Пол
                                    </label>
                                    <InputSelect 
                                        value={parsedPassportData.GENDER} 
                                        onChange={(value: string) => parsedPassportDataHandleChange(value, 'GENDER')}
                                        isEdit={true}
                                        settings={{
                                            options: [
                                                {
                                                    value: 'm',
                                                    label: 'МУЖ'
                                                },
                                                {
                                                    value: 'w',
                                                    label: 'ЖЕН'
                                                }
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {passportImage && 
                            <div className="col-md-6 passport-parser-image my-2">
                                <img 
                                    src={process.env.REACT_APP_API_URL + passportImage} 
                                    alt="passport"
                                    style={{maxWidth: '100%'}} 
                                />
                            </div>
                        }
                        <div className="col-12 mt-6 text-center">
                            <Button 
                                className="custom-btn bg-main"
                                onClick={handleSetData}
                                style={{margin: '0 auto'}}
                            >
                                Вставить данные
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </Modal>

        <input 
            type="file"
            name="PASSPORT_FILE" 
            style={{display: 'none'}}
            ref={inputFile}
            onChange={onLoadFiles}
            accept=".pdf, .png, .jpg, .jpeg"
        />
    </>);
}