//Core
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//Tools
import localforage from 'localforage';
//Ducks
import authReducer from 'src/ducks/auth';
import userReducer from 'src/ducks/user';
import requestListReducer from 'src/ducks/requestList'
import chatFeedReducer from 'src/ducks/chatFeed'

const authPersistConfig = {
    storage: localforage,
    key: 'auth',
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    requestList: requestListReducer,
    chatFeed: chatFeedReducer,
});

export default persistReducer(authPersistConfig, rootReducer);
