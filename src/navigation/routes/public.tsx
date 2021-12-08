//Core
import React, { Suspense } from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
//View
import { Login } from 'src/view/pages';
//Navigation
import { Book } from 'src/navigation/Book'

export const PublicRoutes = () => {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <Switch>
                <Route
                    exact
                    path={Book.login}>
                    <Login />
                </Route>
                <Redirect to={Book.login} />
            </Switch>
        </Suspense>
    );
};
