//Core
import React, { FC, useEffect, useState } from 'react';
//Style
import './RequestItem.scss'
//View
import { Status } from 'src/view/components/Main/components/ListOfRequests/components/Status/Status';
//Redu
import { useAppDispatch, useAppSelector } from 'src/tools/hooks/redux';
import { getRequestListId, getStatusRequestListItem, inputMessageClose, inputMessageOpen, resetRequestListId } from 'src/ducks/requestList';

interface RequestItemProps {
    requestEl: {
        id: string,
        title: string,
        date: string,
        status: string,
    }
}

export const RequestItem: FC<RequestItemProps> = ({ requestEl }) => {

    const dispatch = useAppDispatch()

    const { requestId } = useAppSelector((state) => state.requestList)
    const [showReply, setShowReply] = useState(false)
    const [requestItemInfo, setRequestItemInfo] = useState(requestEl)

    const replyHandler = (e: any) => {
        e.stopPropagation()
        dispatch(getRequestListId(requestItemInfo.id))
        dispatch(inputMessageOpen())
        setRequestItemInfo((prev: any) => {
            const newState = { ...prev, status: 'inProgress' }
            return newState
        })
        dispatch(getStatusRequestListItem({ title: requestItemInfo.title, status: 'inProgress' }))
        //api request
    }

    const passRequestHandler = (e: any) => {
        e.stopPropagation()
        setRequestItemInfo((prev: any) => {
            const newState = { ...prev, status: 'hold' }
            return newState
        })
        dispatch(resetRequestListId())
        dispatch(getStatusRequestListItem({ title: requestItemInfo.title, status: 'hold' }))
        //api request
    }

    const completedHandler = (e: any) => {
        e.stopPropagation()
        setRequestItemInfo((prev: any) => {
            const newState = { ...prev, status: 'completed' }
            return newState
        })
        dispatch(resetRequestListId())
        dispatch(getStatusRequestListItem({ title: requestItemInfo.title, status: 'completed' }))
        //api request
    }

    const openChatHandler = () => {
        dispatch(getRequestListId(requestItemInfo.id))
        if (requestItemInfo.status === 'inProgress') {
            dispatch(inputMessageOpen())
            console.log('open');

        } else {
            dispatch(inputMessageClose())
            console.log('close');

        }

    }

    return (
        <div
            className={`${showReply && requestItemInfo.status !== 'completed' || (requestItemInfo.id === requestId && requestItemInfo.status !== 'completed') ? 'RequestItem in' : 'RequestItem'}`}
            id={requestItemInfo.id}
            key={requestItemInfo.id}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setShowReply(true)}
            onMouseLeave={() => setShowReply(false)}
            onClick={() => openChatHandler()}
        >
            <div className='RequestItem__content'>
                <div className='RequestItem__content__left'>
                    <div className='title'>Request {requestItemInfo.title}</div>
                    <div className='info'>{requestItemInfo.date}</div>
                </div>
                <div className='RequestItem__content__right'>
                    <Status statusData={requestItemInfo.status} />
                </div>
            </div>
            <div className='RequestItem__control'>
                {
                    requestItemInfo.status === 'inProgress' &&
                    <div className='RequestItem__control__complete'>
                        <button onClick={(e) => passRequestHandler(e)}>Pass Request</button>
                        <button onClick={(e) => completedHandler(e)}>Complete</button>
                    </div>
                }
                {
                    requestItemInfo.status === 'new' &&
                    <button className='RequestItem__control__reply' onClick={(e) => replyHandler(e)}>
                        Reply to the request
                    </button>
                }
                {
                    requestItemInfo.status === 'hold' &&
                    <button className='RequestItem__control__reply' onClick={(e) => replyHandler(e)}>
                        Reply to the request
                    </button>
                }
            </div>
        </div>
    )
}