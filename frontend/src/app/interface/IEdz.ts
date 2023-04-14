import {ITypeField} from "./Interface";

type myNumber = number | ''

export interface IEdzAttribute {
    LAST_NAME: ITypeField
    NAME: ITypeField
    SECOND_NAME: ITypeField
    AGE: ITypeField
}

export interface IEdzBase {
    LAST_NAME: string
    NAME: string
    SECOND_NAME: string
    AGE: myNumber
}

export const initialStateEdz: IEdzBase = {
    LAST_NAME: '',
    NAME: '',
    SECOND_NAME: '',
    AGE: '',
}