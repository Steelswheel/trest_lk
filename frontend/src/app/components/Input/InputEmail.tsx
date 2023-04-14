import { IInputProps, dataObject } from '../../interface/Interface';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import { cloneDeep } from 'lodash';

interface IInputEmail extends IInputProps {
    settings?: {[key: string]: any}
}

export default function InputEmail({value, onChange, isEdit, settings}: IInputEmail) {
    const dataObject: dataObject = {
        ID: 'n',
        VALUE_TYPE: settings && settings.VALUE_TYPE ? settings.VALUE_TYPE : 'WORK',
        VALUE: '',
        TYPE_ID: 'EMAIL',
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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const arr = cloneDeep(value);

        arr[index].VALUE = event.target.value;
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
                                        <Input 
                                            type="text"
                                            className="form-control my-1 me-2"
                                            style={{maxWidth: '200px'}}
                                            value={val.VALUE}
                                            onChange={value => handleChange(value, index)}
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
                        {val}
                    </div>
                )
            }
        </>
    );
}