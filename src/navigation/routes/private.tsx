//Core
import React, { Suspense } from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
//View
import { Home } from 'src/view/pages';
//Navigation
import { Book } from 'src/navigation/Book';
export const PrivateRoutes = () => {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <Switch>
                <Route
                    exact
                    path={Book.home}>
                    <Home />
                </Route>
                <Redirect to={Book.home} />
            </Switch>
        </Suspense>
    );
};
