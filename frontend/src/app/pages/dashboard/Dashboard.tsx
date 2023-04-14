/* eslint-disable jsx-a11y/anchor-is-valid */
import { PageTitle } from '../../../_metronic/layout/core';
import { Header } from './components/header/Header';
import { News } from './components/news/News';
import { Payments } from './components/payments/Payments';
import { Requests } from './components/requests/Requests';
import { Statistic } from './components/statistic/Statistic';
import { useGetDashboardDataQuery } from './../../store/appApi';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

export function Dashboard() {
	let { data, isLoading } = useGetDashboardDataQuery({}, {
        refetchOnFocus: false
    });

	return (
		<>
			<PageTitle breadcrumbs={[]}>
				Главная
			</PageTitle>

			<div className={`dashboard ${isLoading ? 'd-flex align-items-center justify-content-center' : ''}`}>
				{isLoading && 
					<div className="grid-spinner-wrap">
						<Spin 
							size="large" 
							tip="Загрузка..." 
							spinning={isLoading} 
						/>
					</div>
				}

				{!isLoading &&
					<>
						<div className="dashboard-header">
							<Header data={data.header} />
						</div>
						<div className="dashboard-requests">
							<Requests data={data.requests} />
						</div>
						{data.news &&
							<div className="dashboard-news">
								<News data={data.news} />
							</div>
						}
						<div className="dashboard-payments">
							<Payments data={data.payments}/>
						</div>
						<div className="dashboard-statistic">
							<Statistic data={data.chart}/>
						</div>
					</>
				}
			</div>
		</>
	)
}