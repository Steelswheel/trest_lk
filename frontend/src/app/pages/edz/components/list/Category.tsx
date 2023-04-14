import { IGridEdzRow } from '../../../../interface/Interface';

export function Category({value}: {value: IGridEdzRow['CATEGORY']}) {
    let classes = '';

    if (value) {
        value = value.trim();

        classes = 'badge badge-danger';
    } else {
        value = 'Не указано';
        
        classes = 'badge bg-grey text-primary';
    }

    return <span className={classes}>{value}</span>;
}