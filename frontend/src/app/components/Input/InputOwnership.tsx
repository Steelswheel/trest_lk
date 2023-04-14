import { IInputPropsDefault } from '../../interface/Interface';
import { useState, useEffect } from 'react';
import InputString from './InputString';
import InputDate from './InputDate';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

interface IOwnershipData {
    fio: string;
    date: string;
}

export default function InputOwnership({value, isEdit, onChange}: IInputPropsDefault) {
    let startValue = value ? JSON.parse(value) : [];

    const [localValue, setLocalValue] = useState<Array<IOwnershipData> | []>(startValue);

    useEffect(() => {
        if (localValue.length > 0) {
            onChange(JSON.stringify(localValue));
        }
    }, [localValue, onChange]);

    function handleFioChange(value: string, index: number) {
        setLocalValue(prevState => {
            const arr = prevState.slice();

            arr[index].fio = value;

            return arr;
        });
    }

    function handleDateChange(value: string, index: number) {
        setLocalValue(prevState => {
            const arr = prevState.slice();

            arr[index].date = value;
            
            return arr;
        });
    }

    const ownershipObject = {
        fio: '',
        date: ''
    };

    function addOwner() {
        setLocalValue(prevState => [...prevState, ownershipObject]);
    }

    function deleteOwner(index: number) {
        setLocalValue(prevState => {
            const arr = prevState.slice();

            arr.splice(index, 1);
            
            return arr;
        });
    }

    return(<>
        {localValue.length > 0 && localValue.map((value, index) => (
            <div 
                className="form-group-group" 
                style={{gridTemplate: "'d1 d2' / 50% 50%"}} 
                key={`ownership-${index}`}
            >
                <div className="form-group-mini">
                    <div className={`form-group-mini__label ${isEdit ? 'edit' : ''}`}>
                        <label>
                            ФИО
                        </label>
                    </div>
                    <div className="form-group-mini__value">
                        <InputString 
                            value={value.fio} 
                            isEdit={isEdit} 
                            onChange={(value) => handleFioChange(value, index)}
                        />
                    </div>
                </div>
                <div className="form-group-mini">
                    <div className={`form-group-mini__label ${isEdit ? 'edit' : ''}`}>
                        <label>
                            Дата
                        </label>
                    </div>
                    <div className="form-group-mini__value">
                        <div className="d-flex align-items-center">
                            <InputDate 
                                value={value.date}
                                isEdit={isEdit} 
                                onChange={(value) => handleDateChange(value, index)}
                            />

                            {isEdit && 
                                <Button
                                    className="ms-2"
                                    type="text" 
                                    shape="circle"
                                    icon={<CloseCircleOutlined style={{color: 'rgba(0, 0, 0, 0.5)'}} />}
                                    onClick={() => deleteOwner(index)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        ))}

        {isEdit && 
            <button
                className={`custom-btn-small bg-main ${localValue.length > 0 ? 'mt-4' : 'my-2'}`}
                onClick={addOwner}
            >
                Добавить
            </button>
        }
    </>)
}