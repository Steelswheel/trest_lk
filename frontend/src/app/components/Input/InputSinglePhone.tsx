import { Input } from 'antd';
import InputMask from 'react-input-mask';
import { IInputPropsDefault } from '../../interface/Interface';
import 'antd/dist/antd.css';

export default function InputSinglePhone({value, onChange, isEdit}: IInputPropsDefault) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChange) {
            onChange(e.target.value.replace(/[\D]/gi, ''));
        }
    }

    function beforeMaskedStateChange({ nextState }: { nextState: any }) {
        let { value } = nextState;

        if (value.length > 0 && value[0] !== '8') {
            const arr = value.split('');
            arr[0] = '8';
            value = arr.join('');
        }

        return {
            ...nextState,
            value
        };
    }

    function getFormattedValue(value: any) {
        if (value) {
            return value[0] + (value.slice(1, 4).length > 0 ? ' (' + value.slice(1, 4) + ') ' : '') + (value.slice(4, 7).length > 0 ? ' ' + value.slice(4, 7) : '') +  (value.slice(7, 9).length > 0 ? '-' + value.slice(7, 9) : '') + (value.slice(9, 11).length > 0 ? '-' + value.slice(9, 11) : '');
        }
        
        return '';
    }

    return (<>
        {isEdit &&
            <InputMask
                alwaysShowMask 
                mask="9 (999) 999-99-99" 
                maskPlaceholder="8 (___) ___-__-__" 
                value={value} 
                onChange={handleChange}
                beforeMaskedStateChange={beforeMaskedStateChange}
            >
                <Input
                    type="text"
                    className="form-control my-1"
                    style={{maxWidth: '200px'}}
                    allowClear
                />
            </InputMask>
        }
        {!isEdit && getFormattedValue(value)}
    </>);
}