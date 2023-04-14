import { IGridEdsRow, IGridRowPayment } from '../../../interface/Interface';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

export function PartialWithdrawals({value}: {value: IGridEdsRow['PARTIAL_WITHDRAWALS']}) {
    return <>
        {value.SUM && 
            <Tooltip 
                trigger={['click', 'hover']}
                title={
                    <>
                        {
                            value.PAYMENTS.map(
                                (payment: IGridRowPayment, index: number) => (<div key={value.KEY + '-' + index}>{payment.DATE + ' ' + payment.SUM}</div>)
                            )
                        }
                    </>
                }
            >
                <div className="badge bg-grey text-primary p-2 mb-1">
                    {value.SUM}
                </div>
                <div className="badge bg-grey text-primary p-2">
                    {value.DATE}
                </div>
            </Tooltip>
        }
    </>
}