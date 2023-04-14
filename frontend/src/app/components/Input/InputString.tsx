import { Input } from 'antd';
import { IInputPropsDefault } from '../../interface/Interface';
import 'antd/dist/antd.css';

export default function InputString({value, isEdit, onChange, onlyRead}: IInputPropsDefault) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    return(<>
        {isEdit && !onlyRead &&
            <Input 
                type='text' 
                value={value} 
                onChange={handleChange} 
                className='form-control'
                allowClear
            />
        }

        {(!isEdit || onlyRead) && value}
    </>)
}