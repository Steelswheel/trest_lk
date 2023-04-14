import { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import moment from 'moment';
import 'moment/locale/ru';

export function Calendar() {
    const [value, onChange] = useState(new Date());
    const events = [];

    return (
        <div className="dashboard-calendar">
            <div className="dashboard-card">
                <div className="dashboard-card-content">
                    <div className="dashboard-calendar-wrap d-flex align-items-stretch">
                        <div className="dashboard-calendar-calendar">
                            <ReactCalendar
                                value={value}
                                onChange={onChange}
                                prevLabel={<i className="fa fa-circle-arrow-left"></i>}
                                nextLabel={<i className="fa fa-circle-arrow-right"></i>}
                                navigationLabel={({date}) => moment(date).format('MMMM YYYY')}
                            />
                        </div>
                        <div className="dashboard-calendar-events">
                            <div className="dashboard-calendar-events-header">
                                События
                            </div>
                            {events.length > 0 &&
                                <div className="dashboard-calendar-events-empty">
                                    Событий нет
                                </div>
                            }
                            <div className="dashboard-calendar-events-list">
                                <div className="dashboard-calendar-events-list-wrap">
                                    <div className="dashboard-calendar-events-list-title">
                                        Срочно
                                    </div>
                                    <div className="dashboard-calendar-events-list-content">
                                        <div className="dashboard-calendar-events-list-content-item">
                                            3 октября 2022 - предоставить оригиналы
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-calendar-events-list-wrap">
                                    <div className="dashboard-calendar-events-list-title">
                                        В работе
                                    </div>
                                    <div className="dashboard-calendar-events-list-content">
                                        <div className="dashboard-calendar-events-list-content-item">
                                            12 октября 2022 - что-то
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-calendar-events-list-wrap">
                                    <div className="dashboard-calendar-events-list-title">
                                        Уже произошло
                                    </div>
                                    <div className="dashboard-calendar-events-list-content">
                                        <div className="dashboard-calendar-events-list-content-item">
                                            2 октября 2022 - что-то
                                        </div>
                                        <div className="dashboard-calendar-events-list-content-item">
                                            1 октября 2022 - что-то
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}