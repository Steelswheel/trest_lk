import { IGridEdsRow } from '../../../interface/Interface';

export function Deposit({value}: {value: IGridEdsRow['DEPOSIT']}) {
    return <>
        {value.SUM && 
            <div key={value.KEY}>
                <div className="badge bg-grey text-primary p-2 mb-1">
                    {value.SUM}
                </div>
                <div className="badge bg-grey text-primary p-2">
                    {value.DATE}
                </div>
            </div>
        }
    </>;
}