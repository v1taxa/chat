//Core
import React from 'react';
//View
import { ErrorBoundary } from 'src/view/components/ErrorBoundary/ErrorBoundary';
import { Main } from 'src/view/components/Main/Main';
//Redux
import { logout } from 'src/ducks/auth';
import { useAppDispatch, useAppSelector } from 'src/tools/hooks/redux';

export const HomePage: React.FC = () => {
    return (
        <Main />
    );
};

export default () => (
    <ErrorBoundary>
        <HomePage />
    </ErrorBoundary>
);
