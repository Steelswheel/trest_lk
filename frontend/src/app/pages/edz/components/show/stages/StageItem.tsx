import { useState, useEffect } from 'react';
import { WrapInputTemplate } from '../../../../../components/Input/WrapInputTemplate';
import { Collapse } from 'antd';
import 'antd/dist/antd.css';

export default function StageItem({active, lastActiveDate, stage, index, activeKeys}: {active: Boolean, lastActiveDate: string | undefined | null, stage: {[key: string]: any}, index: number, activeKeys: string | Array<string>}) {
    const [isEdit, setIsEdit] = useState(false);
    const [activeKey, setActiveKey] = useState<string | Array<string>>([]);

    useEffect(() => {
        setActiveKey(activeKeys);
    }, [activeKeys]);

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();

        setIsEdit(prevState => prevState = !prevState);
    }

    useEffect(() => {
        if (isEdit) {
            setActiveKey(prevState => {
                if (typeof prevState === 'string') {
                    prevState = `${index}`;
                }

                if (Array.isArray(prevState) && !activeKey.includes(`${index}`)) {
                    const arr = prevState.slice();

                    arr.push(`${index}`);

                    prevState = arr;
                }

                return prevState;
            });
        }
    }, [isEdit, activeKey, index]);

    const { Panel } = Collapse;

    const header = <div className="d-flex align-items-center justify-content-between">
        <div className="stages-item-label">
            {stage.label} {lastActiveDate ? ` - ${lastActiveDate}` : ''}
        </div>

        {!stage.onlyRead &&
            <div 
                className="stages-item-edit d-flex align-items-center justify-content-center"
                onClick={handleClick}
            >
                <i className="fa-solid fa-pen"></i>
            </div>
        }
    </div>;

    const onChange = (key: string | string[]) => {
        setActiveKey(key);
    };

    return (
        <Collapse
            activeKey={activeKey} 
            onChange={onChange}
            className={active ? 'active' : ''}
        >
            <Panel 
                key={index}
                header={header}
                className={active ? 'stages-item-active' : 'stages-item'}
            >
                {stage.fields &&
                    <WrapInputTemplate 
                        isEdit={isEdit}
                        template={stage.fields}
                    />
                }
            </Panel>
        </Collapse>
    );
}