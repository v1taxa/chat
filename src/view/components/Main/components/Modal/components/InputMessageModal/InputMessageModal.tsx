//Core
import React, { FC, useEffect, useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';
//Tools
import uniqid from 'uniqid'
import { format } from 'date-fns'
//Style
import './InputMessageModal.scss'
//Redux
import { useAppDispatch } from 'src/tools/hooks/redux';
import { setImagePreviewOpen } from 'src/ducks/chatFeed';

interface InputMessageProps {
    message: string,
    setMessage: (e: string) => void
    // setArrMessages: (e: any) => void
}

export const InputMessageModal: FC<InputMessageProps> = ({ message, setMessage }) => {
    const dispatch = useAppDispatch()
    const messageHandler = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault()
        }

        if (e.keyCode === 13 && e.ctrlKey === true && message !== '') {
            setMessage(message + '\n')
        }
        if (e.keyCode === 13 && e.ctrlKey === false) {
            sentHandler()
        }
    }

    const sentHandler = () => {
        //api request
    }

    return (
        <div className='inputMessageModal__wrap'>
            <div className='inputMessageModal'>
                <TextareaAutosize
                    maxRows={5}
                    placeholder='Type your message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        messageHandler(e)
                    }}
                />
            </div>
            <div className='inputMessageModal__sent' onClick={() => sentHandler()}></div>
        </div>
    )
}