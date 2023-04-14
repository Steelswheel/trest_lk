
import { PageTitle } from '../../../../_metronic/layout/core';
import { setForm } from '../../../store/formSlice';
import { useEffect, useState } from 'react';
import { fetchAttributes, fetchEntity, fetchSave, setValueNull } from '../../../store/formSlice';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapInputTemplate } from '../../../components/Input/WrapInputTemplate';
import moment from 'moment';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

export function EdzRequest() {
    const dispatch  = useAppDispatch(); 
    const params = useParams();
    let navigate = useNavigate();
    const dealId = parseInt(params.id as string);
    const [isLoadingOpen, setIsLoadingOpen] = useState(true);
    const [save, setSave] = useState(false);

    const { isLoading, values, templateRequest } = useAppSelector((state) => state.form);

    useEffect(() => {
        setIsLoadingOpen(true);
        console.log('OPEN !!!');
    },[])

    useEffect(() => {
        if (dealId > 0) {
            dispatch(fetchAttributes(['request', dealId])).then(() => {
                setIsLoadingOpen(false);
                dispatch(fetchEntity(dealId));
            });
        } else {
            dispatch(fetchAttributes(['request', dealId])).then(() => {
                setIsLoadingOpen(false);
                dispatch(setValueNull());
            });
        }
    }, [dispatch, dealId]);

    function handleUpdate (e: any) {
        setSave(true);

        if (dealId > 0) {
            dispatch(fetchSave(dealId)).then(() => setSave(false));
        } else {
            dispatch(fetchSave()).then(r => {
                // @ts-ignore
                navigate('/edz/request/' + r.payload.dealId);
            }).then(() => setSave(false));
        }

        e.preventDefault();
    }

    async function sendRequest() {
        setSave(true);

        await new Promise((resolve) => {
            resolve(dispatch(setForm({ value: moment().format('DD.MM.YYYY hh:mm:ss'), attribute: 'UF_PARTNER_SEND_DATE' })));
        }).then(() => {
            dispatch(fetchSave(dealId)).then(() => {
                setIsEdit(false);
                setSave(true);
            });
        });
    }

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (values['UF_PARTNER_SEND_DATE'] && values['UF_PARTNER_SEND_DATE'].length > 0) {
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    }, [values]);

    return (<>
        <PageTitle breadcrumbs={[]}>
            {Number(dealId) ? `Заявка #${dealId}` : 'Новая заявка'}
        </PageTitle>

        <div className="app-container container-xxl">
            <div className="custom-card mb-5 mb-xl-10">
                <div className="custom-card-header">
                    Заемщик
                </div>

                <div className="custom-card-content">
                    {(isLoading || isLoadingOpen) &&
                        <div className="grid-spinner-wrap pb-10">
                            <Spin size="large" tip="Загрузка..." spinning={isLoading}/>
                        </div>
                    }

                    {!(isLoading || isLoadingOpen) &&
                        <div>
                            <div className="edz-request">
                                <WrapInputTemplate 
                                    template={templateRequest} 
                                    isEdit={isEdit}
                                />
                            </div>
                            {isEdit &&
                                <div 
                                    className="edz-request-buttons d-flex align-items-center justify-content-center flex-wrap position-sticky my-3 ps-9 bottom-0 text-center"
                                    style={{zIndex: '10'}}
                                >
                                    <button 
                                        className={`custom-btn bg-main me-sm-6 mb-4`}
                                        onClick={handleUpdate}
                                    >
                                            {save && 
                                                <i 
                                                    className="fas fa-sync fa-spin me-2" 
                                                    style={{color: 'white', fontSize: '14px'}}
                                                ></i>
                                            }
                                            {!save && 
                                                <i 
                                                    className="fas fa-save me-2" 
                                                    style={{color: 'white', fontSize: '14px'}}
                                                ></i>
                                            }
                                            {dealId > 0 ? 'Сохранить' : 'Создать'}
                                    </button>
                                    {dealId > 0 && 
                                        <button
                                            className="custom-btn bg-main mb-4"
                                            onClick={() => sendRequest()}
                                        >
                                            {save && 
                                                <i 
                                                    className="fas fa-sync fa-spin me-2"
                                                    style={{color: 'white', fontSize: '14px'}}
                                                ></i>
                                            }
                                            {!save && 
                                                <i 
                                                    className="fa fa-paper-plane me-2"
                                                    style={{color: 'white', fontSize: '14px'}}
                                                ></i>
                                            }
                                            Отправить менеджеру
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </>)
}
