//Core
import React, { FC, useState, useEffect } from 'react';
//Style
import './Main.scss'
//View
import logo from 'src/assets/images/svg/logo.svg'
import { ListOfRequests } from 'src/view/components/Main/components/ListOfRequests/ListOfRequests';
import { Hint } from './components/Hint/Hint';
import { ChatFeed } from 'src/view/components/Main/components/ChatFeed/ChatFeed';
import { PopupModal } from './components/Modal/components/PopupModal/PopupModal';
import { Modal } from './components/Modal/Modal';
import { PopupFullScreenPreview } from './components/PopupFullScreenPreview/PopupFullScreenPreview';
import { StatusModal } from './components/StatusModal/StatusModal';
//Redux
import { useAppSelector, useAppDispatch } from 'src/tools/hooks/redux';
import { clearFileData, clearPreviewImageUrl, setImageFullScreenClose, setImagePreviewClose, setImagePreviewOpen } from 'src/ducks/chatFeed';
import { logout } from 'src/ducks/auth';



export const Main: FC = () => {
    const dispatch = useAppDispatch()

    const [message, setMessage] = useState('')
    const [statusShow, setStatusShow] = useState(false)
    const { requestId, status } = useAppSelector((state) => state.requestList)
    const { imagePreviewIsOpen, imageFullScreenIsOpen, previewImageUrl } = useAppSelector((state) => state.chatFeed)
    const [timer, setTimer] = useState<any>(null)

    const closePrewievFullSize = () => {
        dispatch(clearPreviewImageUrl())
        dispatch(setImagePreviewOpen())
    }

    useEffect(() => {
        setStatusShow(true)

        if (timer) clearTimeout(timer)
        const timer_ = setTimeout(() => { setStatusShow(false) }, 3000)
        setTimer(timer_)

    }, [status])



    return (
        <div className='main'>
            <div className='main__logo' >
                <a href="#">
                    <img src={logo} alt="logo" onClick={() => dispatch(logout())} />
                </a>
            </div>
            <div className='main__content' >
                {status.title !== '' && statusShow && <StatusModal {...status} />}
                {!requestId && <Hint />}
                {requestId && <ChatFeed message={message} setMessage={setMessage} />}
                {imagePreviewIsOpen && <PopupModal isOpen={imagePreviewIsOpen} onClick={() => dispatch(clearFileData())} action={setImagePreviewClose}><Modal /></PopupModal>}
            </div>
            <div className='main__feed'>
                <ListOfRequests />
            </div>
            {
                imageFullScreenIsOpen &&
                <PopupFullScreenPreview isOpen={imageFullScreenIsOpen} action={setImageFullScreenClose} onClick={closePrewievFullSize} >
                    <div className='imagePreview'>
                        <img src={previewImageUrl} alt="any" />
                    </div>
                </PopupFullScreenPreview>
            }
        </div>
    )
}