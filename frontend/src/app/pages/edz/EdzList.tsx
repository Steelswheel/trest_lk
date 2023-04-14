import { 
    useState, 
    memo, 
    useEffect, 
    useMemo
} from 'react';

import { 
    useEdzListQuery, 
    useEdzFilterQuery,
    useFilterGetSavedDataQuery
} from '../../store/appApi';

import { IGridFilterRow } from '../../interface/Interface';

import { Spin } from 'antd';

import { GridTable } from './../../components/Grid/GridTable';
import { GridFilter } from './../../components/Grid/GridFilter';
import { PageTitle } from '../../../_metronic/layout/core';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import { columns } from './components/list';

import 'antd/dist/antd.css';

export function EdzList() {
    const {data: filterSavedData} = useFilterGetSavedDataQuery('edz', {
        refetchOnFocus: false
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (filterSavedData?.page) {
            setPage(+filterSavedData?.page)
        }
    }, [filterSavedData, setPage]);

    const [pageSize, setPageSize] = useState(filterSavedData?.pageSize ? +filterSavedData.pageSize : 10);

    useEffect(() => {
        if (filterSavedData?.pageSize) {
            setPageSize(+filterSavedData?.pageSize)
        }
    }, [filterSavedData, setPageSize]);

    const {data: filterData} = useEdzFilterQuery(null, {
        refetchOnFocus: false
    });

    let filterFields: {[key: string]: string | number | Array<any>} = useMemo(() => ({}), []);

    const [filterValues, setFilterValues] = useState(filterFields);

    useEffect(() => {
        if (filterData) {
            filterData?.forEach((item: IGridFilterRow) => {
                if (item.type === 'date-range') {
                    filterFields[item.field] = [null, null];
                } else if (item.type === 'select-multiple') {
                    filterFields[item.field] = [];
                } else {
                    filterFields[item.field] = '';
                }
            });

            setFilterValues(filterFields);
        }
    }, [filterData, filterFields]);

    useEffect(() => {
        if (filterSavedData?.jsonFilter && filterData) {
            let obj = JSON.parse(filterSavedData?.jsonFilter);

            setFilterValues(obj);

            if (Object.keys(obj).length !== 0) {
                if (!isEqual(obj, filterFields)) {
                    setPage(1);
                    setPageSize(10);
                }
            }
        }
    }, [filterSavedData, setFilterValues, filterData, filterFields]);

    let { data, isLoading, isFetching } = useEdzListQuery({
        page: page,
        pageSize: pageSize, 
        jsonFilter: JSON.stringify(filterValues)
    }, {
        refetchOnFocus: false
    });

    const MemoTable = memo(GridTable);

    return (
        <>
            <PageTitle breadcrumbs={[]}>
                Займы
            </PageTitle>

            {isLoading && <div className="grid-spinner-wrap"><Spin size="large" tip="Загрузка..." spinning={isLoading}></Spin></div>}

            {!isLoading && <div className="edz-list">
                    <div className="grid">
                        <div className="d-flex align-items-center justify-content-between">
                            <GridFilter
                                savedFilterDataType="edz"
                                page={page}
                                setPage={setPage}
                                pageSize={pageSize}
                                filterData={filterData}
                                filterFields={filterFields}
                                setFilterValues={setFilterValues}
                            />

                            <Link to='/edz/request' className='fw-bold custom-btn bg-main mb-4 d-flex align-items-center'>
                                <i className="fas fa-square-plus fs-2 text-white me-2"></i>
                                Заявка
                            </Link>

                        </div>

                        <MemoTable
                            tableData={data}
                            page={page}
                            pageSize={pageSize}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            isFetching={isFetching}
                            columns={columns} 
                            rows={data?.rows}
                            filterValues={filterValues}
                            savedFilterDataType="edz" 
                        />
                    </div>
                </div>}
        </>
    )
}