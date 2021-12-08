//Core
import React, { FC, useState, useEffect } from 'react'
//Style
import './Modal.scss'
//View
import { InputMessageModal } from './components/InputMessageModal/InputMessageModal';
//Redux
import { useAppSelector, useAppDispatch } from 'src/tools/hooks/redux';
import { getPreviewImageUrl, setImageFullScreenOpen, setImagePreviewClose } from 'src/ducks/chatFeed';


export const Modal: FC = () => {
    const dispatch = useAppDispatch()

    const { filesData, } = useAppSelector((state) => state.chatFeed)

    const [data, setData] = useState(filesData)

    const imgDel = (id: string) => {
        setData((prev) => {
            const newState = [...prev]
            return newState.filter((el) => el.id !== id)
        });
    }

    const viewImgePreview = (url: string) => {
        dispatch(getPreviewImageUrl(url))
        // dispatch(setImagePreviewClose())
        dispatch(setImageFullScreenOpen())
    }

    const renderPhotos = (source: any) => {
        return source.map((photo: any) => {

            return (
                <div
                    className='modal__content__item'
                    onClick={(e) => { viewImgePreview(photo.url) }}
                    style={{ backgroundImage: `url(${photo.url})` }}
                    id={photo.id}
                    key={photo.id}
                >

                    <div className='modal__content__item__close' onClick={(e) => { e.stopPropagation(); imgDel(photo.id) }} ></div>
                </div>
            )
        })
    }

    useEffect(() => {
        if (data.length === 0) {
            dispatch(setImagePreviewClose())
        }

    }, [data])

    const [message, setMessage] = useState('')

    return (
        <div className='modal'>
            <div className='modal__head'>
                <h2>Send photos &amp; files</h2>
            </div>
            <div className='modal__content'>
                {renderPhotos(data)}
            </div>
            <div className='modal__footer'>
                <InputMessageModal message={message} setMessage={setMessage} />
            </div>
        </div>
    )
}