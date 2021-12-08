//Core
import React, { FC } from 'react';
//Style
import './Hint.scss'

export const Hint: FC = () => {
    return (
        <div className='hint'>
            <div className='hint__head'>
                Select a request from the list to get started
            </div>
            <div className='hint__content'>
                Now there are 2 new requests on the list that are awaiting of your consideration
            </div>
        </div>
    )
}