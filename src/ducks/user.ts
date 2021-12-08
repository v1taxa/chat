//Core
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
interface Credentials {
    username: string;
    password: string;
}
interface UserState {
    credentials: Credentials;
}

const initialState: UserState = {
    credentials: {
        password: '',
        username: '',
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, { payload }: PayloadAction<{ field: keyof Credentials, value: string }>) {
            state.credentials[payload.field] = payload.value;
        },
    },

});

export const {
    setCredentials,
} = userSlice.actions;

export default userSlice.reducer;

