import {  IGridDesignRow } from '../../../interface/Interface';

export function Status({value}: {value: IGridDesignRow['STATUS']}) {
    return <>
            {value.DATE && <span className="badge badge-success p-2">{value.TEXT} {value.DATE}</span>}
            {!value.DATE && <span className="badge bg-grey text-primary p-2">{value.TEXT}</span>}
        </>
}