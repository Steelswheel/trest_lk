import { Input } from 'antd';
import 'antd/dist/antd.css';

interface IInputTextarea {
    id?: string,
    value: string | number | readonly string[] | undefined,
    onChange?: (arg1: string ) => void,
    size?: 'large' | 'middle' | 'small',
    maxLength?: number,
    isEdit?: boolean,
    placeholder?: string,
    status?: '' | 'warning' | 'error' | undefined,
    autoSize?: boolean,
    allowClear?: boolean,
    bordered?: boolean,
    defaultValue?: string,
    showCount?: boolean | { formatter: (info: { value: string, count: number, maxLength?: number }) => string },
    disabled?: boolean,
    onFocus?: any,
    onBlur?: any,
    onPressEnter?: any,
    onResize?: any
}

const { TextArea } = Input;

export default function InputTextarea(
    {
        id,
        value, 
        onChange, 
        size,
        maxLength,
        isEdit,
        placeholder,
        status,
        autoSize,
        allowClear,
        bordered,
        defaultValue,
        showCount,
        disabled,
        onFocus,
        onBlur,
        onPressEnter,
        onResize
    }: IInputTextarea
) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (onChange) {
            onChange(e.target.value);
        }
    }

    return(
        <>
            {isEdit &&
                <div className="input-textarea">
                    <TextArea
                        id={id} 
                        value={value}
                        onChange={handleChange}
                        size={size}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        status={status}
                        autoSize={autoSize}
                        allowClear={allowClear}
                        bordered={bordered}
                        defaultValue={defaultValue}
                        showCount={showCount}
                        disabled={disabled}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onPressEnter={onPressEnter}
                        onResize={onResize}
                    />
                </div>
            }
            {!isEdit && value}
        </>
    );
}