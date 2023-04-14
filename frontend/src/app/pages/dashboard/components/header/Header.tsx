import  { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

interface IPartnerDealsData {
    CREATE_REQUESTS: string | number;
    DEALS_IN_PROCESS: string | number;
    ARCHIVE_DEALS: string | number;
    ORIGINALS: string | number;
    LAST_REQUESTS: Array<any>;
    PAYMENTS: Array<any> | false;
}

export function Header({data}: {data: IPartnerDealsData}) {
    useEffect(() => {
        new Swiper('.swiper', {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 36,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 10
                },
                375: {
                    slidesPerView: 1.5,
                    spaceBetween: 10
                },
                425: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                526: {
                    slidesPerView: 2.5,
                    spaceBetween: 10
                },
                627: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                767: {
                    slidesPerView: 2.5,
                    spaceBetween: 18
                },
                1134: {
                    slidesPerView: 3,
                    spaceBetween: 36
                },
                1387: {
                    slidesPerView: 3.5,
                    spaceBetween: 36
                },
                1549: {
                    slidesPerView: 4,
                    spaceBetween: 36
                }
            }
        });
    }, []);

    return (<>
        <div className="swiper">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="dashboard-header-card d-flex flex-column justify-content-between">
                        <div className="dashboard-header-card-header">
                            {data?.CREATE_REQUESTS ? data.CREATE_REQUESTS : 0}
                        </div>
                        <div className="dashboard-header-card-content">
                            Всего заведено заявок
                        </div>
                    </div>
                </div>
                <div className="swiper-slide">
                    <div className="dashboard-header-card d-flex flex-column justify-content-between">
                        <div className="dashboard-header-card-header">
                            {data?.DEALS_IN_PROCESS ? data.DEALS_IN_PROCESS : 0}
                        </div>
                        <div className="dashboard-header-card-content">
                            Сделки в работе:
                        </div>
                    </div>
                </div>
                <div className="swiper-slide">
                    <div className="dashboard-header-card d-flex flex-column justify-content-between">
                        <div className="dashboard-header-card-header">
                            {data?.ARCHIVE_DEALS ? data.ARCHIVE_DEALS : 0}
                        </div>
                        <div className="dashboard-header-card-content">
                            Сделки в архиве
                        </div>
                    </div>
                </div>
                <div className="swiper-slide">
                    <div className="dashboard-header-card d-flex flex-column justify-content-between">
                        <div className="dashboard-header-card-header">
                            {data?.ORIGINALS ? data.ORIGINALS : 0}
                        </div>
                        <div className="dashboard-header-card-content">
                            Предоставить оригиналы
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}