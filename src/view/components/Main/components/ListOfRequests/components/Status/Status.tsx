//Core
import React, { FC } from 'react';
//Style
import './Status.scss'

interface StatusProps {
    statusData: string
}

export const Status: FC<StatusProps> = ({ statusData }) => {

    const statusHandler = (statusData: string) => {
        switch (statusData) {
            case 'new':
                return 'New';
            case 'inProgress':
                return 'In progress';
            case 'completed':
                return 'Completed';
            case 'hold':
                return 'Hold'
            default: return null
        }
    }

    return (
        <div className={`status status__${statusData}`} >
            {statusHandler(statusData)}
        </div>
    )
}