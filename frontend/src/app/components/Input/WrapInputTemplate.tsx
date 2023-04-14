import HelpIcon from './../Other/HelpIcon';
import { useSelector } from 'react-redux';
import { WrapInput } from './WrapInput';

interface IWrapInputTemplate {
    template: {[key: string]: any},
    isEdit?: boolean
}

export function WrapInputTemplate({ template, isEdit}: IWrapInputTemplate) {
    const className = 'form-group-v1';

    const attributes = useSelector((state : any) => state.form.attributes);
    const values = useSelector((state : any) => state.form.values);

    function getValue(field: string) {
        if (values[field]) {
            return values[field];
        } else {
            if (attributes[field].value) {
                return attributes[field].value;
            } else {
                return undefined;
            }
        }
    }
    
    return(<>
        <div>
            {Object.keys(template).map((fieldGroup) => (
                <div 
                    className={attributes[fieldGroup].className ? attributes[fieldGroup].className : className} 
                    key={fieldGroup}
                >
                    {!attributes[fieldGroup].noLabel && <div className={`${className}__label`}>
                        <label>
                            {
                                attributes[fieldGroup].popover ? 
                                <HelpIcon 
                                    text={attributes[fieldGroup].label} 
                                    popText={attributes[fieldGroup].popover} 
                                /> : attributes[fieldGroup].label
                            }
                        </label>
                    </div>}
                    <div className={`${className}__value`}>
                        <div className={template[fieldGroup].classNameGroup} style={template[fieldGroup].style}>
                            {Object.keys(template[fieldGroup].fields).map((field) => (
                                <WrapInput
                                    attribute={field}
                                    attributes={attributes}
                                    values={values}
                                    key={field}
                                    settings={attributes[field].settings}
                                    fields={attributes[field].fields}
                                    type={attributes[field].type}
                                    value={getValue(field)}
                                    noLabel={template[fieldGroup].fields[field].noLabel}
                                    label={attributes[field].labelMini ? attributes[field].labelMini : attributes[field].label}
                                    className={attributes[field].className ? attributes[field].className : 'form-group-mini'}
                                    isEdit={isEdit}
                                    onlyRead={attributes[field].onlyRead}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>)
}