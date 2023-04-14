import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_GET, API_POST } from '../../API';

interface IPageSettings {
    page: number,
    pageSize: number
}

interface NewsDetailState extends IPageSettings {
    isLoading: boolean,
    error: null,
    newsItemData: {[key: string]: any} | false
}

const initialState: NewsDetailState = {
    page: 1,
    pageSize: 10,
    isLoading: true,
    error: null,
    newsItemData: false
}

export const fetchItem = createAsyncThunk<NewsDetailState, number | undefined>(
    'news/fetchItem',
    async (id: number | undefined) => {
        return await API_GET<NewsDetailState>(`/news/${id}`);
    }
)

export const fetchGetPageSettings = createAsyncThunk<IPageSettings>(
    'news/fetchPageSettings',
    async () => {
        return await API_POST<IPageSettings>('/get_news_page_settings');
    }
)

export const fetchSetPageSettings = createAsyncThunk<IPageSettings, IPageSettings>(
    'news/fetchPageSettings',
    async (settings) => {
        return await API_POST<IPageSettings>('/set_news_page_settings', settings);
    }
)

export const newsState = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNewsDetail(state, action: PayloadAction<NewsDetailState>) {
            state.newsItemData = action.payload.newsItemData;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetPageSettings.pending, (state: NewsDetailState, {payload}) => {
            state.isLoading = true
        });

        builder.addCase(fetchGetPageSettings.fulfilled, (state: NewsDetailState, {payload}) => {
            state.isLoading = false;

            state.page = payload.page;
            state.pageSize = payload.pageSize;
        });

        builder.addCase(fetchItem.pending, (state: NewsDetailState, {payload}) => {
            state.isLoading = true
        });

        builder.addCase(fetchItem.fulfilled, (state: NewsDetailState, {payload}) => {
            state.isLoading = false;

            if (payload.newsItemData) {
                state.newsItemData = payload.newsItemData;
            }
        });
    }
})

export const newsActions = newsState.actions;
export const newsReducer = newsState.reducer;