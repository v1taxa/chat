//Core
import React from 'react';
//Tools
import classNames from 'classnames';
//Style
import './TextField.scss';

type TextFieldOrientation = 'vertical' | 'horizontal';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    orientation?: TextFieldOrientation;
}

export const TextField: React.FC<TextFieldProps> = ({
    label,
    orientation = 'vertical',
    className,
    disabled,
    onChange,
    ...otherProps
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
            onChange(event);
        }
    };

    return (
        <div className={classNames(
            'text-field__wrapper',
            orientation === 'vertical'
                ? 'text-field__wrapper--vertical'
                : 'text-field__wrapper--horizontal',
            className,
        )}>
            {label && (
                <label className='text-field__label'>{label}</label>
            )}
            <input
                {...otherProps}
                className={classNames(
                    'text-field',
                    { 'text-field--disabled': disabled },
                )}
                disabled={disabled}
                onChange={handleChange}
            />
        </div>
    );
};
