import { useState, useEffect } from 'react';

interface IPayment {
    TRANCHE: string | number;
    NAME: string;
    DOC: string | false;
    ID: string | number;
    STATUS: string;
    SUM: string;
}

export function Payments({data}: {data: Array<IPayment> | []}) {
    const [payments, setPayments] = useState<Array<any> | []>([]);

    useEffect(() => {
        if (data && data.length > 0) {
            let components: Array<JSX.Element | null> = [];

            data.forEach((item, index) => {
                components.push(
                    <div 
                        className={`dashboard-payments-item d-flex align-items-center justify-content-between`}
                        key={`dashboard-payments-${index}`}
                    >
                        <div>
                            <a href={`/edz/view/${item.ID}`} className="dashboard-payments-item-name">
                                {item.NAME}
                            </a>
                            <div className="dashboard-payments-item-tranche">
                                {item.TRANCHE} транш; {item.SUM}
                            </div>
                        </div>
                        <div className="dashboard-payments-item-status">
                            {item.DOC ?
                                <a
                                    href={process.env.REACT_APP_API_URL + item.DOC}
                                    className="dashboard-payments-item-button"
                                    download
                                >
                                    Скачать <i className="fa fa-arrow-down"></i>
                                </a> :
                                item.STATUS === 'success' ? 'Выплачен' : 'В обработке'
                            }
                        </div>
                    </div>
                );
            });

            setPayments(components);
        }
    }, [data]);

    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                Заявки на выплату
            </div>
            <div className="dashboard-card-content">
                <div className="dashboard-card-content-wrap">
                    {payments.length > 0 ? payments : <div className="dashboard-payments-item ">Заявки не найдены</div>}
                </div>
            </div>
        </div>
    );
}