import { IGridEdsRow } from '../../../interface/Interface';

export function Partner({value}: {value: IGridEdsRow['FIO']}) {
    let result = <></>;

    if (value) {
        result = <>
            {value.TAGS.length > 0 && value.TAGS.map((tag, index) => {
                let classes = '';
                let text = '';

                switch (tag) {
                    case 'agent':
                        classes = 'badge badge-light-primary m-1';
                        text = 'Агент';
                        break;
                }

                return <span 
                            key={value.KEY + '-' + index}
                            className={classes}
                        >
                            {text}
                        </span>;
            })}

            <div key={value.KEY}>
                {value.NAME}
            </div>
        </>;
    }

    return result;
}