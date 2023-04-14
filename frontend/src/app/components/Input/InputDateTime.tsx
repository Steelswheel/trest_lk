import { useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { DatePicker as MobileDatePicker, ConfigProvider as MobileConfigProvider, Button } from 'antd-mobile';
import { IInputPropsDefault } from '../../interface/Interface';
import enUS from 'antd-mobile/es/locales/en-US';
import locale from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'antd/dist/antd.css';
import 'moment/locale/ru';

export default function InputDateTime({value, onChange, isEdit, onlyRead}: IInputPropsDefault) {
    let startValue = value ? moment(value, 'DD.MM.YYYY hh:mm') : undefined;

    const [localValue, setLocalValue] = useState(startValue);
    const [visible, setVisible] = useState(false);

    function handleChange(value: any, dateString: string) {
        if (onChange) {
            onChange(dateString);
        }

        setLocalValue(value);
    }

    function mobileHandleChange(value: Date) {
        let date = moment(value);

        if (onChange) {
            onChange(date.format('DD.MM.YYYY hh:mm'));
        }

        setLocalValue(date);
    }

    return (
        <>
            {isEdit && !onlyRead &&
                <>
                    <div className="form-control-input-date">
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                value={localValue}
                                placeholder="Дата и время"
                                format="DD.MM.YYYY hh:mm"
                                onChange={handleChange}
                                showTime
                            />
                        </ConfigProvider>
                    </div>

                    <div className="form-control-input-date-mobile">
                        <Button
                            size='mini'
                            color='primary'
                            fill='outline'
                            onClick={() => {
                                setVisible(true)
                            }}
                        >
                            {localValue ? moment(localValue).format('DD.MM.YYYY hh:mm') : 'Дата и время'}
                        </Button>
                        <MobileConfigProvider locale={enUS}>
                            <MobileDatePicker
                                title='Дата'
                                visible={visible}
                                onClose={() => {
                                    setVisible(false)
                                }}
                                precision="minute"
                                defaultValue={localValue ? moment(localValue).toDate() : new Date()}
                                onConfirm={mobileHandleChange}
                            />
                        </MobileConfigProvider>
                    </div>
                </>
            }

            {(!isEdit || onlyRead) && value}
        </>
    )
}