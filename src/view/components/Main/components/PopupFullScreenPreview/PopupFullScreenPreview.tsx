// Core
import React, { FC } from 'react';
//Style
import './PopupFullScreenPreview.scss'
//Redux
import { useAppDispatch } from 'src/tools/hooks/redux';

interface PopupFullScreenPreviewProps {
    isOpen: boolean;
    action?: any;
    onClick?: () => void;
}

export const PopupFullScreenPreview: FC<PopupFullScreenPreviewProps> = ({ children, action, isOpen, onClick }) => {
    const dispatch = useAppDispatch();
    if (!isOpen) { return null; }


    return (

        <div
            className='popupfullscreen__wrap'
        >
            <button
                className='popupfullscreen__wrap__close-button'
                onClick={() => {
                    if (action) {
                        dispatch(action());
                    }

                    if (onClick) {
                        onClick();
                    }
                }}
            />
            <div
                className='popupfullscreen__wrap__content'
                onClick={(e) => e.stopPropagation()}
            >

                {children}
            </div>
        </div>

    );
};
