export interface CustomError {
    name: string;
    message: string;
    stack: string;
    response: string;
}

export interface IGridFilterRow {
    id: string;
    type: string;
    field: string;
    label: string;
    items?: Array<{label: string, value: string}>
}

export interface IGridEdzRow {
    key: React.Key;
    DATE_CREATE: string;
    FIO: {
        ID: string | number;
        KEY: string; 
        NAME: string, 
        TAGS: Array<string>
    } | null;
    BORROWER_FIO: string;
    STAGE: string;
    CONTRACT_NUMBER: string | number;
    SUM: string;
    DECISION_KZ: string;
    CATEGORY: string;
    TRANCHES: string;
    BANK: Array<IGridBankStatus> | undefined;
    COMMENTS: Array<string> | [];
}

export interface IGridBankStatus {
    KEY: string;
    LINK: string;
    DATE: string;
    STATUS: string;
    COLOR: string;
    SUM: string;
}

export interface IGridEdsRow {
    key: React.Key;
    SAVER_FIO: string;
    DATE_CREATE: string;
    FIO: {
        ID: string | number;
        KEY: string; 
        NAME: string, 
        TAGS: Array<string>
    } | null;
    STAGE: string;
    CONTRACT_NUMBER: string | number;
    INTEREST_RATE: string;
    CONTRACT_PERIOD: string;
    INTEREST_PAYMENT: string;
    SUM: string;
    FACT_PAYMENTS: string;
    DEPOSIT_END_DATE: string;
    DEPOSIT: {
        KEY: string;
        SUM: string;
        DATE: string;
    };
    BALANCE_REPLENISHMENTS: {
        KEY: string;
        SUM: string;
        DATE: string;
        PAYMENTS: Array<IGridRowPayment>;
    };
    PARTIAL_WITHDRAWALS: {
        KEY: string;
        SUM: string;
        DATE: string;
        PAYMENTS: Array<IGridRowPayment>;
    };
    INTERESTS_PAYMENTS: {
        KEY: string;
        SUM: string;
        DATE: string;
        PAYMENTS: Array<IGridRowPayment>;
    };
    CASH_PAYMENT: {
        KEY: string;
        SUM: string;
        DATE: string;
        PAYMENTS: Array<IGridRowPayment>;
    };
}

export interface IGridRowPayment {
    KEY: string;
    SUM: string;
    DESCRIPTION: string;
    DATE: string;
}

export interface IServerTableResponse<T> {
    rows: Array<T> | undefined;
    pageSize: number;
    pageNumber: number;
    totalCount: number;
}

//Параметры для передачи в запрос
export interface ITableSizeQuerySettings {
    type?: string; 
    page: number;
    pageSize: number;
}

export interface ITableSizeGetQuerySettings extends ITableSizeQuerySettings {
    jsonFilter: string;
}

export interface ITableSizePostQuerySettings extends ITableSizeQuerySettings {
    jsonFilter: {
        [key: string]: any;
    };
}

export interface IGridDesignRow {
    key: React.Key;
    CREATED_DATE: string;
    FIO: {
        ID: string | number;
        KEY: string; 
        NAME: string, 
        TAGS: Array<string>
    } | null;
    DESCRIPTION: string;
    STATUS: {
        DATE: string; 
        DONE: Boolean; 
        TEXT: string;
    };
    FILES: Array<IDesignFile> | null;
    PARTNER_FILES: {
        name: string;
        url: string;
    } | null;
}

export interface IDesignFile {
    NAME: string;
    LINK: string;
    KEY: string;
}

/* ******** */

export interface ITypeField {
    label: string
    field: string
    type: string
    settings?: object
}

export interface ICommentGetData {
    ID: string;
    AUTHOR_ID: string;
    AUTHOR_NAME: string;
    AUTHOR_PHOTO: string;
    TEXT: string;
    DATE: string;
    FILES: Array<any>
}

export interface ICommentAddData {
    from_partner: boolean;
    show_to_partner: boolean;
    text: string;
    files: Array<any>;
    dealId: number;
}

export interface dataObject {
    COMPLEX_ID?: string;
    ELEMENT_ID?: string;
    ENTITY_ID?: string;
    ID: string;
    TYPE_ID: string;
    VALUE: string | undefined;
    VALUE_TYPE: string;
    IS_DELETED?: boolean;
}

export interface IInputProps {
    value: Array<dataObject> | Array<any>;
    onChange?: any;
    isEdit?: boolean;
}

export interface IInputPropsDefault {
    attribute?: string;
    attributes?: {[key: string]: any};
    values?: {[key: string]: any};
    value: string | undefined;
    isEdit?: boolean;
    settings?: {[key: string]: any};
    onlyRead?: boolean | undefined;
    onChange: (value: any) => void;
}