import { useEffect, useState, useMemo, memo } from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import { 
    useEdsListQuery, 
    useEdsFilterQuery, 
    useFilterGetSavedDataQuery
} from "../../store/appApi";

import { IGridFilterRow } from '../../interface/Interface';

import { GridTable } from './../../components/Grid/GridTable';
import { GridFilter } from './../../components/Grid/GridFilter';

import { Spin } from 'antd';
import 'antd/dist/antd.css';

import _ from 'lodash';

import { columns } from './components';

export function EdsList() {
    const {data: filterSavedData} = useFilterGetSavedDataQuery('eds', {
        refetchOnFocus: false
    });
    
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (filterSavedData?.page) {
            setPage(+filterSavedData?.page)
        }
    }, [filterSavedData, setPage]);

    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (filterSavedData?.pageSize) {
            setPageSize(+filterSavedData?.pageSize)
        }
    }, [filterSavedData, setPageSize]);

    const {data: filterData} = useEdsFilterQuery(null, {
        refetchOnFocus: false
    });

    const filterFields: {[key:string]: string | number | Array<any>} = useMemo(() => ({}), []);

    filterData?.forEach((item: IGridFilterRow) => {
        if (item.type === 'date-range') {
            filterFields[item.field] = [null, null];
        } else if (item.type === 'select-multiple') {
            filterFields[item.field] = [];
        } else {
            filterFields[item.field] = '';
        }
    });
    
    const [filterValues, setFilterValues] = useState(filterFields);

    useEffect(() => {
        if (filterSavedData?.jsonFilter) {
            let obj = JSON.parse(filterSavedData?.jsonFilter);

            setFilterValues(obj);

            if (Object.keys(obj).length !== 0) {
                if (!_.isEqual(obj, filterFields) || !_.isEqual(obj, {})) {
                    setPage(1);
                }
            }
        }
    }, [filterSavedData, setFilterValues, filterFields]);

    let { data, isLoading, isFetching } = useEdsListQuery({page: 1, pageSize: pageSize, jsonFilter: JSON.stringify(filterValues)}, {
        refetchOnFocus: false
    });

    const MemoTable = memo(GridTable);

    return (
        <>
            <PageTitle breadcrumbs={[]}>
                Сбережения
            </PageTitle>

            {isLoading && <div className="grid-spinner-wrap"><Spin size="large" tip="Загрузка..." spinning={isLoading}></Spin></div>}

            {!isLoading && <div className="eds-list">
                <div className="grid">
                        <GridFilter
                            page={page}
                            setPage={setPage}
                            pageSize={pageSize}
                            filterData={filterData}
                            filterFields={filterFields}
                            setFilterValues={setFilterValues}
                            savedFilterDataType="eds"
                        />

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
                            savedFilterDataType="eds" 
                        />
                    </div>
                </div>}
        </>
    )
}