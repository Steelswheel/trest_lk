import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import * as authHelper from "../modules/auth/core/AuthHelpers";
import {
    IServerTableResponse, 
    ITableSizeGetQuerySettings, 
    ITableSizePostQuerySettings,
    IGridFilterRow, IGridEdzRow, 
    IGridEdsRow, 
    IGridDesignRow,
    ICommentGetData,
    ICommentAddData
} from './../interface/Interface';

const API_URL = process.env.REACT_APP_API_URL+"/api/";

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = authHelper.getAuth();
            if(token){
                headers.set('Authorization', token.api_token)
            }
            return headers
        },

    }),
    refetchOnFocus: false,
    endpoints: build => ({
        edzList: build.query<IServerTableResponse<IGridEdzRow>, ITableSizeGetQuerySettings>({
            query: ({page = 1, pageSize = 10, jsonFilter = ''}) => {

                return {
                    url: 'edz/list',
                    params: {
                        p: page,
                        s: pageSize,
                        f: jsonFilter
                    }
                }
            }
        }),
        edzFilter: build.query<Array<IGridFilterRow>, null>({
            query: () => {
                return {
                    url: 'edz/filter'
                }
            }
        }),
        edzFields: build.query<{borrower: {[key: string]: any}, zalog: {[key: string]: any}}, void>({
            query: () => {
                return {
                    url: 'edz/fields'
                }
            }
        }),
        edsList: build.query<IServerTableResponse<IGridEdsRow>, ITableSizeGetQuerySettings>({
            query: ({page = 1, pageSize = 10, jsonFilter = ''}) => {
            return {
                    url: 'eds/list',
                    params: {
                        p: page,
                        s: pageSize,
                        f: jsonFilter
                    }
                }
            }
        }),
        edsFilter: build.query<Array<IGridFilterRow>, null>({
            query: () => {
                return {
                    url: 'eds/filter'
                }
            }
        }),
        designList: build.query<IServerTableResponse<IGridDesignRow>, ITableSizeGetQuerySettings>({
            query: ({page = 1, pageSize = 10, jsonFilter = ''}) => {
                return {
                    url: 'design/list',
                    params: {
                        p: page,
                        s: pageSize,
                        f: jsonFilter
                    }
                }
            }
        }),
        designFilter: build.query<Array<IGridFilterRow>, null>({
            query: () => {
                return {
                    url: 'design/filter'
                }
            }
        }),
        designAddNewTask: build.query<Boolean, Object>({
            query: (obj) => {
                return {
                    method: 'post',
                    url: 'design/add_new_task',
                    body: {
                        data: obj
                    }
                }
            }
        }),
        filterSetSavedData: build.query<void, ITableSizePostQuerySettings>({
            query: ({type, page = 1, pageSize = 10, jsonFilter = []}) => {
                return {
                    method: 'post',
                    url: 'filter/set_data',
                    body: {
                        type: type,
                        p: page,
                        s: pageSize,
                        f: jsonFilter
                    }
                }
            }
        }),
        filterGetSavedData: build.query<ITableSizeGetQuerySettings, string>({
            query: (type) => {
                return {
                    url: 'filter/get_data',
                    params: {type}
                }
            }
        }),
        edzTest: build.query({
            query: (arg) => {
                return {
                    url: 'edz/test',
                    params: arg
                }
            }
        }),
        getComments: build.query<Array<ICommentGetData>, number>({
            query: (dealId) => {
                return {
                    method: 'get',
                    url: 'comments/get',
                    params: {dealId}
                }
            }
        }),
        addComment: build.query<boolean, ICommentAddData>({
            query: (data) => {
                return {
                    method: 'post',
                    url: 'comments/add',
                    body: data,
                }
            }
        }),
        uploadPdf: build.query({
            query: (data) => {
                return {
                    method: 'post',
                    url: 'upload_pdf',
                    body: data,
                }
            }
        }),
        passportApi: build.query({
            query: (data) => {
                return {
                    method: 'post',
                    url: 'passport',
                    body: data,
                }
            }
        }),
        createDoc: build.query({
            query: (data) => {
                return {
                    method: 'post',
                    url: 'create_doc',
                    body: data,
                }
            }
        }),
        getDashboardData: build.query({
            query: () => {
                return {
                    method: 'post',
                    url: 'get_dashboard_data'
                }
            }
        }),
        getKpkDocuments: build.query({
            query: () => {
                return {
                    method: 'post',
                    url: 'get_kpk_documents',
                }
            }
        }),
        getNews: build.query({
            query: (data) => {
                return {
                    method: 'post',
                    url: 'get_news',
                    body: data,
                }
            }
        }),
        getSchedule: build.query({
            query: (data) => {
                return {
                    method: 'post',
                    url: 'get_schedule',
                    body: data,
                }
            }
        })
    })
})

export const {
    useEdzListQuery,
    useEdzFilterQuery,
    useEdzFieldsQuery,
    useEdsListQuery,
    useEdsFilterQuery,
    useDesignListQuery,
    useDesignFilterQuery,
    useLazyDesignAddNewTaskQuery,
    useLazyFilterSetSavedDataQuery,
    useFilterGetSavedDataQuery,
    useEdzTestQuery,
    useGetCommentsQuery,
    useLazyAddCommentQuery,
    useLazyUploadPdfQuery,
    useLazyPassportApiQuery,
    useLazyCreateDocQuery,
    useGetDashboardDataQuery,
    useGetKpkDocumentsQuery,
    useGetNewsQuery,
    useLazyGetNewsQuery,
    useGetScheduleQuery
} = appApi;