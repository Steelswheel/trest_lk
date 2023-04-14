import { IGridEdzRow } from '../../../../interface/Interface';

export function Sum({value}: {value: IGridEdzRow['SUM']}) {
    return <span className={`badge badge-square bg-grey text-primary p-2`}>{value}</span>;
}