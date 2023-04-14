import { IGridEdsRow } from '../../../interface/Interface';

export function Stage({value}: {value: IGridEdsRow['STAGE']}) {
    if (value.trim() === 'ОТКАЗ') {
        return <span 
                    className="badge badge-square badge-danger p-2" 
                    style={{wordWrap: 'break-word'}}
                >
                    {value}
                </span>;
    } else if (value.trim() === 'СДЕЛКА ЗАВЕРШЕНА') {
        return <span 
                    className="badge badge-square badge-success p-2" 
                    style={{wordWrap: 'break-word'}}
                >
                    {value}
                </span>;
    } else {
        return <span>{value}</span>;
    }
}