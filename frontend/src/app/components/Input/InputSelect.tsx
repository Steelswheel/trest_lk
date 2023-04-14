import { Select } from 'antd';
import { IInputPropsDefault } from '../../interface/Interface';
import 'antd/dist/antd.css';

export default function InputSelect({value, attribute, attributes, onChange, isEdit, settings, onlyRead}: IInputPropsDefault) {
    function handleChange(value: string) {
        if (onChange) {
            onChange(value);
        }
    }

    function getLabel(value: any) {
        if (attribute && attributes) {
            return attributes[attribute].settings.options.find((item: {[key: string]: any}) => {
                if (Number(value) && Number(value) === item.value) {
                    return item.value;
                }
                
                return value === item.value;
            })?.label
        }

        if (settings) {
            return settings.options.find((item: {[key: string]: any}) => item.value === value)?.label;
        }

        return '';
    }

    return(<>
        {isEdit && !onlyRead &&
            <Select
                style={{display: 'block', width: '100%'}}
                onChange={handleChange}
                value={getLabel(value)}
                options={settings ? settings.options : []}
            />
        }

        {(!isEdit || onlyRead) && getLabel(value)}
    </>)
}