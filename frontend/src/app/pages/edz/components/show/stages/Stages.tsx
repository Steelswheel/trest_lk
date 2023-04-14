import { useEffect, useState } from 'react';
import StageItem from './StageItem';

export function Stages({history, activeStage, templateRequest, className}: {history: {[key: string]: any}, activeStage: string, templateRequest: {[key: string]: any}, className?: string}) {
    const [stages, setStages] = useState<Array<any>>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeKeys, setActiveKeys] = useState<Array<string>>([]);

    useEffect(() => {
        if (templateRequest && history) {
            let arr = [];

            for (let stage in templateRequest) {
                arr.push({
                    name: stage,
                    data: templateRequest[stage],
                    lastActiveDate: Object.keys(history).includes(stage) ? history[stage] : undefined
                });
            }

            setStages(arr);
        }
    }, [templateRequest, history]);

    function openAll() {
        if (isOpen) {
            setActiveKeys([]);
        } else {
            for (let x = 0; x < stages.length; x++) {
                setActiveKeys(prevState => [...prevState, `${x}`]);
            }
        }

        setIsOpen(!isOpen);
    }

    return (
        <div className={`custom-card stages mb-5 mb-xl-10 ${className ? className : ''}`}>
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="custom-card-header">
                    Информация о займе
                </div>

                <div className="stages-head-buttons d-flex flex-wrap align-items-center">
                    <button
                        className="custom-btn stages-head-button"
                        onClick={openAll}
                    >
                        {isOpen ? 'Закрыть все' : 'Открыть все'}
                    </button>
                </div>
            </div>
            <div className="custom-card-content">
                <div className="d-flex flex-column">
                    {stages.map((stage, index) => (
                        <div className="stages-item-wrapper" key={`stage-item-${index}`}>
                            <StageItem
                                active={activeStage === stage.name}
                                lastActiveDate={stage.lastActiveDate} 
                                stage={stage.data}
                                index={index}
                                activeKeys={activeKeys}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}