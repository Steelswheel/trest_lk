import { IGridEdsRow } from '../../../interface/Interface';

export function Sum({value}: {value: IGridEdsRow['SUM']}) {
    return (<>
        {value && 
            <span 
                className={`badge badge-square bg-grey text-primary p-2`}
                style={{whiteSpace: 'nowrap'}}
            >
                {value}
            </span>
        }
        {!value && <></>}
    </>);
}