import { IInputPropsDefault } from '../../interface/Interface';
import 'antd/dist/antd.css';

export default function InputNumber({value, isEdit, onChange, onlyRead, settings}: IInputPropsDefault) {
    function handleChange(event: any) {
        let v = event.target.value || undefined;

        if (v && settings && settings.max) {
            v = v > settings.max ? settings.max : v;
        }
    
        if (v && settings && settings.min) {
            v = v < settings.min ? settings.min : v;
        }

        if (onChange) {
            onChange(v);
        }
    }

    let toValue = '';

    if (value) {
        toValue = String(value);
    }

    return (
        <>
            {isEdit && !onlyRead && 
                <span className="ant-input-affix-wrapper form-control">
                    <input
                        type="number" 
                        value={toValue} 
                        onChange={handleChange}
                        className="form-control ant-input form-control-input-number-without-arrows"
                        step={settings && settings.step ? settings.step : '0.01'}
                    />
                </span>
            }

            {(!isEdit || onlyRead) && value}
        </>
    )
}