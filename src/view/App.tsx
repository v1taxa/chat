//Core
import React from 'react';
//View
import { PublicLayout } from 'src/view/layout/Public/PublicLayout';
import { PrivateLayout } from './layout/Private/PrivateLayout';
//Nav
import { PublicRoutes } from 'src/navigation/routes/public';
import { PrivateRoutes } from 'src/navigation/routes/private';
//Styles
import 'src/view/styles/index.scss';
import 'tailwindcss/tailwind.css';
//Redux
import { useAppSelector } from 'src/tools/hooks/redux';

export const App: React.FC = () => {

    const { isAuthorized } = useAppSelector((state) => state.auth)

    if (!isAuthorized) {
        return (
            <PublicLayout>
                <PublicRoutes />
            </PublicLayout>
        );
    }

    return (
        <PrivateLayout>
            <PrivateRoutes />
        </PrivateLayout>
    );
};
