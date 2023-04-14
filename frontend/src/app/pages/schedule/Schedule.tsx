import { PageTitle } from '../../../_metronic/layout/core';
import { useGetScheduleQuery } from '../../store/appApi';
import { ScheduleItem } from './components/ScheduleItem';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import { ImageDetail } from '../../components/ImageDetail/ImageDetail';

interface IScheduleItem {
    UF_SORT: number;
    UF_TITLE: string;
    UF_TEXT: string;
}

export function Schedule() {
    const [sortedData, setSortedData] = useState<Array<any>>([]);
    const [imageUrl, setImageUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    let { data, isLoading } = useGetScheduleQuery({}, {
        refetchOnFocus: false
    });

    useEffect(() => {
        if (data) {
            const arr = data.slice();

            arr.sort((a: IScheduleItem, b: IScheduleItem) => {
                return a.UF_SORT - b.UF_SORT;
            });

            setSortedData(arr);
        }
    }, [data]);

    function handleCancel() {
        setIsModalOpen(false);
    }

    function openModal(src: string) {
        setImageUrl(src);
        setIsModalOpen(true);
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>
                Регламент работы
            </PageTitle>

            <div className="schedule">
                {isLoading && 
                    <div className="grid-spinner-wrap">
                        <Spin 
                            size="large" 
                            tip="Загрузка..." 
                            spinning={isLoading} 
                        />
                    </div>
                }

                {!isLoading && sortedData.length > 0 &&
					<>
                        <div className="schedule-content mt-2">
                            {
                                sortedData.map((item: IScheduleItem, index: number) => (
                                    <ScheduleItem 
                                        data={item} 
                                        index={index}
                                        key={`schedule-item-${index}`}
                                        openModal={openModal}
                                    />
                                ))
                            }
                        </div>
                        <ImageDetail
                            isModalOpen={isModalOpen}
                            handleCancel={handleCancel}
                            imageUrl={imageUrl}
                        />
                    </>
                }
            </div>
        </>
    )
}