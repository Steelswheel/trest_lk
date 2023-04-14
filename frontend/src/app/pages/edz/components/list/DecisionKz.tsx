import { IGridEdzRow } from '../../../../interface/Interface';

export function DecisionKz({value}: {value: IGridEdzRow['DECISION_KZ']}) {
    let classes = '';
                
    value = value.trim();

    if (value) {
        switch (value) {
            case 'Одобрено':
                classes = 'badge badge-success';
                break;
            case 'На доработку':
                classes = 'badge bg-grey text-primary';
                break;
            case 'Отказано':
                classes = 'badge badge-danger';
                break;
        }

        return <span 
                    className={classes}
                >
                    {value}
                </span>;
    } else {
        return <span></span>;
    }
}