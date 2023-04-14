import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { WrapInput } from './WrapInput';
import { useDispatch } from 'react-redux';
import { setForm } from '../../store/formSlice';
import InputPassportRecognition from './InputPassportRecognition';

interface ISellerPassport {
    [key: string]: any;
}

export default function InputSellerPassport({value, fields, isEdit}: {value: any, fields: any, isEdit: boolean}) {
    const passportObject = {
        UF_ADDRESS: '',
        UF_BIRTH_SELLER: '',
        UF_DATE: '',
        UF_FIO: '',
        UF_GENDER: '',
        UF_KEM_VIDAN: '',
        UF_SELLER_BIRTHDATE: '',
        UF_KOD: '',
        UF_NUMBER: '',
        UF_SER: '',
        UF_SKAN: []
    };

    let startValue = value && value.length > 0 ? cloneDeep(value) : [passportObject];

    const [localValues, setLocalValues] = useState<Array<ISellerPassport> | []>(startValue);
    const [passportInputs, setPassportInputs] = useState<Array<JSX.Element> | []>([]);

    const dispatch = useDispatch();

    function getParsedData(value: any, index: number) {
        setLocalValues(prevState => {
            const arr = cloneDeep(prevState);

            arr[index].UF_NUMBER = value.NUMBER;
            arr[index].UF_SER = value.SER;
            arr[index].UF_KOD = value.KOD;
            arr[index].UF_DATE = value.DATE;
            arr[index].UF_KEM_VIDAN = value.KEM_VIDAN;
            arr[index].UF_FIO = value.LAST_NAME + ' ' + value.NAME + ' ' + value.SECOND_NAME;
            arr[index].UF_BIRTH_SELLER = value.BIRTH_PLACE;
            arr[index].UF_GENDER = value.GENDER;
            arr[index].UF_SELLER_BIRTHDATE = value.BIRTHDATE;

            return arr;
        });
    }

    function handleChange(value: any, id: string, key: string) {
        setLocalValues((prevState) => {
            const arr = cloneDeep(prevState);

            let index = arr.findIndex(item => item.ID === id);

            arr[index][key] = value;

            return arr;
        });
    }

    useEffect(() => {
        const data: any = [];

        localValues.forEach(l_value => {
            const arr: any = [];

            for (let key in fields) {
                if (key !== 'ID') {
                    arr.push(
                        <WrapInput
                            attribute={fields[key]}
                            key={key}
                            settings={fields[key].settings}
                            fields={fields[key].fields}
                            type={fields[key].type}
                            value={l_value[key]}
                            noLabel={false}
                            label={fields[key].label}
                            className={'form-group-mini'}
                            handleChange={(value) => handleChange(value, l_value.ID, key)}
                            isEdit={isEdit}
                        />
                    );
                }
            }

            data.push(arr);
        });

        setPassportInputs(data);

        dispatch(setForm({value: localValues, attribute: 'UF_PASSPORT_SELLER'}));
    }, [localValues, fields, dispatch, isEdit]);

    function addPassport() {
        setLocalValues(prevState => [...prevState, passportObject]);
    }

    function deletePassport(index: number) {
        setLocalValues(prevState => {
            const arr = cloneDeep(prevState);

            arr.splice(index, 1);

            return arr;
        });
    }
    
    return(<>
        {localValues && 
            localValues.map((passport, index) => (
                <div 
                    className="form-group-v1"
                    key={`seller-passport-${index}`}
                >
                    <div className="form-group-v1__label" style={{display: 'block'}}>
                        <label>
                            Продавец {index + 1}
                        </label>

                        {isEdit && 
                            <div className="my-2">
                                <button
                                    className="custom-btn-small bg-main"
                                    onClick={() => deletePassport(index)}
                                >
                                    Удалить
                                </button>
                            </div>
                        }
                    </div>
                    <div className="form-group-v1__value">
                        <InputPassportRecognition setData={(value: any) => getParsedData(value, index)} fields={fields} isEdit={isEdit} />

                        <div 
                            className="form-group-group" 
                            style={{gridTemplate: "'d1 d1' 'd2 d3' 'd4 d5' 'd6 d6' 'd7 d7' 'd8 d8' 'd9 d10' 'd11 d11' / 50% 50%"}}
                        >
                            { passportInputs[index] }
                        </div>
                    </div>
                </div>
            ))
        }

        {isEdit && 
            <button
                className="custom-btn bg-main my-4"
                onClick={() => addPassport()}
            >
                Добавить продавца
            </button>
        }
    </>);
}