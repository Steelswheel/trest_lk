import { useEffect, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { DatePicker as MobileDatePicker, ConfigProvider as MobileConfigProvider, Button } from 'antd-mobile';
import { IInputPropsDefault } from '../../interface/Interface';
import enUS from 'antd-mobile/es/locales/en-US';
import locale from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'antd/dist/antd.css';
import 'moment/locale/ru';

export default function InputDate({value, onChange, isEdit, onlyRead}: IInputPropsDefault) {
    useEffect(() => {
        let startValue = value ? moment(value, 'DD.MM.YYYY') : undefined;

        setLocalValue(startValue);
    }, [value]);

    let startValue = value ? moment(value, 'DD.MM.YYYY') : undefined;

    const [localValue, setLocalValue] = useState(startValue);
    const [visible, setVisible] = useState(false);

    function handleChange(value: any, dateString: string) {
        onChange(dateString);

        setLocalValue(value);
    }

    function mobileHandleChange(value: Date) {
        let date = moment(value);

        onChange(date.format('DD.MM.YYYY'));

        setLocalValue(date);
    }

    return (
        <>
            {isEdit && !onlyRead &&
                <>
                    <div className="form-control-input-date">
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                defaultValue={localValue}
                                value={localValue}
                                placeholder="Выберите дату"
                                format="DD.MM.YYYY"
                                onChange={handleChange}
                            />
                        </ConfigProvider>
                    </div>

                    <div className="form-control-input-date-mobile">
                        <Button
                            size="mini"
                            color="primary"
                            fill="outline"
                            onClick={() => {
                                setVisible(true)
                            }}
                        >
                            {localValue ? moment(localValue).format('DD.MM.YYYY') : 'Дата'}
                        </Button>
                        <MobileConfigProvider locale={enUS}>
                            <MobileDatePicker
                                title="Дата"
                                visible={visible}
                                onClose={() => {
                                    setVisible(false)
                                }}
                                defaultValue={localValue ? moment(localValue).toDate() : undefined}
                                value={localValue ? moment(localValue).toDate() : undefined}
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