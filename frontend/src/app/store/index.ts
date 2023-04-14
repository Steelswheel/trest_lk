import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "./appApi";
import { setupListeners } from "@reduxjs/toolkit/query"
import { userReducer } from "./user.slice";
import { newsReducer } from "./news.slice";
import FormSlice from "./formSlice";


export const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        user: userReducer,
        form: FormSlice,
        news: newsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(appApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;