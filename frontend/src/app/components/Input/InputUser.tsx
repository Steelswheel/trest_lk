import {ChangeEvent} from "react";
type SomeType = number | null

interface IInputUser{
    value: SomeType
    onChange?: (arg1: SomeType ) => void,
    isEdit?: boolean
}

export default function InputUser({value, onChange, isEdit}: IInputUser){


    function handleChange(e: ChangeEvent<HTMLInputElement>){
        if(onChange){
            let v = parseInt(e.target.value) || null
            onChange(v)
        }
    }
    let toValue = String(value)
    if(value == null){
        toValue = ''
    }

    return(<>

        {isEdit &&
        <input type="text" value={toValue} onChange={handleChange} className='form-control'/>
        }

        {!isEdit && value}

        </>)
}