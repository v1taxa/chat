//Core
import React, { FC } from 'react';
//Style
import './StatusModal.scss'

export const StatusModal: FC<{ title: string, status: string }> = ({ title, status }) => {


    const statusHandler = (status: string) => {
        switch (status) {
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
        <div className='statusModal'>
            <div className='content'>{`Request ${title} ${status === 'completed' ? 'processed and completed successfully' : `new status ${statusHandler(status)}`}`}</div>
            <div className='checkbox' style={{ display: status === 'completed' ? 'block' : 'none' }}></div>
        </div>
    )
}