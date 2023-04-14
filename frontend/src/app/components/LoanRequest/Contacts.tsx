import { Button, InputNumber, Input } from 'antd';
import type { FormInstance } from 'antd';

export function Contacts({
    form, 
    count, 
    setCount, 
    values, 
    setValues
}: {
    form: FormInstance<any>, 
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    values: any,
    setValues: React.Dispatch<React.SetStateAction<any>>
}) {
    const components = [];

    for (let i = 0; i < count; i++) {
        components.push(
            <div key={'contacts-' + i} className="d-flex align-items-center">
                <div>
                    <div>
                        Номер:
                    </div>
                    <div>
                        <InputNumber 
                            width={200}
                            value={values[i]?.phone} 
                            onChange={(value) => {
                                let arr = values.slice();
                                arr[i].phone = value;
                                setValues(arr);
                                form.setFieldValue('BORROWER_CONTACTS', arr);
                            }} 
                        />
                    </div>
                </div>
                <div>
                    <div>
                        Email:
                    </div>
                    <div>
                        <Input 
                            width={200}
                            value={values[i]?.email} 
                            onChange={(e) => {
                                let {value} = e.target;

                                let arr = values.slice();
                                arr[i].email = value;
                                setValues(arr);
                                form.setFieldValue('BORROWER_CONTACTS', arr);
                            }} 
                        />
                    </div>
                </div>
            </div>
        );
    }

    return <div>
        {components}

        <Button 
            htmlType="button" 
            className="mt-2" 
            onClick={() => setCount(actualCount => actualCount + 1)}
        >
            Добавить
        </Button>
    </div>
}