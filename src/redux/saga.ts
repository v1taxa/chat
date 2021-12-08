//Core
import { all } from 'redux-saga/effects';
//Sagas
import { authSaga } from 'src/ducks/auth';


const rootSaga = function* () {
    yield all([authSaga()]);
};

export default rootSaga;
