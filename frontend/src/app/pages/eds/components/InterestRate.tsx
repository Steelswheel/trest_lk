import { IGridEdsRow } from '../../../interface/Interface';

export function InterestRate({value}: {value: IGridEdsRow['INTEREST_RATE']}) {
    return <span className={value ? 'badge badge-square bg-grey text-primary p-2' : ''}>{value}</span>;
}