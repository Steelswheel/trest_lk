import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_GET} from "../../API";
import {IBxImReadMessageOpponent} from "../interface/IWS";
import {useDispatch, useSelector} from "react-redux";
import {store} from "./index";
import {forEach} from "react-bootstrap/ElementChildren";
export interface IUserModel{
    api_token: string
    email: string
    first_name: string
    id: number
    last_name: string
    img: string | false
    ws: string
    unreadMessages: IUnreadMessages[]
}

export const fetchUnreadMessages = createAsyncThunk<IUnreadMessages[] | undefined>(
    'user/fetchUnreadMessages',
    async () => {
        return await API_GET<IUnreadMessages[]>('chat/unreadMessages')
    }
)

const readMessageOpponent = (e: CustomEvent<IBxImReadMessageOpponent>) => {
    console.log(e.detail);
}

export interface IUnreadMessages{
    messageId: number
    chatId: number
    isPrivat: boolean
}

const initialState: IUserModel = {
    api_token: '',
    email: '',
    first_name: '',
    id: 0,
    last_name: '',
    img: false,
    ws: '',
    unreadMessages: [],
}

export const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setImg(state, action: PayloadAction<string>){
            state.img = action.payload
        },
        initChat(state){
            console.log('initChat STORE');
        },
        setUnreadMessages(state, action: PayloadAction<IUnreadMessages[]>){
            state.unreadMessages = action.payload
        },
        chatReadMessage(state, action: PayloadAction<IUnreadMessages>){
            const {chatId, messageId, isPrivat} = action.payload
            const m = state.unreadMessages.filter(i => {
                if(i.chatId !== chatId && i.isPrivat !== isPrivat) return true
                return i.messageId > messageId
            })
            state.unreadMessages = [...m]
        },
        chatAddMessage(state, action: PayloadAction<IUnreadMessages>){
            state.unreadMessages.push(action.payload)
        },
        setUser(state, action: PayloadAction<IUserModel>){
            state.api_token = action.payload.api_token
            state.email = action.payload.email
            state.first_name = action.payload.first_name
            state.id = action.payload.id
            state.last_name = action.payload.last_name
            state.img = action.payload.img
            state.unreadMessages = action.payload.unreadMessages
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUnreadMessages.fulfilled, (state: IUserModel, {payload}) => {
            console.log('START fetchUnreadMessages',payload);
            if(payload){
                console.log(payload);
                state.unreadMessages = payload
            }
        });
    }
})

export const userActions = userState.actions
export const userReducer = userState.reducer