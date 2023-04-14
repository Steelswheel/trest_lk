import { useEffect, useState } from 'react';
import { notification, Button } from 'antd';
import { IInputPropsDefault } from '../../interface/Interface';
import { useLazyCreateDocQuery } from '../../store/appApi';
import 'antd/dist/antd.css';

export default function InputDoc({settings, attributes, values, attribute}: IInputPropsDefault) {
    const [label, setLabel] = useState('');

    useEffect(() => {
        if (attribute && attributes) {
            setLabel(attributes[attribute].label);
        }
    }, [attributes, attribute]);

    const [reposCreateDoc] = useLazyCreateDocQuery({
        refetchOnFocus: false
    });

    function getDoc() {
        if (values && settings) {
            reposCreateDoc({id: values.ID, doc: settings.document}).then(({data}) => {
                if (data) {
                    let url = process.env.REACT_APP_API_URL + data;
                    window.open(url, '_blank');
                } else {
                    notification.error({
                        message: 'Ошибка',
                        description: 'Невозможно скачать документ',
                        placement: 'top'
                    });
                }
            });
        } else {
            notification.error({
                message: 'Ошибка',
                description: 'Невозможно скачать документ',
                placement: 'top'
            });
        }
    }

    return (<>
        <Button
            type="link"
            onClick={getDoc}
            className="px-0 text-main"
        >
            {label}
        </Button>
    </>);
}