import { useState } from 'react';
import { DatePicker, ConfigProvider, Button } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import moment from 'moment';

export function GridFilterMobileDatePicker(props: any) {
    const {filterValues, setFilterValues, item, isRange} = props;

    const now = new Date();
    const [visible, setVisible] = useState(false);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);

    return (
        <div className='grid-filter-mobile-date'>
            {isRange && 
                <>
                    <div className="grid-filter-mobile-date-item">
                        <Button
                            size='mini'
                            color='primary'
                            fill='outline'
                            onClick={() => {
                                setStartVisible(true)
                            }}
                        >
                            {filterValues[item.field] && filterValues[item.field][0] ? moment(filterValues[item.field][0]).format('DD.MM.YYYY') : 'Начало'}
                        </Button>
                        <ConfigProvider locale={enUS}>
                            <DatePicker
                                title='Начало'
                                visible={startVisible}
                                onClose={() => {
                                    setStartVisible(false)
                                }}
                                defaultValue={filterValues[item.field] && filterValues[item.field][0] ? moment(filterValues[item.field][0]).toDate() : now}
                                max={now}
                                onConfirm={val => {
                                    setFilterValues({
                                        ...filterValues,
                                        [item.field]: [val ? moment(val) : null, filterValues[item.field] ? filterValues[item.field][1] : null]
                                    })
                                }}
                            />
                        </ConfigProvider>
                    </div>
                    <div className="grid-filter-mobile-date-item">
                        <Button
                            size='mini'
                            color='primary'
                            fill='outline'
                            onClick={() => {
                                setEndVisible(true)
                            }}
                        >
                            {filterValues[item.field] && filterValues[item.field][1] ? moment(filterValues[item.field][1]).format('DD.MM.YYYY') : 'Конец'}
                        </Button>
                        <ConfigProvider locale={enUS}>
                            <DatePicker
                                title='Конец'
                                visible={endVisible}
                                onClose={() => {
                                    setEndVisible(false)
                                }}
                                max={now}
                                defaultValue={filterValues[item.field] && filterValues[item.field][1] ? moment(filterValues[item.field][1]).toDate() : now}
                                onConfirm={val => {
                                    setFilterValues({
                                        ...filterValues,
                                        [item.field]: [filterValues[item.field] ? filterValues[item.field][0] : null, val ? moment(val) : null]
                                    })
                                }}
                            />
                        </ConfigProvider>
                    </div>
                </>
            }
            {!isRange && 
                <>
                    <Button
                        size='mini'
                        color='primary'
                        fill='outline'
                        onClick={() => {
                            setVisible(true)
                        }}
                    >
                        {filterValues[item.field] ? moment(filterValues[item.field]).format('DD.MM.YYYY') : 'Дата'}
                    </Button>
                    <ConfigProvider locale={enUS}>
                        <DatePicker
                            title='Дата'
                            visible={visible}
                            onClose={() => {
                                setVisible(false)
                            }}
                            max={now}
                            defaultValue={filterValues[item.field] ? moment(filterValues[item.field]).toDate() : now}
                            onConfirm={val => {
                                setFilterValues({
                                    ...filterValues,
                                    [item.field]: val ? moment(val) : ''
                                })
                            }}
                        />
                    </ConfigProvider>
                </>
            }
        </div>
    );
}