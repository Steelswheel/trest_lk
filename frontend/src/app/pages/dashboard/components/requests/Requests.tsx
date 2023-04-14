import { useState, useEffect } from 'react';

export function Requests({data}: {data: Array<any>}) {
    const [deals, setDeals] = useState<Array<JSX.Element | null>>([]);

    useEffect(() => {
        if (data && data.length > 0) {
            let components: Array<JSX.Element | null> = [];

            data.forEach((item, index) => {
                components.push(
                    <div 
                        className="dashboard-requests-item d-md-flex align-items-center justify-content-between"
                        key={`dashboard-requests-item-${index}`}
                    >
                        <a 
                            href={`/edz/view/${item.ID}`} 
                            target="_blank" 
                            className="dashboard-requests-item-name"
                            rel="noreferrer"
                        >
                            {item.NAME}
                        </a>
                        <div className="dashboard-requests-item-date">
                            {item.DATE}
                        </div>
                    </div>
                );
            });

            setDeals(components);
        }
    }, [data]);

    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                Последние заявки на займ
            </div>
            <div className="dashboard-card-content">
                <div className="dashboard-card-content-wrap">
                    {deals.length > 0 ? deals : <div className="dashboard-requests-item">Нет заявок</div>}
                </div>
            </div>
        </div>
    );
}