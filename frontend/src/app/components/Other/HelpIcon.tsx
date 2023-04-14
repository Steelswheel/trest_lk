import { useState } from 'react';
import { Popover, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export default function HelpIcon({text, popText}: {text: any, popText: any}) {
    const [open, setOpen] = useState(false);

    function handleOpenChange() {
        setOpen(!open);
    };

    return (<>
        {text}

        <Popover 
            content={popText}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button 
                style={{padding: 0, minWidth: 'unset', height: 'auto', width: 'auto', fontSize: '0.5rem'}}
                className="ms-2"
                shape="circle" 
                icon={<QuestionCircleOutlined />}
            />
        </Popover>
    </>);
}