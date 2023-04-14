import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual } from 'lodash'
import { RootState } from './index';
import { API_GET, API_POST } from '../../API';

interface IValues {
    [key: string]: any
}

interface myDataAtr{
    attributes: object
    templateRequest: {[key: string]: any}
}

export const fetchAttributes = createAsyncThunk<myDataAtr, any>(
    'form/attributes',
    async ([type, id]) => {
        return await API_GET<myDataAtr>(`edz/attributes?type=${type}&id=${id}`);
    }
)

interface IFetchEntity{
    attributes: object,
    values: object | undefined
}

export const fetchEntity = createAsyncThunk<IFetchEntity, number | undefined>(
    'form/fetchEntity',
    async (id: number | undefined) => {
        return await API_GET<IFetchEntity>(`/edz/view/${id}`);
    }
)

interface IFetchSave{
    attributes: object, values: object | undefined
}

export const fetchSave = createAsyncThunk<IFetchSave, number | undefined>(
    'form/fetchSave',
    async (id: number | undefined, {getState, rejectWithValue}) => {
        const action = id
            ? 'update/' + id
            : 'create';

        const form = getState() as RootState;
        const values = form.form.values;
        const valuesFirst = form.form.valuesFirst;
        const valuesUpdate: IValues = {};

        for (let item in values ) {
            if(values.hasOwnProperty(item) && !isEqual(values[item],valuesFirst[item])){
                valuesUpdate[item] = values[item]
            }
        }

        try {
            return await API_POST<IFetchSave>(`/edz/${action}`, {
                values: valuesUpdate,
            })
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export type FormState = {
    isLoading: boolean,
    isUpdate: boolean,
    error: null,
    template: object,
    attributes: object,
    templateRequest: {[key: string]: any},
    values: IValues,
    valuesFirst: IValues,
}

const initialState: FormState = {
    isLoading: true,
    isUpdate: false,
    error: null,
    template: {},
    attributes: {},
    templateRequest: {},
    values: {},
    valuesFirst: {},
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm(state, action: PayloadAction<{attribute: string, value: any}>) {
            // @ts-ignore
            state.values[action.payload.attribute] = action.payload.value;
        },
        setFormValues(state, action: PayloadAction<{values: IValues}>) {
            state.values = action.payload.values;
        },
        setAttribute(state,action: PayloadAction) {
            console.log(action);
            //state.attributes = action
            //state.error = null
        },
        setValueNull(state) {
            let item: string;

            for(item in state.attributes) {
                // @ts-ignore
                state.values[item] = '';
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEntity.pending, (state: FormState, {payload}) => {
            state.isLoading = true
        });

        builder.addCase(fetchEntity.fulfilled, (state: FormState, {payload}) => {
            state.attributes = payload.attributes;
            state.isLoading = false;

            if (payload.values) {
                state.values = payload.values;
            }

            state.valuesFirst = state.values
        });

        builder.addCase(fetchSave.pending, (state: FormState, {payload}) => {
            state.isUpdate = true
            // console.log('pending');
        });

        builder.addCase(fetchSave.rejected, (state: FormState, {payload}) => {
            state.isUpdate = false;
            console.log(payload, 'ERROR splice');
        });

        builder.addCase(fetchSave.fulfilled, (state: FormState, {payload}) => {
            state.isUpdate = false;
        });

        builder.addCase(fetchAttributes.pending, (state: FormState, {payload}) => {
            state.isUpdate = true;
        });

        builder.addCase(fetchAttributes.fulfilled, (state: FormState, {payload}) => {
            state.attributes = payload.attributes;
            state.templateRequest = payload.templateRequest;
            state.isLoading = false;
            state.isUpdate = false;
        });
    }
});

export default formSlice.reducer;
export const {setForm, setFormValues, setAttribute, setValueNull} = formSlice.actions;