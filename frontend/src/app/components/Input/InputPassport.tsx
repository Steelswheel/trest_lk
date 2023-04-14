import { useDispatch } from 'react-redux';
import { setForm } from '../../store/formSlice';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import InputPassportRecognition from './InputPassportRecognition';
import { WrapInput } from './WrapInput';
import 'antd/dist/antd.css';

export default function InputPassport({fields, isEdit}: {fields: any, isEdit: boolean}) {
    const [passportInputs, setPassportInputs] = useState<Array<JSX.Element> | []>([]);

    const attributes = useSelector((state : any) => state.form.attributes);
    const values = useSelector((state : any) => state.form.values);

    const dispatch = useDispatch();

    function handleChange(parsedPassportData: any) {
        for (let key in parsedPassportData) {
            let value = parsedPassportData[key];

            dispatch(setForm({value, attribute: fields[key]}));
        }
    }

    useEffect(() => {
        let data = [];

        for (let key in fields) {
            if (!['NAME', 'LAST_NAME', 'SECOND_NAME'].includes(key)) {
                data.push(
                    <WrapInput
                        attribute={fields[key]}
                        key={key}
                        settings={attributes[fields[key]].settings}
                        fields={attributes[fields[key]].fields}
                        type={attributes[fields[key]].type}
                        value={values[fields[key]]}
                        noLabel={false}
                        label={attributes[fields[key]].labelMini ? attributes[fields[key]].labelMini : attributes[fields[key]].label}
                        className={attributes[fields[key]].className ? attributes[fields[key]].className : 'form-group-mini'}
                        isEdit={isEdit}
                    />
                );
            }
        }

        setPassportInputs(data);
    }, [values, attributes, isEdit, fields]);

    return (<>
        <InputPassportRecognition setData={handleChange} fields={fields} isEdit={isEdit} />

        <div className="form-group-group" style={{gridTemplate: "'d1 d2' 'd3 d4' 'd5 d5' 'd6 d6' 'd7 d8' 'd9 d9' / 50% 50%"}}>
            {passportInputs}
        </div>
    </>);
}