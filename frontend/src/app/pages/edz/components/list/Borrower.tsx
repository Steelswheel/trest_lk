import {  IGridEdzRow } from '../../../../interface/Interface';

import {Link} from 'react-router-dom';

export function Borrower({value, row}: {value: IGridEdzRow['BORROWER_FIO'], row: IGridEdzRow}) {
    return (<Link to={`/edz/view/${row.key}`} className="text-main">{value}</Link>);
}