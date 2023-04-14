import { useEffect, useState, useMemo, memo } from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import { 
    useDesignListQuery,
    useDesignFilterQuery,
    useLazyDesignAddNewTaskQuery,
    useFilterGetSavedDataQuery
} from '../../store/appApi';

import { IGridFilterRow, } from '../../interface/Interface';

import { GridTable } from './../../components/Grid/GridTable';
import { GridFilter } from './../../components/Grid/GridFilter';
import { columns } from './components';
import { PartnerFiles } from './components/PartnerFiles';

import { 
    Spin, 
    Modal, 
    Input, 
    Select, 
    Form, 
    Button 
} from 'antd';

import 'antd/dist/antd.css';

import _ from 'lodash';

export function DesignList() {
    const {data: filterSavedData} = useFilterGetSavedDataQuery('design', {
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

    const {data: filterData} = useDesignFilterQuery(null, {
        refetchOnFocus: false
    });

    const filterFields: {[key: string]: string | number | Array<any>} = useMemo(() => ({}), []);

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

    let { data, isLoading, isFetching: isDesignListFetching, refetch } = useDesignListQuery({page: 1, pageSize: pageSize, jsonFilter: JSON.stringify(filterValues)}, {
        refetchOnFocus: false
    });

    const MemoTable = memo(GridTable);

    const [isModalOpen, setIsModalOpen] = useState(false);

    function showModal() {
        setIsModalOpen(true);
    };

    const { TextArea } = Input;
    const { Option } = Select;
    const { Item } = Form;

    const selectOptions: Array<{value: string, label: string}> = [
        {
            value: 'Для соцсети',
            label: 'Для соцсети'
        },
        {
            value: 'Для газеты',
            label: 'Для газеты'
        },
        {
            value: 'Визитка',
            label: 'Визитка'
        },
        {
            value: 'Вывеска',
            label: 'Вывеска'
        },
        {
            value: 'Баннер',
            label: 'Баннер'
        },
        {
            value: 'Листовка',
            label: 'Листовка'
        },
        {
            value: 'Буклет',
            label: 'Буклет'
        }
    ];

    const [reposFetch, isFetching] = useLazyDesignAddNewTaskQuery({refetchOnFocus: false});
    const [isTaskCreated, setIsTaskCreated] = useState(false);
    const [isTaskCreateError, setIsTaskCreateError] = useState(false);
    const [form] = Form.useForm();
    const [partnerFiles, setPartnerFiles] = useState<Array<any>>([]);

    useEffect(() => {
        form.setFieldValue('MAQUETTE_PARTNER_FILES', partnerFiles);
    }, [partnerFiles]);

    function handleSubmit(values: any) {
        reposFetch(values).then((data: any) => {
            if (data) {
                setIsTaskCreated(true);
            } else {
                setIsTaskCreateError(true);
            }

            form.resetFields();
        }).then(() => refetch());
    };

    function handleClose(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation();

        setIsModalOpen(false);
        setIsTaskCreated(false);
        setIsTaskCreateError(false);
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>
                Заказать макет
            </PageTitle>

            {isLoading && <div className="grid-spinner-wrap"><Spin size="large" tip="Загрузка..." spinning={isLoading}></Spin></div>}

            {!isLoading && <div className="design-list">
                    <div className="grid">
                        <div className="d-flex align-items-center justify-content-between">
                            <GridFilter
                                page={page}
                                setPage={setPage}
                                pageSize={pageSize}
                                filterData={filterData}
                                filterFields={filterFields}
                                setFilterValues={setFilterValues}
                                savedFilterDataType="design"
                            />

                            <button className="fw-bold custom-btn bg-main mb-4" onClick={showModal}>
                                <i className="fas fa-pen-ruler text-white fs-4 me-2"></i>
                                Заказать
                            </button>

                            <Modal 
                                title={<div className="fw-bold text-center fs-3">Заказать макет</div>}
                                open={isModalOpen} 
                                footer={false}
                                onCancel={handleClose}
                                centered={true}
                            >
                                {isTaskCreated && <p className="fw-bold text-center">Задача успешно создана!</p>}
                                
                                {isTaskCreateError && <p className="fw-bold text-center">Ошибка при создании задачи!</p>}
                                
                                {!isTaskCreated &&
                                    <Form
                                        name="design-modal"
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleSubmit}
                                    >
                                        <Item 
                                            label="Назначение макета:"
                                            name="MAQUETTE_PURPOSE"
                                            rules={[{ required: true, message: 'Выберите назначение' }]}
                                            className="fw-bold"
                                        >
                                            <Select
                                                placeholder="Назначение"
                                                mode="multiple"
                                                allowClear
                                                style={{ width: '100%' }}
                                            >
                                                {selectOptions.map((i: {label: string, value: string}) => (
                                                    <Option
                                                        value={i.value} 
                                                        key={i.value}
                                                    >
                                                        {i.label}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Item>
                                        <Item
                                            label="Размеры макета:"
                                            name="MAQUETTE_METRICS"
                                            className="fw-bold"
                                        >
                                            <Input 
                                                id="design-maquette-metrics"
                                                className="mt-2"
                                            />
                                        </Item>
                                        <Item
                                            label="Контакты для макета (название, адрес, телефон):"
                                            name="MAQUETTE_CONTACTS"
                                            rules={[{ required: true, message: 'Укажите контакты' }]}
                                            className="fw-bold"
                                        >
                                            <TextArea 
                                                id="design-maquette-contacts"
                                                className="mt-2"
                                            />
                                        </Item>
                                        <Item
                                            label="Email:"
                                            name="MAQUETTE_EMAIL"
                                            className="fw-bold"
                                        >
                                            <Input 
                                                id="design-maquette-email"
                                                className="mt-2"
                                            />
                                        </Item>
                                        <Item
                                            label="Прикрепить файлы:"
                                            name="MAQUETTE_PARTNER_FILES"
                                            className="fw-bold"
                                        >
                                            <PartnerFiles 
                                                files={partnerFiles} 
                                                setFiles={setPartnerFiles} 
                                            />
                                        </Item>
                                        <Item
                                            label="Дополнительная информация:"
                                            name="MAQUETTE_INFO"
                                            className="fw-bold"
                                        >
                                            <TextArea 
                                                id="design-maquette-info" 
                                                name="MAQUETTE_INFO" 
                                                className="mt-2"
                                            />
                                        </Item>
                                        <Item wrapperCol={{ offset: 8, span: 16 }}>
                                            <Button 
                                                htmlType="submit" 
                                                type="primary" 
                                                size="middle"
                                                loading={isFetching.status === 'pending' ? true : false}
                                            >
                                                Создать
                                            </Button>
                                        </Item>
                                    </Form>
                                }
                            </Modal>
                        </div>

                        <MemoTable
                            tableData={data}
                            page={page}
                            pageSize={pageSize}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            isFetching={isDesignListFetching}
                            columns={columns} 
                            rows={data?.rows}
                            filterValues={filterValues}
                            savedFilterDataType="design" 
                        />
                    </div>
                </div>}
        </>
    )
}