//Core
import React from 'react';
import { render } from 'react-dom';
//Navigation
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from 'src/navigation/history'
//Redux
import { Provider as ReduxProvider } from 'react-redux';
import {
    reduxStore,
    reduxPersistor,
} from 'src/redux/store';
//View
import { App } from './view/App';

const Root = () => {

    return (
        <ReduxProvider store={reduxStore}>
            <PersistGate
                loading={null}
                persistor={reduxPersistor}>
                <Router history={history}>
                    <App />
                </Router>
            </PersistGate>
        </ReduxProvider>
    );
};

render(<Root />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
