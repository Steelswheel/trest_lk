import { IGridEdsRow } from '../../../interface/Interface';
import { Partner } from './Partner';
import { Stage } from './Stage';
import { InterestRate } from './InterestRate';
import { Sum } from './Sum';
import { FactPayments } from './FactPayments';
import { Deposit } from './Deposit';
import { BalanceReplenishments } from './BalanceReplenishments';
import { PartialWithdrawals } from './PartialWithdrawals';
import { InterestsPayments } from './InterestsPayments';
import { CashPayment } from './CashPayment';

export const columns: any = [
    {
        key: 'EDS_LIST_DATE_CREATE',
        dataIndex: 'DATE_CREATE',
        title: 'Заведение заявки',
        fixed: 'left',
        width: 90,
        render: (value: IGridEdsRow['DATE_CREATE']) => <span className="badge bg-grey text-primary">{value}</span>
    },
    {
        key: 'EDS_LIST_SAVER_FIO',
        dataIndex: 'SAVER_FIO',
        title: 'Сберегатель',
        fixed: 'left',
        width: 90
    },
    {
        key: 'EDS_LIST_FIO',
        dataIndex: 'FIO',
        title: 'Партнер Агент',
        width: 90,
        render: (value: IGridEdsRow['FIO']) => <Partner value={value} />
    },
    {
        key: 'EDS_LIST_STAGE',
        dataIndex: 'STAGE',
        title: 'Стадия',
        width: 90,
        render: (value: IGridEdsRow['STAGE']) => <Stage value={value} />
    },
    {
        key: 'EDS_LIST_CONTRACT_NUMBER',
        dataIndex: 'CONTRACT_NUMBER',
        title: 'Номер договора',
        width: 90
    },
    {
        key: 'EDS_LIST_INTEREST_RATE',
        dataIndex: 'INTEREST_RATE',
        title: '% ставка',
        width: 90,
        render: (value: IGridEdsRow['INTEREST_RATE']) => <InterestRate value={value} />
    },
    {
        key: 'EDS_LIST_CONTRACT_PERIOD',
        dataIndex: 'CONTRACT_PERIOD',
        title: 'Срок договора',
        width: 130
    },
    {
        key: 'EDS_LIST_INTEREST_PAYMENT',
        dataIndex: 'INTEREST_PAYMENT',
        title: 'Выплата %',
        width: 130
    },
    {
        key: 'EDS_LIST_SUM',
        dataIndex: 'SUM',
        title: 'Сумма сбережений по договору',
        width: 150,
        render: (value: IGridEdsRow['SUM']) => <Sum value={value} />
    },
    {
        key: 'EDS_LIST_FACT_PAYMENTS',
        dataIndex: 'FACT_PAYMENTS',
        title: 'Сумма фактически зачислено',
        width: 130,
        render: (value: IGridEdsRow['FACT_PAYMENTS']) => <FactPayments value={value} />
    },
    {
        key: 'EDS_LIST_DEPOSIT_END_DATE',
        dataIndex: 'DEPOSIT_END_DATE',
        title: 'Окончание договора',
        width: 130,
        render: (value: IGridEdsRow['DEPOSIT_END_DATE']) => <span className="badge bg-grey text-primary p-2">{value}</span>
    },
    {
        title: 'Баланс',
        children: [
            {
                key: 'EDS_LIST_DEPOSIT',
                dataIndex: 'DEPOSIT',
                title: 'ЗАЧИСЛЕНИЕ',
                width: 130,
                render: (value: IGridEdsRow['DEPOSIT']) => <Deposit value={value} />
            },
            {
                key: 'EDS_LIST_BALANCE_REPLENISHMENTS',
                dataIndex: 'BALANCE_REPLENISHMENTS',
                title: 'ПОПОЛНЕНИЕ',
                width: 130,
                render: (value: IGridEdsRow['BALANCE_REPLENISHMENTS']) => <BalanceReplenishments value={value} />
            },
            {
                key: 'EDS_LIST_PARTIAL_WITHDRAWALS',
                dataIndex: 'PARTIAL_WITHDRAWALS',
                title: 'ЧАСТИЧНАЯ ВЫПЛАТА',
                width: 130,
                render: (value: IGridEdsRow['PARTIAL_WITHDRAWALS']) => <PartialWithdrawals value={value} />
            },
            {
                key: 'EDS_LIST_INTERESTS_PAYMENTS',
                dataIndex: 'INTERESTS_PAYMENTS',
                title: 'ВЫПЛАТА ПРОЦЕНТОВ',
                width: 130,
                render: (value: IGridEdsRow['INTERESTS_PAYMENTS']) => <InterestsPayments value={value} />
            },
            {
                key: 'EDS_LIST_CASH_PAYMENT',
                dataIndex: 'CASH_PAYMENT',
                title: 'ВЫПЛАТА СБЕРЕЖЕНИЙ',
                width: 130,
                render: (value: IGridEdsRow['CASH_PAYMENT']) => <CashPayment value={value} />
            }
        ]
    }
];