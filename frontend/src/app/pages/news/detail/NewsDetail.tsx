import { PageTitle } from '../../../../_metronic/layout/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { fetchItem } from '../../../store/news.slice';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { Error404 } from '../../../modules/errors/components/Error404';

export function NewsDetail() {
    const dispatch  = useAppDispatch();
    const params = useParams();
    const id = parseInt(params.id as string);

    const { isLoading, newsItemData } = useAppSelector((state) => state.news);

    useEffect(() => {
        dispatch(fetchItem(id));
    }, [dispatch, id]);

    function createImage(url: string) {
        let img = document.createElement('img');

        img.src = url;
        img.className = 'news-detail-image';
        img.alt = 'news-detail-image';
        img.align = 'left';

        return img;
    }

    useEffect(() => {
        if (newsItemData && newsItemData.UF_TEXT && newsItemData.UF_IMAGE && newsItemData.UF_IMAGE.url) {
            let text = document.querySelector('.news-detail-text')?.children[0];

            if (text) {
                let img = createImage(process.env.REACT_APP_API_URL + newsItemData.UF_IMAGE.url);

                text.prepend(img);
            } else {
                let p = document.createElement('p');
                p.insertAdjacentHTML('afterbegin', JSON.parse(newsItemData.UF_TEXT));

                let img = createImage(process.env.REACT_APP_API_URL + newsItemData.UF_IMAGE.url);
                p.prepend(img);

                document.querySelector('.news-detail-text')?.append(p);
            }
        }
    }, [newsItemData]);

    return (<>
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

        {!isLoading && !newsItemData && 
            <Error404
                linkTo="/news"
                linkText="Назад"
            />
        }

        {!isLoading && newsItemData &&
            <div className="news-detail container">
                <div className="d-flex mb-4 align-items-center justify-content-between flex-wrap">
                    <a 
                        href="/news"
                        className="news-detail-link"
                    >
                        Все новости
                    </a>
                    <div className="news-detail-date">
                        {newsItemData.UF_PUBLICATION_DATE}
                    </div>
                </div>

                {newsItemData.UF_TITLE &&
                    <h1 className="news-detail-title">
                        {newsItemData.UF_TITLE}
                    </h1>
                }
                {newsItemData.UF_TEXT &&
                    <div
                        className="news-detail-text mt-4"
                        dangerouslySetInnerHTML={!newsItemData.UF_IMAGE.url && newsItemData.UF_TEXT ? {__html: JSON.parse(newsItemData.UF_TEXT)} : undefined}
                    ></div>
                }
            </div>
        }
    </>);
}