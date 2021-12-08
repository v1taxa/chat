//Core
import React, { FC, useEffect, useState } from 'react';
//Style
import './ChatFeed.scss';
//Tools
import uniqid from 'uniqid';
//Api
import { ListRequestMock } from 'src/api/mock';
//View
import { InputMessage } from 'src/view/components/Main/components/ChatFeed/components/InputMessage/InputMessage';
import { MessageCard } from './components/MessageCard/MessageCard';
//Redux
import { useAppSelector, useAppDispatch } from 'src/tools/hooks/redux';
import { getFilesData, setImagePreviewOpen } from 'src/ducks/chatFeed';
import { log } from 'console';



export const ChatFeed: FC<any> = ({ message, setMessage }) => {
    const dispatch = useAppDispatch()
    const { requestId, inputMessageIsOpen } = useAppSelector((state) => state.requestList)

    const currentMessages = ListRequestMock.find((el) => el.id === requestId)
    const [arrMessages, setArrMessages] = useState<any>(currentMessages?.messages)
    const [drag, setDrag] = useState(false)


    useEffect(() => {
        setArrMessages(currentMessages?.messages)
    }, [currentMessages])

    const dragStartHandler = (e: any) => {
        e.preventDefault()
        if (inputMessageIsOpen) {
            setDrag(true)
        }
    }

    const dragLeaveHandler = (e: any) => {
        e.preventDefault()
        if (inputMessageIsOpen) {
            setDrag(false)
        }

    }

    const dropFiles = (e: any) => {
        e.preventDefault()
        if (inputMessageIsOpen) {
            setDrag(false)
            const fileArray = [...e.dataTransfer.files].map((file: any) => URL.createObjectURL(file))
            const arr = [...fileArray]
            const newState = arr.map((el: string) => {
                return { url: el, id: uniqid() }
            })
            dispatch(getFilesData(newState))
            dispatch(setImagePreviewOpen())
        }

    }

    return (
        <div className='chatfeed'>
            <div className='chatfeed__header'>
                Request {currentMessages && currentMessages.title && currentMessages.title}
            </div>
            <div className='chatfeed__content' >
                {drag ?
                    <div className='chatfeed__content__dragHint'
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onDrop={(e) => dropFiles(e)}
                    >
                        <div className='chatfeed__content__dragHint__content'>
                            <div className='img'></div>
                            <div className='article'>Drop photos or files to send</div>
                        </div>
                    </div> :
                    <div className='chatfeed__content__messages'
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                    >
                        {arrMessages && arrMessages.slice().reverse().map((messageEl: any) => {
                            return <MessageCard messageEl={messageEl} key={messageEl.id} />
                        })}
                    </div>}
            </div>
            {inputMessageIsOpen && <InputMessage message={message} setMessage={setMessage} setArrMessages={setArrMessages} />}
        </div>
    )
}