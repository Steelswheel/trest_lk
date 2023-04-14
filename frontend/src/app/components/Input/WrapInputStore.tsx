import { useDispatch, useSelector } from 'react-redux';
import { WrapInput } from './WrapInput';
import { setForm } from '../../store/formSlice';

interface IWrapInputStore {
    attributeName: string,
    className?: string,
    isEdit?: boolean
}

export function WrapInputStore({attributeName, className, isEdit}: IWrapInputStore) {
    const dispatch = useDispatch();

    function onChange(value: string) {
        dispatch(setForm({value, attribute: attributeName}));
    }

    const value = useSelector((state : any) => state.form.values[attributeName]);
    const attribute = useSelector((state : any) => state.form.attributes[attributeName]);

    return(<>
        <WrapInput
            attribute={attributeName}
            settings={attribute.settings}
            fields={attribute.fields}
            type={attribute.type}
            value={value}
            noLabel={false}
            label={attribute.label}
            className={className}
            handleChange={onChange}
            isEdit={isEdit}
        />
    </>)
}