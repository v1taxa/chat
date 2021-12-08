//Core
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
//Tools
import { takeLatest } from 'redux-saga/effects';
//Saga
import {
    call,
    put,
} from 'redux-saga/effects';
//Api
import { login } from 'src/api/auth.api';
interface Credentials {
    username: string;
    password: string;
}


interface AuthState {
    refreshToken: string | null;
    accessToken: string | null;
    loading: boolean,
    isAuthorized: boolean
}

interface LoginPayload {
    refresh: string;
    access: string;
}

const initialState: AuthState = {
    refreshToken: null,
    accessToken: null,
    loading: false,
    isAuthorized: false
};

type AuthReducerType<PayloadType> = (
    state: AuthState,
    action: PayloadAction<PayloadType>
) => void;

const loginRequestReducer: AuthReducerType<Credentials> = (state) => {
    state.loading = true;
};
const loginErrorReducer: AuthReducerType<Credentials> = (state) => {
    state.loading = false;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.refreshToken = null;
            state.accessToken = null;
            state.isAuthorized = false
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("authToken")
        },
        loginRequest: loginRequestReducer,
        loginError: loginErrorReducer,
        loginSuccess: (state, { payload }: PayloadAction<LoginPayload>) => {
            if (payload.access) {
                state.loading = false;
                state.refreshToken = payload.refresh;
                state.accessToken = payload.access;
                state.isAuthorized = true
            } else {
                state.loading = false
            }
        },
    },
});

export const { logout, loginRequest, loginSuccess } = authSlice.actions;

export default authSlice.reducer;


// === Sagas ===
export function* handleLogin({ payload }: PayloadAction<Credentials>) {
    try {
        const response: { access: string; refresh: string; } = yield call(() => login(payload));
        localStorage.setItem("authToken", response.access)
        localStorage.setItem("refreshToken", response.refresh)
        yield put(loginSuccess(response));
    } catch (error) {
        console.error(error);
    }
}



export const authSaga = function* () {
    yield takeLatest(loginRequest.type, handleLogin);
};
