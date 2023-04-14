export interface ICustomEvent{
    detail: object
}

declare global{
    interface GlobalEventHandlersEventMap{
        'bx-im-message': CustomEvent<IBxImMessage>
        'bx-im-readMessage': CustomEvent<IBxImReadMessage>
        'bx-im-readMessageChat': CustomEvent<IBxImReadMessageChat>
        'bx-im-readMessageOpponent': CustomEvent<IBxImReadMessageOpponent>
        'bx-im-startWriting': CustomEvent<IBxImStartWriting>
        'bx-im-messageUpdate': CustomEvent<IBxImMessageUpdate>
        'bx-online-userStatus': CustomEvent<IBxOnlineUserStatus>
        'bx-im-messageDelete': CustomEvent<IBxImMessageDelete>
        'bx-im-messageChat': CustomEvent<IBxImMessageChat>
    }
}

export interface IEventBX {
    module_id: string
    command: string
    params: Object
}

/*****/
export interface IBxImReadMessage{
    dialogId: number
    chatId: number
    senderId: number
    id: number
    userId: number
    lastId: string
    counter: number
    muted: false
}
export interface IBxImReadMessageChat{
    dialogId: string
    chatId: number
    lastId: number
    counter: number
    muted: false
    lines: boolean
}

export interface IBxImMessageDelete {
    id:         number;
    type:       string;
    text:       string;
    params:     IBxImMessageDeleteParams;
    fromUserId: number;
    toUserId:   number;
    senderId:   number;
    chatId:     number;
    dialogId:   number;
}

interface IBxImMessageDeleteParams {
    IS_DELETED: string;
    URL_ID:     any[];
    FILE_ID:    any[];
    KEYBOARD:   string;
    ATTACH:     any[];
}


export interface IBxImMessage {
    chatId:        number
    dialogId:      number
    chat:          any[]
    lines:         null
    userInChat:    any[]
    userBlockChat: any[]
    users:         { [key: string]: IBxImMessageUser }
    message:       Message
    files:         any[]
    notify:        boolean
    counter:       number
}
export interface IBxImReadMessageOpponent {
    dialogId:          number
    chatId:            number
    userId:            number
    userName:          string
    lastId:            string
    date:              Date
    chatMessageStatus: string
}
export interface IBxImStartWriting {
    dialogId: number
    userId:   number
    userName: string
}
export interface IBxImMessageUpdate {
    id:           number
    type:         string
    text:         string
    textOriginal: string
    fromUserId:   number
    toUserId:     number
    senderId:     number
    chatId:       number
    params:       IBxImMessageUpdateParams
    dialogId:     number
}

interface IBxImMessageUpdateParams {
    IS_EDITED: string;
    URL_ID:    any[]
    ATTACH:    any[]
    DATE_TEXT: any[]
    DATE_TS:   any[]
}

export interface IBxOnlineUserStatus {
    users: { [key: number]: IBxOnlineUserStatusUser  }
}
export interface IBxOnlineUserStatusUser {
    id:                 number
    status:             string
    color:              string
    idle:               boolean
    mobile_last_date:   Date
    desktop_last_date:  Date
    last_activity_date: Date
}

/*****/

interface Message {
    id:             number
    templateId:     string
    templateFileId: string
    prevId:         number
    chatId:         number
    senderId:       number
    recipientId:    number
    system:         string
    date:           string
    text:           string
    textOriginal:   string
    params:         any[]
    counter:        number
}

interface IBxImMessageUser {
    id:                 string
    name:               string
    active:             boolean
    first_name:         string
    last_name:          string
    work_position:      string
    color:              string
    avatar:             string
    avatar_id:          string
    birthday:           boolean | string
    gender:             string
    phone_device:       boolean
    phones:             boolean | PhonesClass
    extranet:           boolean
    tz_offset:          number
    network:            boolean
    bot:                boolean
    connector:          boolean
    profile:            string
    external_auth_id:   string
    status:             string
    idle:               boolean
    last_activity_date: boolean | Date
    mobile_last_date:   boolean | Date
    desktop_last_date:  null
    departments:        number[]
    absent:             boolean
    services:           null
}

interface PhonesClass {
    personal_mobile: string
}

/************/

export interface IBxImMessageChat {
    chatId:        number;
    dialogId:      string;
    chat:          { [key: string]: Chat };
    lines:         null;
    userInChat:    number[];
    userBlockChat: { [key: string]: boolean };
    users:         { [key: string]: Users };
    message:       Message;
    files:         any[];
    notify:        boolean;
    counter:       number;
}

export interface Chat {
    id:            string;
    name:          string;
    owner:         string;
    color:         string;
    extranet:      boolean;
    avatar:        string;
    call:          string;
    call_number:   string;
    entity_type:   string;
    entity_id:     string;
    entity_data_1: string;
    entity_data_2: string;
    entity_data_3: string;
    public:        string;
    mute_list:     { [key: string]: boolean };
    manager_list:  number[];
    date_create:   Date;
    type:          string;
    message_type:  string;
}


export interface Users {
    id:                 string;
    name:               string;
    active:             boolean;
    first_name:         string;
    last_name:          string;
    work_position:      string;
    color:              string;
    avatar:             string;
    avatar_id:          string;
    birthday:           string;
    gender:             string;
    phone_device:       boolean;
    phones:             Phones;
    extranet:           boolean;
    tz_offset:          number;
    network:            boolean;
    bot:                boolean;
    connector:          boolean;
    profile:            string;
    external_auth_id:   string;
    status:             string;
    idle:               boolean;
    last_activity_date: Date;
    mobile_last_date:   Date;
    desktop_last_date:  null;
    departments:        number[];
    absent:             boolean;
    services:           null;
}

export interface Phones {
    personal_mobile: string;
}