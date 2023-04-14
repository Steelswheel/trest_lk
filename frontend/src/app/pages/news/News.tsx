import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchGetPageSettings, fetchSetPageSettings } from '../../store/news.slice';
import { useActions } from '../../hooks/actions';
import { PageTitle } from '../../../_metronic/layout/core';
import { useState, useEffect } from 'react';
import { 
    useGetNewsQuery,
    useLazyGetNewsQuery
} from '../../store/appApi';
import { Spin, Pagination, ConfigProvider } from 'antd';
import type { PaginationProps } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import 'antd/dist/antd.css';

interface INewsData {
    COUNT: number;
    ITEMS: Array<any>
}

export function News() {
    const [news, setNews] = useState<Array<any>>([]);
    const [mainNew, setMainNew] = useState(<></>);

    const { page, pageSize } = useAppSelector((state) => state.news);
    const { setPage, setPageSize } = useActions();

    const dispatch  = useAppDispatch();

    useEffect(() => {
        dispatch(fetchGetPageSettings());
    }, []);

    const dataObj: INewsData = {
        COUNT: 0,
        ITEMS: []
    }

    const [newsData, setNewsData] = useState(dataObj);

    const {isLoading, data} = useGetNewsQuery({page, pageSize}, {
        refetchOnFocus: false
    });

    const [reposNewsData] = useLazyGetNewsQuery({
        refetchOnFocus: false
    });

    useEffect(() => {
        setNewsData(data);

        if (data) {
            if (data.MAIN) {
                setMainNew(
                    <div className="news-card d-md-flex align-items-center justify-content-between mt-4 mb-4">
                        <div 
                            className="news-card-image"
                            style={data.MAIN.UF_IMAGE ? {backgroundImage: `url(${process.env.REACT_APP_API_URL + data.MAIN.UF_IMAGE.url})`} : {}}
                        >
                        </div>
                        <div className="news-card-content d-flex flex-column">
                            <a 
                                className="news-card-title" 
                                href={`/news/${data.MAIN.ID}`}
                            >
                                {data.MAIN.UF_TITLE}
                            </a>
                            <div 
                                className="news-card-text"
                                dangerouslySetInnerHTML={data.MAIN.UF_TEXT ? {__html: JSON.parse(data.MAIN.UF_TEXT)} : undefined}
                            >
                            </div>
                            <div className="news-card-date mt-2">
                                {data.MAIN.UF_PUBLICATION_DATE}
                            </div>
                        </div>
                    </div>
                );
            }

            const components: Array<any> = [];

            if (data.ITEMS.length > 0) {
                data.ITEMS.forEach((item: {[key: string]: any}, index: number) => {
                    components.push(
                        <div 
                            className="col-sm-12 col-lg-6 col-xl-4 mt-2 mb-2" 
                            key={`news-item-${index}`}
                        >
                            <div className="news-card d-md-flex align-items-center justify-content-between">
                                <div 
                                    className="news-card-image"
                                    style={item.UF_IMAGE ? {backgroundImage: `url(${process.env.REACT_APP_API_URL + item.UF_IMAGE.url})`} : {}}
                                >
                                </div>
                                <div className="news-card-content d-flex flex-column">
                                    <a 
                                        className="news-card-title" 
                                        href={`/news/${item.ID}`}
                                    >
                                        {item.UF_TITLE}
                                    </a>
                                    <div 
                                        className="news-card-text"
                                        dangerouslySetInnerHTML={item.UF_TEXT ? {__html: JSON.parse(item.UF_TEXT)} : undefined}
                                    >
                                    </div>
                                    <div className="news-card-date mt-2">
                                        {item.UF_PUBLICATION_DATE}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }

            setNews(components);
        }
    }, [data]);

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setPageSize(pageSize);
    };

    const onChangeHandler: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page);
        
        reposNewsData({page, pageSize}).then(({data}) => {
            setNewsData(data);
        });

        dispatch(fetchSetPageSettings({page, pageSize}));
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>
                Новости
            </PageTitle>

            {isLoading && 
                <div className="grid-spinner-wrap">
                    <Spin 
                        size="large" 
                        tip="Загрузка..." 
                        spinning={isLoading} 
                    />
                </div>
            }

            {!isLoading && newsData &&
                <div className="news">
                    {page === 1 &&
                        <div className="news-main">
                            {mainNew}
                        </div>
                    }
                    <div className="row">
                        {news}
                    </div>
                    {newsData.COUNT > 0 &&
                        <div className="news-pagination mt-4">
                            <ConfigProvider locale={locale}>
                                <Pagination
                                    showSizeChanger
                                    showTotal={(total) => `Всего: ${total}`}
                                    onShowSizeChange={onShowSizeChange}
                                    defaultCurrent={page}
                                    total={newsData.COUNT}
                                    onChange={onChangeHandler}
                                    className="d-flex justify-content-center"
                                    hideOnSinglePage={newsData.COUNT < 10}
                                />
                            </ConfigProvider>
                        </div>
                    }
                </div>
            }
        </>
    )
}