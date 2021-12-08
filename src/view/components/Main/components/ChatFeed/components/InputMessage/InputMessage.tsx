//Core
import React, { FC, useEffect, useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';
//Tools
import uniqid from 'uniqid'
import { format } from 'date-fns'
//Style
import './InputMessage.scss'
//Redux
import { useAppDispatch } from 'src/tools/hooks/redux';
import { getFilesData, setImagePreviewOpen } from 'src/ducks/chatFeed';

interface InputMessageProps {
    message: string,
    setMessage: (e: string) => void
    setArrMessages: (e: any) => void
}

export const InputMessage: FC<InputMessageProps> = ({ message, setMessage, setArrMessages }) => {
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
        if (message !== '') {
            setMessage('')
            setArrMessages((prev: any) => {
                const newState = [...prev]
                newState.push({
                    id: uniqid(),
                    token: true,
                    message: message,
                    date: format(new Date(), 'MMMMMM dd, hh:mm'),
                    author: 'Me',
                })
                return newState
            })
        }
    }



    const [selectedImages, setSelectedImages] = useState<any>([])

    const sendFileHandler = (e: any) => {
        if (e.target.files) {
            const fileArray = [...e.target.files].map((file: any) => URL.createObjectURL(file))
            const arr = [...fileArray]
            const newState = arr.map((el: string) => {

                return { url: el, id: uniqid() }
            })
            setSelectedImages(newState)
        }

    }

    useEffect(() => {
        if (selectedImages[0] !== undefined) {
            dispatch(getFilesData(selectedImages))
            dispatch(setImagePreviewOpen())

        }
    }, [selectedImages])

    return (
        <div className='inputMessage__wrap'>
            <div className='inputMessage'>
                <TextareaAutosize
                    maxRows={15}
                    placeholder='Type your message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        messageHandler(e)
                    }}
                />
                <label className='inputMessage__add'>
                    <input type="file" accept='image/*' multiple onChange={(e) => sendFileHandler(e)} />
                </label>
            </div>
            <div className='inputMessage__sent' onClick={() => sentHandler()}></div>
        </div>
    )
}