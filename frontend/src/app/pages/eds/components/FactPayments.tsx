import { IGridEdsRow } from '../../../interface/Interface';

export function FactPayments({value}: {value: IGridEdsRow['FACT_PAYMENTS']}) {
    return (
        <span 
            className={`badge badge-square bg-grey text-primary p-2`}
            style={{whiteSpace: 'nowrap'}}
        >
            {value}
        </span>
    );
}