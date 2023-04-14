import React from 'react';
import { useDispatch } from 'react-redux';
import { setForm } from '../../store/formSlice';

const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
const componentList:any = {};

interface IWrapInput {
    attribute: string;
    fields?: any;
    attributes?: {[key: string]: any};
    values?: {[key: string]: any};
    noLabel?: boolean;
    settings?: any;
    type: string;
    label: string;
    value: any;
    className?: string;
    isEdit?: boolean;
    handleChange?: (arg: any) => void;
    onlyRead?: boolean | undefined;
}

export function WrapInput({attribute, attributes, values, fields, noLabel, settings, type, label, value, className, isEdit, handleChange, onlyRead}: IWrapInput) {
    const dispatch = useDispatch();

    function onChange(value: any) {
        handleChange ? handleChange(value) : dispatch(setForm({value, attribute}));
    }
    
    const propsComponent = {
        fields,
        settings,
        value,
        attribute,
        onChange,
        isEdit,
        onlyRead,
        attributes,
        values
    }

    function DynamicLoader(props: any) {
        const LazyComponent = lazy(() => import('./' + props.component));

        if (!componentList[props.component]) {
            componentList[props.component] = (props:object) => (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent {...props} />
                </Suspense>
            );

            return componentList[props.component](propsComponent);
        }

        return componentList[props.component](propsComponent);
    }

    const typeComponent = type?.charAt(0).toUpperCase() + type?.slice(1);

    return(<>
        <div className={className}>
            {!noLabel && <div className={isEdit ? `${className}__label edit` : `${className}__label`}>
                <label>
                    {label}
                </label>
            </div>}
            <div className={`${className}__value`}>
                { DynamicLoader({component:'Input' + typeComponent}) }
            </div>
        </div>
    </>)
}