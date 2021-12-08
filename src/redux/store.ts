import {
    AnyAction,
    Middleware,
} from 'redux';
import {
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './reducer';
import rootSaga from './saga';

const isDev = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

if (isDev) {
    middlewares.push(
        createLogger({
            duration: true,
            collapsed: true,
            colors: {
                title: () => '#139BFE',
                prevState: () => '#1C5FAF',
                action: () => '#149945',
                nextState: () => '#A47104',
                error: () => '#ff0005',
            },
        }),
    );
}

export const reduxStore = configureStore({
    reducer: rootReducer,
    devTools: isDev,
    middleware: middlewares,
});

export const reduxPersistor = persistStore(reduxStore);

sagaMiddleware.run(rootSaga);


export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
