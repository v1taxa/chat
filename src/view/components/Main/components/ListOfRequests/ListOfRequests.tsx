//Core
import React, { FC } from 'react';
//Style
import './ListOfRequests.scss'
//View
import { RequestItem } from './components/RequestItem/RequestItem';
//Api
import { ListRequestMock } from 'src/api/mock';

export const ListOfRequests: FC = () => {
    return (
        <div className='list'>
            <div className='list__head'>
                List of requests
            </div>
            <div className='list__content'>
                <div className='list__content__feed'>
                    {ListRequestMock.slice().reverse().map((requestEl) => {
                        return (
                            <RequestItem requestEl={requestEl} key={requestEl.id} />

                        )
                    })}
                </div>
            </div>
        </div>
    )
}