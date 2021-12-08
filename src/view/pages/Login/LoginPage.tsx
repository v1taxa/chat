//Core
import React from 'react';
//Redux
import { loginRequest } from 'src/ducks/auth';
import { setCredentials } from 'src/ducks/user';
import { useAppDispatch, useAppSelector } from 'src/tools/hooks/redux';
//View
import { ErrorBoundary } from 'src/view/components/ErrorBoundary/ErrorBoundary';
import { Button } from 'src/view/components/ui/Button/Button';
import { TextField } from 'src/view/components/ui/TextField/TextField';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { credentials, loading } = useAppSelector((state) => ({
        credentials: state.user.credentials,
        loading: state.auth.loading,
    }));

    const handleChange = (field: keyof typeof credentials) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setCredentials({
                field,
                value: event.target.value,
            }));
        };
    };

    const onLogin = () => {
        dispatch(loginRequest(credentials));
    };

    return (
        <div className='flex flex-col'>
            <TextField
                className='mb-5'
                disabled={loading}
                label='Логин'
                placeholder='Введите ваш логин'
                value={credentials.username}
                onChange={handleChange('username')}
            />
            <TextField
                className='mb-5'
                disabled={loading}
                label='Пароль'
                placeholder='Введите ваш пароль'
                type='password'
                value={credentials.password}
                onChange={handleChange('password')}
            />
            <div className='flex flex-row'>
                <Button
                    className='mr-3 flex-1 whitespace-nowrap'
                    disabled={loading}
                    type='primary'
                    onClick={onLogin}>
                    Войти
                </Button>

            </div>
            <p>log: some, pass: ytrewq321</p>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <LoginPage />
    </ErrorBoundary>
);
