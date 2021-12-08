//Core
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

const initialState = {  //initial state
    requestId: '',
    status: {
        title: '',
        status: '',
    },
    inputMessageIsOpen: false
}



export const requestListSlice = createSlice({
    name: 'requestList',
    initialState,
    reducers: {
        getRequestListId: (state, action: PayloadAction<string>) => {
            state.requestId = action.payload
        },
        resetRequestListId: (state) => {
            state.requestId = ''
        },
        getStatusRequestListItem: (state, action: PayloadAction<{ title: string, status: string }>) => {
            state.status = action.payload
        },
        resetStatusRequestListItem: (state) => {
            state.status = initialState.status
        },
        inputMessageOpen: (state) => {
            state.inputMessageIsOpen = true
        },
        inputMessageClose: (state) => {
            state.inputMessageIsOpen = false
        }
    }
})

export const {
    getRequestListId,
    resetRequestListId,
    getStatusRequestListItem,
    resetStatusRequestListItem,
    inputMessageClose,
    inputMessageOpen } = requestListSlice.actions;

export default requestListSlice.reducer