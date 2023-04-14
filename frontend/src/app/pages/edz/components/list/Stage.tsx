import { IGridEdzRow } from '../../../../interface/Interface';

export function Stage({value}: {value: IGridEdzRow['STAGE']}) {
    if (value) {
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
    } else {
        return <span></span>;
    }
}