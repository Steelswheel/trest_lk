import { IGridEdzRow } from '../../../../interface/Interface';

export function Tranches({value}: {value: IGridEdzRow['TRANCHES']}) {
    if (value) {
        return <span className="badge badge-square bg-grey text-primary p-2">{value}</span>
    } else {
        return <span></span>;
    }
}