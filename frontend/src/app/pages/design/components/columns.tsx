import {  IGridDesignRow } from '../../../interface/Interface';
import { Files } from './Files';
import { Fio } from './Fio';
import { Status } from './Status';

export const columns: any = [
    {
        key: 'DESIGN_LIST_CREATED_DATE',
        dataIndex: 'CREATED_DATE',
        title: 'Дата постановки',
        width: 130
    },
    {
        key: 'DESIGN_LIST_FIO',
        dataIndex: 'FIO',
        title: 'Партнер/агент',
        width: 130,
        render: (value: IGridDesignRow['FIO']) => <Fio value={value} />,
        hidden: (value: IGridDesignRow['FIO']) => value ? true : false
    },
    {
        key: 'DESIGN_LIST_PARTNER_FILES',
        dataIndex: 'PARTNER_FILES',
        title: 'Файлы от партнера',
        width: 130,
        render: (value: IGridDesignRow['PARTNER_FILES']) => value ? <a href={process.env.REACT_APP_API_URL + value.url}>{value.name}</a> : ''
    },
    {
        key: 'DESIGN_LIST_DESCRIPTION',
        dataIndex: 'DESCRIPTION',
        title: 'Описание',
        width: 250
    },
    {
        key: 'DESIGN_LIST_STATUS',
        dataIndex: 'STATUS',
        title: 'Статус',
        width: 130,
        render: (value: IGridDesignRow['STATUS']) => <Status value={value} />
    },
    {
        key: 'DESIGN_LIST_FILES',
        dataIndex: 'FILES',
        title: 'Готовые макеты',
        width: 130,
        render: (value: IGridDesignRow['FILES']) => <Files value={value} />
    }
];