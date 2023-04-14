import { IInputProps, dataObject } from '../../interface/Interface';
import InputSinglePhone from './InputSinglePhone';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { cloneDeep } from 'lodash';

interface IInputPhone extends IInputProps {
    settings?: {[key: string]: any}
}

export default function InputPhone({value, onChange, isEdit, settings}: IInputPhone) {
    function getFormattedValues(value: any) {
        return (value.VALUE[0] === '8' ? value.VALUE[0] : '8') + (value.VALUE.slice(1, 4).length > 0 ? ' (' + value.VALUE.slice(1, 4) + ') ' : '') + (value.VALUE.slice(4, 7).length > 0 ? ' ' + value.VALUE.slice(4, 7) : '') +  (value.VALUE.slice(7, 9).length > 0 ? '-' + value.VALUE.slice(7, 9) : '') + (value.VALUE.slice(9, 11).length > 0 ? '-' + value.VALUE.slice(9, 11) : '');
    }

    const dataObject: dataObject = {
        ID: 'n',
        VALUE_TYPE: settings && settings.VALUE_TYPE ? settings.VALUE_TYPE : 'WORK',
        VALUE: '',
        TYPE_ID: 'PHONE',
        ENTITY_ID: 'CONTACT',
        IS_DELETED: false
    };

    function addValue(index: number) {
        const arr = cloneDeep(value);

        dataObject.ID = 'n' + index;
        arr.push(dataObject);

        if (onChange) {
            onChange(arr);
        }
    }

    function handleChange(v: any, index: number) {
        const arr = cloneDeep(value);

        arr[index].VALUE = v;
        delete arr[index].IS_DELETED;

        if (onChange) {
            onChange(arr);
        }
    }

    function deleteItem(index: number) {
        const arr = cloneDeep(value);

        arr[index].VALUE = '';
        arr[index].IS_DELETED = true;

        if (onChange) {
            onChange(arr);
        }
    }

    return (
        <>
            {isEdit && value &&
                <>
                    {
                        value?.map((val, index) => {
                            if (!val.IS_DELETED) {
                                return (
                                    <div key={`phone-${val.ID}`}>
                                        <InputSinglePhone
                                            value={val.VALUE}
                                            onChange={value => handleChange(value, index)}
                                            isEdit={isEdit}
                                        />
                                        <Button
                                            key={`delete-${val.ID}`}
                                            type="text"
                                            shape="circle"
                                            icon={<CloseCircleOutlined style={{color: 'rgba(0, 0, 0, 0.5)'}} />}
                                            onClick={() => deleteItem(index)} 
                                        />
                                    </div>
                                );
                            }

                            return false;
                        })
                    }

                    <button
                        className="custom-btn-small bg-main my-2"
                        onClick={() => addValue(value.length)}
                    >
                        Добавить
                    </button>
                </>
            }

            {!isEdit && value &&
                value?.map((val) => 
                    <div key={val?.ID}>
                        {getFormattedValues(val)}
                    </div>
                )
            }
        </>
    );
}