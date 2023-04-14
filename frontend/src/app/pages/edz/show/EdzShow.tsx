import { PageTitle } from '../../../../_metronic/layout/core';
import { useParams } from 'react-router-dom';
import { setForm } from '../../../store/formSlice';
import { fetchEntity, fetchAttributes, fetchSave, setFormValues } from '../../../store/formSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { Comments } from './../components/show/comments/Comments';
import { Stages } from './../components/show/stages/Stages';
import { Header } from './../components/show/header/Header';
import { Spin } from 'antd';
import moment from 'moment';
import { isEqual } from 'lodash';
import 'antd/dist/antd.css';

export function EdzShow() {
    const dispatch  = useAppDispatch()
    const params = useParams();
    const dealId = parseInt(params.id as string);
    const [isLoadingOpen, setIsLoadingOpen] = useState(true);
    const { isLoading, values, valuesFirst, templateRequest } = useAppSelector((state) => state.form);
    const [saveVisibility, setSaveVisibility] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setIsLoadingOpen(true);
        console.log('OPEN !!!');
    },[])

    useEffect(() => {
        dispatch(fetchAttributes(['view', dealId])).then(() => { 
            dispatch(fetchEntity(dealId));
            setIsLoadingOpen(false);
        });
    }, [dispatch, dealId]);

    async function sendRequest() {
        setLoad(true);

        await new Promise((resolve) => {
            resolve(dispatch(setForm({ value: moment().format('DD.MM.YYYY hh:mm:ss'), attribute: 'UF_PARTNER_SEND_DATE' })));
        }).then(() => {
            dispatch(fetchSave(dealId)).then(() => {
                dispatch(fetchAttributes('view')).then(() => {
                    dispatch(fetchEntity(dealId));
                    setLoad(false);
                });
            });
        });
    }

    useEffect(() => {
        const valuesUpdate = [];

        for (let item in values ) {
            if (values.hasOwnProperty(item) && !isEqual(values[item], valuesFirst[item])) {
                valuesUpdate.push(values[item]);
            }
        }

        setSaveVisibility(valuesUpdate.length > 0);
    }, [values, valuesFirst]);

    function handleSave() {
        setLoad(true);

        dispatch(fetchSave(dealId)).then(() => {
            dispatch(fetchAttributes('view')).then(() => {
                dispatch(fetchEntity(dealId));
                setLoad(false);
            });
        });
    }

    function handleCancel() {
        dispatch(setFormValues({values: valuesFirst}));
    }

    return (<>
        <PageTitle breadcrumbs={[]}>
            ЭДЗ
        </PageTitle>

        {(isLoading || isLoadingOpen) &&
            <div className="grid-spinner-wrap">
                <Spin size="large" tip="Загрузка..." spinning={isLoading}/>
            </div>
        }

        {!(isLoading || isLoadingOpen) &&
            <div className="edz-show">
                <div className="row">
                    <div className="col-md-12 header-wrap">
                        <Header 
                            sendRequest={sendRequest}
                            values={values}
                            load={load}
                            setLoad={setLoad}
                        />
                    </div>
                    <div className="col-md-12 col-xl-8 stages-wrap">
                        <Stages
                            history={values.STAGE_HISTORY} 
                            activeStage={values.STAGE_ID} 
                            templateRequest={templateRequest}
                        />
                    </div>
                    <div className="col-md-12 col-xl-4 comments-wrap">
                        <Comments dealId={dealId} />
                    </div>
                </div>
                {saveVisibility &&
                    <div className=" d-flex align-items-center justify-content-center bg-white flex-wrap position-sticky py-5 ps-9 bottom-0 text-center">
                        <button 
                            className="custom-btn bg-main me-4"
                            data-kt-indicator={load ? 'on' : 'off'}
                            onClick={handleSave}
                        >
                            <span className="indicator-label">
                                Сохранить
                            </span>
                            <span className="indicator-progress">
                                Сохранить <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                        <button
                            className="custom-btn bg-grey-2 bg-hover-grey-light-3 text-primary" 
                            onClick={handleCancel}
                        >
                            Отмена
                        </button>
                    </div>
                }
            </div>
        }
    </>)
}
