

export function Header ({values, sendRequest, load, setLoad, className}: {values: {[key: string]: any}, sendRequest: any, load: boolean, setLoad: React.Dispatch<React.SetStateAction<boolean>>, className?: string}) {
    function getDecision() {
        let approved = ['440', '442', '737', '444', '740'];

        if (approved.includes(values.LOAN_DECISION_KZ)) {
            return 'ОДОБРЕНО';
        }

        if (values.LOAN_DECISION_KZ === '441') {
            return 'ОТКАЗ';
        }

        if (values.LOAN_DECISION_KZ === '466') {
            return 'НА ДОРАБОТКЕ';
        }

        return 'НЕ ПРИНЯТО';
    }

    function getDecisionClassName() {
        let approved = ['440', '442', '737', '444', '740'];

        if (approved.includes(values.LOAN_DECISION_KZ)) {
            return 'success';
        }

        if (values.LOAN_DECISION_KZ === '441') {
            return 'danger';
        }

        return 'grey-dark';
    }

    function getMaskedPhone(value: any) {
        return (value.VALUE[0] === '8' ? value.VALUE[0] : '8') + (value.VALUE.slice(1, 4).length > 0 ? ' (' + value.VALUE.slice(1, 4) + ') ' : '') + (value.VALUE.slice(4, 7).length > 0 ? ' ' + value.VALUE.slice(4, 7) : '') +  (value.VALUE.slice(7, 9).length > 0 ? '-' + value.VALUE.slice(7, 9) : '') + (value.VALUE.slice(9, 11).length > 0 ? '-' + value.VALUE.slice(9, 11) : '');
    }

    function getUnmaskedPhone(value: any) {
        let str = value.replace(/\s/gm, '').split('');

        str[0] = '+7';

        return str.join('');
    }

    function editEdz() {
        window.open(`/edz/request/${values.ID}`, '_blank');
    }

    const numberFormatter = new Intl.NumberFormat('ru', {style: 'decimal'});

    return (
        <div className={`edz-header custom-card mb-5 mb-xl-10 ${className ? className : ''}`}>
            <div className="custom-card-content">
                <div className="d-flex flex-wrap align-items-stretch justify-content-between">
                    <div className="edz-header-main">
                        <div className="edz-header-header d-flex flex-wrap align-items-center">
                            <div className="edz-header-name">
                                {values.LAST_NAME + ' ' + values.NAME + ' ' + values.SECOND_NAME}
                            </div>
                            {!values.UF_PARTNER_SEND_DATE &&
                                <div className="edz-header-edit">
                                    <button 
                                        className="custom-btn"
                                        onClick={editEdz}
                                    >
                                        Редактировать
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="edz-header-contacts d-flex flex-wrap flex-column">
                            {values.PHONE && values.PHONE.length > 0 &&
                                <div className="d-flex flex-wrap align-items-md-center">
                                    <i className="fa fa-phone me-2"></i>
                                    <div className="edz-header-contacts-wrap">
                                        {
                                            values.PHONE.map((item: any, index: number) => (
                                                <div
                                                    key={`edz-header-phone-${index}`}
                                                    className="edz-header-contacts-item"
                                                >
                                                    <a href={`tel:${getUnmaskedPhone(item.VALUE)}`}>
                                                        {getMaskedPhone(item)}
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            {values.EMAIL && values.EMAIL.length > 0 &&        
                                <div className="d-flex flex-wrap align-items-md-center">
                                    <i className="fa fa-envelope me-2"></i>
                                    <div className="edz-header-contacts-wrap">
                                        {
                                            values.EMAIL.map((item: any, index: number) => (
                                                <div
                                                    key={`edz-header-email-${index}`}
                                                    className="edz-header-contacts-item"
                                                >
                                                    <a href={`mailto:${item.VALUE}`}>
                                                        {item.VALUE}
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="edz-header-footer">
                            {!values.UF_PARTNER_SEND_DATE &&
                                <button 
                                    className="custom-btn bg-main"
                                    onClick={sendRequest}
                                    data-kt-indicator={load ? 'on' : 'off'}
                                >
                                    <span className="indicator-label">
                                        Отправить заявку
                                    </span>
                                    <span className="indicator-progress">
                                        Отправить заявку <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                                </button>
                            }
                        </div>
                    </div>
                    <div className="edz-header-finance d-flex flex-column justify-content-around">
                        <div className="edz-header-sum">
                            <div className="edz-header-title">
                                Сумма займа:
                            </div>
                            <div className="edz-header-content">
                                {values.OPPORTUNITY ? numberFormatter.format(values.OPPORTUNITY) : 0}
                            </div>
                            <div className="edz-header-sub">
                                {values.MSK_SUM ? 'МСК' : ''} {values.MSK_SUM && values.RSK_SUM ? '+' : ''} {values.RSK_SUM ? 'РСК' : ''}
                            </div>
                        </div>
                        <div className="edz-header-tranches">
                            <div className="edz-header-title">
                                Количество траншей:
                            </div>
                            <div className="edz-header-content">
                                {values.TRANSHEE_LPR ? values.TRANSHEE_LPR : 'Не указано'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`edz-header-ribbon bg-${getDecisionClassName()} d-flex justify-content-center align-items-center`}>
                    <span>{getDecision()}</span>
                </div>
            </div>
        </div>
    );
}