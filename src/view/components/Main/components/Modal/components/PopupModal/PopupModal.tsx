// Core
import React, { FC } from 'react';
//Style
import './PopupModal.scss'

//Redux
import { useAppDispatch } from 'src/tools/hooks/redux';


interface PopupModalProps {
    isOpen: boolean;
    action?: any;
    onClick?: () => void;
}

export const PopupModal: FC<PopupModalProps> = ({ children, action, isOpen, onClick }) => {
    const dispatch = useAppDispatch();
    if (!isOpen) { return null; }


    return (

        <div
            className='popupmodal__wrap'
            onClick={() => {
                if (action) {
                    dispatch(action());
                }
            }}
        >
            <div
                className='popupmodal__wrap__content'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className='popupmodal__wrap__close-button'
                    onClick={() => {
                        if (action) {
                            dispatch(action());
                        }

                        if (onClick) {
                            onClick();
                        }
                    }}
                />
                {children}
            </div>
        </div>

    );
};
