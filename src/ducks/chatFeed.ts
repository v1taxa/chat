//Core
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

const initialState = {
    imagePreviewIsOpen: false,
    imageFullScreenIsOpen: false,
    filesData: [{
        id: '',
        url: '',
    }],
    previewImageUrl: '',
}

interface FilesDataProps {
    url: string,
    id: string,
}


export const chatFeedSlice = createSlice({
    name: 'chatFeed',
    initialState,
    reducers: {
        setImagePreviewOpen: (state) => {
            state.imagePreviewIsOpen = true
        },
        setImagePreviewClose: (state) => {
            state.imagePreviewIsOpen = false
        },
        setImageFullScreenOpen: (state) => {
            state.imageFullScreenIsOpen = true
        },
        setImageFullScreenClose: (state) => {
            state.imageFullScreenIsOpen = false
        },
        getFilesData: (state, action: PayloadAction<FilesDataProps[]>) => {

            state.filesData = action.payload
        },
        clearFileData: (state) => {
            state.filesData = initialState.filesData
        },
        getPreviewImageUrl: (state, action: PayloadAction<string>) => {
            state.previewImageUrl = action.payload
        },
        clearPreviewImageUrl: (state) => {
            state.previewImageUrl = ''
        }
    }
})

export const {
    setImagePreviewClose,
    setImagePreviewOpen,
    getFilesData,
    clearFileData,
    setImageFullScreenClose,
    setImageFullScreenOpen,
    getPreviewImageUrl,
    clearPreviewImageUrl } = chatFeedSlice.actions

export default chatFeedSlice.reducer