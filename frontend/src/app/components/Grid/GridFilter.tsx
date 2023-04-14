import React, {useState, useRef, useEffect} from 'react';

import { 
    useFilterGetSavedDataQuery,
    useLazyFilterSetSavedDataQuery
} from "../../store/appApi";

import { IGridFilterRow } from '../../interface/Interface';
import { Select, Input, DatePicker, ConfigProvider } from 'antd';
import { GridFilterMobileDatePicker } from '../Grid/GridFilterMobileDatePicker';
import locale from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'antd/dist/antd.css';
import 'moment/locale/ru';

export function GridFilter({
    savedFilterDataType,
    page,
    setPage,
    pageSize,
    filterData, 
    filterFields, 
    setFilterValues
}: {
    savedFilterDataType: string,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    pageSize: number,
    filterData: IGridFilterRow[] | undefined, 
    filterFields: {[key: string]: any } 
    setFilterValues: React.Dispatch<React.SetStateAction<{[key: string]: any}>>
}) {
    const {data} = useFilterGetSavedDataQuery(savedFilterDataType, {
        refetchOnFocus: false
    });

    let savedFilterData = data ? JSON.parse(data.jsonFilter) : filterFields;

    let [localFilterValues, setLocalFilterValues] = useState(savedFilterData);

    const [reposSavedFilterData] = useLazyFilterSetSavedDataQuery({
        refetchOnFocus: false
    });

    function handleChange (e: React.ChangeEvent<any>) {
        const { name, value } = e.target;

        setLocalFilterValues({
            ...localFilterValues,
            [name]: value,
        });
    }

    function changeFilterValues() {
        setPage(1);
        setFilterValues(localFilterValues);
        reposSavedFilterData({type: savedFilterDataType, page: page, pageSize: pageSize, jsonFilter: localFilterValues});
    }

    function clearFilter() {
        setFilterValues(filterFields);
        setLocalFilterValues(filterFields);
        reposSavedFilterData({type: savedFilterDataType, page: page, pageSize: pageSize, jsonFilter: filterFields});
    }

    const { Option } = Select;
    const { RangePicker } = DatePicker;

    moment.defineLocale('ru', {
        week: {
            dow: 1
        }
    });

    const handleSelectChange = (value: string[], item: IGridFilterRow) => {
        setLocalFilterValues({
            ...localFilterValues,
            [item.field]: value
        });
    };

    const handleSelectMultipleChange = (value: string, item: IGridFilterRow) => {
        setLocalFilterValues({
            ...localFilterValues,
            [item.field]: value
        });
    };

    const [showFilter, setShowFilter] = useState(false);

    const filterButton = useRef<HTMLButtonElement>(null);
    const filterWrap = useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent) => {
        if (e.target instanceof HTMLElement) {
            if (filterButton && filterButton.current) {
                if (!filterButton.current.contains(e.target)) {
                    if (filterWrap && filterWrap.current) {
                        if (!filterWrap.current.contains(e.target)) {
                            if (e.target.className.length > 0 && !e.target.className.includes('ant')) {
                                setShowFilter(false);
                            } else {
                                let parent = e.target.closest('.grid-filter-wrap');

                                if (!parent) {
                                    let dropdown = e.target.closest('.ant-picker-dropdown');

                                    if (!dropdown) {
                                        if (!e.target.className.includes('ant-select-item-option-content')) {
                                            setShowFilter(false);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="grid-filter mb-4">
            <button id="grid-filter-main-button" className="fw-bold custom-btn bg-main d-flex align-items-center" ref={filterButton} onClick={() => setShowFilter(!showFilter)}>
                <i className="fas fa-filter text-white fs-4 me-2"></i> Фильтр
            </button>

            {showFilter && filterData &&
                <div className="grid-filter-modal" ref={filterWrap}>
                    <div className="grid-filter-modal-content p-2">
                        {
                            filterData.map((item: IGridFilterRow) => (
                                <div className="grid-filter-wrap mt-2 mb-2" key={item.id}>
                                    <label htmlFor="input-1" className="form-label fw-bold grid-filter-label mb-1">
                                        {item.label}
                                    </label>

                                    {item.type === 'text' && 
                                        <Input 
                                            type="text" 
                                            id={item.id}
                                            allowClear 
                                            className="grid-filter-input"
                                            name={item.field}
                                            onChange={handleChange}
                                            value={localFilterValues[item.field]}
                                        />
                                    }

                                    {item.type === 'date' && 
                                        <>
                                            <div className='grid-filter-date'>
                                                <ConfigProvider locale={locale}>
                                                    <DatePicker
                                                        value={localFilterValues[item.field] ? moment(localFilterValues[item.field], 'DD.MM.YYYY') : localFilterValues[item.field]}
                                                        placeholder={'Дата'}
                                                        format="DD.MM.YYYY"
                                                        onChange={(value: any, formatString: string) => (
                                                            setLocalFilterValues({
                                                                ...localFilterValues,
                                                                [item.field]: value ? value : ''
                                                            })
                                                        )}
                                                    />
                                                </ConfigProvider>
                                            </div>
                                            <GridFilterMobileDatePicker 
                                                filterValues={localFilterValues} 
                                                setFilterValues={setLocalFilterValues} 
                                                item={item}
                                                isRange={false} 
                                            />
                                        </>
                                    }

                                    {item.type === 'date-range' && 
                                        <>
                                            <div className='grid-filter-date'>
                                                <ConfigProvider locale={locale}>
                                                    <RangePicker
                                                        value={savedFilterData[item.field] && localFilterValues[item.field][0] && localFilterValues[item.field][1] ? [moment(localFilterValues[item.field][0]), moment(localFilterValues[item.field][1])] : localFilterValues[item.field]}
                                                        placeholder={['С', 'по']}
                                                        format="DD.MM.YYYY"
                                                        onChange={(values: any, formatString: [string, string]) => (
                                                            setLocalFilterValues({
                                                                ...localFilterValues,
                                                                [item.field]: values ? [ values[0], values[1]] : []
                                                            })
                                                        )}
                                                    />
                                                </ConfigProvider>
                                            </div>
                                            <GridFilterMobileDatePicker 
                                                filterValues={localFilterValues} 
                                                setFilterValues={setLocalFilterValues} 
                                                item={item}
                                                isRange={true} 
                                            />
                                        </>
                                    }

                                    {item.type === 'select' && 
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            onChange={(value) => handleSelectChange(value, item)}
                                            value={localFilterValues[item.field]}
                                        >
                                            {item.items?.map((i: {label: string, value: string}) => (
                                                <Option 
                                                    selected={localFilterValues[item.field] === i.value} 
                                                    value={i.value} 
                                                    key={i.value}
                                                >
                                                    {i.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    }

                                    {item.type === 'select-multiple' && 
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            onChange={(value) => handleSelectMultipleChange(value, item)}
                                            value={localFilterValues[item.field]}
                                        >
                                            {item.items?.map((i: {label: string, value: string}) => (
                                                <Option 
                                                    selected={localFilterValues[item.field] === i.value} 
                                                    value={i.value} 
                                                    key={i.value}
                                                >
                                                    {i.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid-filter-buttons d-flex align-items-center justify-content-around pt-6">
                        <button 
                            className="fw-bold custom-btn grid-filter-button"
                            onClick={changeFilterValues}
                        >
                            Найти
                        </button>
                        <button 
                            className="fw-bold custom-btn grid-filter-button" 
                            onClick={clearFilter}
                        >
                            Сбросить
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}