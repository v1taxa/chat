//Core
import React, { FC } from 'react';
//Style
import './MessageCard.scss'

interface MessageCardProps {
    messageEl: {
        id: string,
        author: string,
        message: string,
        date: string,
        token: boolean,
    }
}

export const MessageCard: FC<MessageCardProps> = ({ messageEl }) => {
    return (
        <div className='messagecard__wrap' id={messageEl.id} style={{ justifyContent: messageEl.token ? 'flex-end' : 'flex-start' }}>
            <div className='messagecard' style={{ justifyContent: messageEl.token ? 'flex-end' : 'flex-start' }}>
                <div className='messagecard__avatar' style={{ display: messageEl.token ? 'none' : 'flex' }}>
                    <div className='messagecard__avatar__icon'>{messageEl.author.charAt(0)}</div>
                </div>
                <div className='messagecard__body'>
                    <div className='messagecard__body__author' style={{ display: messageEl.token ? 'none' : 'flex' }}>
                        {messageEl.author}
                    </div>
                    <div className='messagecard__body__message'
                        style={{
                            background: messageEl.token ? '#652FFD' : '#F5F5F5',
                            borderRadius: messageEl.token ? '15px 15px 0px 15px' : '0px 15px 15px 15px',
                            color: messageEl.token ? '#fff' : '#000',
                            alignSelf: messageEl.token ? 'self-end' : 'self-start'
                        }}>
                        {messageEl.message}
                    </div>
                    <div className='messagecard__body__date' style={{ justifyContent: messageEl.token ? 'flex-end' : 'flex-start' }}>
                        {messageEl.date}
                    </div>
                </div>
            </div>
        </div>
    )
}