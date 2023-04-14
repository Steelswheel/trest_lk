import { IGridEdzRow } from '../../../../interface/Interface';

import { Borrower } from './Borrower';
import { Partner } from './Partner';
import { Stage } from './Stage';
import { Sum } from './Sum';
import { DecisionKz } from './DecisionKz';
import { Tranches } from './Tranches';
import { Bank } from './Bank';
import { Category } from './Category';
import { Comments } from './Comments';

export const columns: any = [
    {
        key: 'EDZ_LIST_DATE_CREATE',
        dataIndex: 'DATE_CREATE',
        title: 'Заведение заявки',
        fixed: 'left',
        width: 90,
        render: (value: IGridEdzRow['DATE_CREATE']) => <span className="badge bg-grey text-primary">{value}</span>
    },
    {
        key: 'EDZ_LIST_BORROWER_FIO',
        dataIndex: 'BORROWER_FIO',
        title: 'Заемщик',
        fixed: 'left',
        width: 130,
        render: (value: IGridEdzRow['BORROWER_FIO'], row: IGridEdzRow) => <Borrower value={value} row={row} />
    },
    {
        key: 'EDZ_LIST_FIO',
        dataIndex: 'FIO',
        title: 'Партнер Агент',
        width: 130,
        render: (value: IGridEdzRow['FIO']) => <Partner value={value} />
    },
    {
        key: 'EDZ_LIST_STAGE',
        dataIndex: 'STAGE',
        title: 'Стадия',
        width: 130,
        render: (value: IGridEdzRow['STAGE']) => <Stage value={value} />
    },
    {
        key: 'EDZ_LIST_CONTRACT_NUMBER',
        dataIndex: 'CONTRACT_NUMBER',
        title: 'Номер договора',
        width: 130
    },
    {
        key: 'EDZ_LIST_SUM',
        dataIndex: 'SUM',
        title: 'Сумма займа по договору',
        width: 130,
        render: (value: IGridEdzRow['SUM']) => <Sum value={value} />
    },
    {
        key: 'EDZ_LIST_BANK',
        dataIndex: 'BANK',
        title: 'Банк',
        width: 130,
        render: (value: IGridEdzRow['BANK']) => <Bank value={value} />,
        className: 'border-bold-left'
    },
    {
        title: 'РЕШЕНИЕ КРЕДИТНОГО КОМИТЕТА',
        className: 'border-bold-left border-bold-right',
        children: [
            {
                key: 'EDZ_LIST_DECISION_KZ',
                dataIndex: 'DECISION_KZ',
                title: 'Решение',
                width: 130,
                render: (value: IGridEdzRow['DECISION_KZ']) => <DecisionKz value={value} />,
                className: 'border-bold-left'
            },
            {
                key: 'EDZ_LIST_CATEGORY',
                dataIndex: 'CATEGORY',
                title: 'К1 / К2',
                width: 130,
                render: (value: IGridEdzRow['CATEGORY']) => <Category value={value} />
            },
            {
                key: 'EDZ_LIST_TRANCHES',
                dataIndex: 'TRANCHES',
                title: 'Транши',
                width: 130,
                render: (value: IGridEdzRow['TRANCHES']) => <Tranches value={value} />
            },
            {
                key: 'EDZ_LIST_COMMENTS',
                dataIndex: 'COMMENTS',
                title: 'Комментарии',
                width: 130,
                className: 'border-bold-right',
                render: (value: IGridEdzRow['COMMENTS']) => <Comments value={value} />
            }
        ]
    }
];