import { IGridEdzRow, IGridBankStatus } from '../../../../interface/Interface';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

export function Bank({value}: {value: IGridEdzRow['BANK']}) {
    if (value && value.length > 0) {
        let lastPayment = value[value.length - 1];
        
        return <Tooltip 
                trigger={['click', 'hover']}
                title={
                    <>
                        {
                            value.map(
                                (payment: IGridBankStatus) => (
                                    <div key={payment.KEY} className="d-flex justify-content-between align-items-center">
                                        <span style={{fontSize: '12px'}}>
                                            {payment.STATUS} {payment.DATE} {payment.SUM}
                                        </span>
                                        <a 
                                            href={payment.LINK} 
                                            rel="noreferrer" 
                                            target="_blank" 
                                            style={{marginLeft: '0.5rem'}}
                                            download
                                        >
                                            <i className="bi bi-file-arrow-down text-primary fs-3"></i>
                                        </a>
                                    </div>
                                )
                            )
                        }
                    </>
                }
            >
                <span className={`badge badge-${lastPayment.COLOR} p-2`}>{lastPayment.STATUS}</span>
            </Tooltip>
    } else {
        return <span></span>;
    }
}