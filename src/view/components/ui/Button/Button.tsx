//Core
import React from 'react';
//Navigation
import { Link } from 'react-router-dom';
//Tools
import classNames from 'classnames';
//Styles
import './Button.scss';

export type ButtonType = 'primary' | 'default';

export interface ButtonProps {
    type?: ButtonType;
    uppercase?: boolean;
    to?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    type = 'default',
    children,
    className,
    uppercase = true,
    to,
    disabled,
    onClick,
}) => {
    const buttonClassNames = classNames(
        'button',
        {
            'button--link': Boolean(to),
            'button--primary': type === 'primary',
            'button--default': type === 'default',
            'button--disabled': disabled,
            uppercase,
        },
        className,
    );

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    if (to && !disabled) {
        return (
            <Link
                className={buttonClassNames}
                to={to}
                onClick={handleClick}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={buttonClassNames}
            type='button'
            onClick={handleClick}>
            {children}
        </button>
    );
};
