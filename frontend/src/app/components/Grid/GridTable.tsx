import type { ColumnsType } from 'antd/es/table';
import { useLazyFilterSetSavedDataQuery} from "../../store/appApi";
import { IServerTableResponse } from './../../interface/Interface';
import { Table, ConfigProvider } from 'antd';
import type { PaginationProps } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'antd/dist/antd.css';

export function GridTable({
    tableData, 
    columns, 
    rows,
    page, 
    setPage, 
    pageSize, 
    setPageSize,
    isFetching,
    savedFilterDataType,
    filterValues
}: {
    tableData: IServerTableResponse<any> | undefined, 
    page: number, 
    setPage: React.Dispatch<React.SetStateAction<number>>, 
    pageSize: number, 
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    isFetching: boolean | undefined,
    columns: ColumnsType<any>,
    rows: readonly any[] | undefined,
    savedFilterDataType: string,
    filterValues: {[key: string]: string | number | Array<any>}
}) {
    let total: number = tableData?.totalCount ? tableData.totalCount : 0;

    const showTotal: PaginationProps['showTotal'] = total => `Всего: ${total}`;

    const [reposSavedFilterData] = useLazyFilterSetSavedDataQuery({
        refetchOnFocus: false
    });

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        setPage(pageNumber);
        reposSavedFilterData({type: savedFilterDataType, page: pageNumber, pageSize: pageSize, jsonFilter: filterValues});
    };

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, newPageSize) => {
        setPageSize(newPageSize);
        reposSavedFilterData({type: savedFilterDataType, page: 1, pageSize: newPageSize, jsonFilter: filterValues});
    };

    let scrollObject: {x: number} | {x: number, y: number} = {x: 991};

    let currentWidth = document.documentElement.clientWidth;
    let currentHeight = document.documentElement.clientHeight;

    let header = document.querySelector('#kt_header');
    let headerHeight = header ? header.clientHeight : 0;

    let footer = document.querySelector('#kt_footer');
    let footerHeight = footer ? footer.clientHeight : 0;
    let footerPadding = footer ? +window.getComputedStyle(footer, null).getPropertyValue('padding-top').replace('px', '') + +window.getComputedStyle(footer, null).getPropertyValue('padding-bottom').replace('px', '') : 0;

    let content = document.querySelector('#kt_content');
    let contentPadding = content ? +window.getComputedStyle(content, null).getPropertyValue('padding-top').replace('px', '') + +window.getComputedStyle(content, null).getPropertyValue('padding-bottom').replace('px', '') : 0;

    let pageTitle = document.querySelector('#kt_page_title');
    let pageTitleHeight = pageTitle ? pageTitle.clientHeight : 0;
    let pageTitleMargin = pageTitle ? +window.getComputedStyle(pageTitle, null).getPropertyValue('margin-bottom').replace('px', '') : 0;

    let filter = document.querySelector('.grid-filter');
    let filterHeight = filter ? filter.clientHeight : 0;
    let filterMargin  = filter ? +window.getComputedStyle(filter, null).getPropertyValue('margin-bottom').replace('px', '') : 0;

    let pagination = document.querySelector('.ant-pagination');
    let paginationHeight = pagination ? pagination.clientHeight : 0;
    let paginationMargin = pagination ? +window.getComputedStyle(pagination, null).getPropertyValue('margin-top').replace('px', '') + +window.getComputedStyle(pagination, null).getPropertyValue('margin-bottom').replace('px', '') : 0;

    let paginationSize: 'small' | 'default' | undefined = 'default';

    if (currentWidth > 767) {
        scrollObject = {x: 991};
    } else {
        let h = currentHeight - 67 - paginationHeight - paginationMargin - headerHeight - footerHeight - footerPadding - contentPadding - pageTitleHeight - pageTitleMargin - filterHeight - filterMargin;

        scrollObject = {x: 991, y: h};

        paginationSize = 'small';
    }

    return (
        <div className="grid-table">
            <ConfigProvider locale={locale}>
                <Table
                    scroll={scrollObject}
                    sticky
                    columns={columns}
                    dataSource={rows}
                    bordered
                    size="middle"
                    loading={{
                        spinning: isFetching,
                        size: "large",
                        tip: "Загрузка..."
                    }}
                    pagination={{
                        size: paginationSize,
                        position: ["bottomCenter"],
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        total: total,
                        showTotal: showTotal,
                        onChange: onChange,
                        current: page,
                        pageSize: pageSize
                    }}
                />
            </ConfigProvider>
        </div>
    );
}