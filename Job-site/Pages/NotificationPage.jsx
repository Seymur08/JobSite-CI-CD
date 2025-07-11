import React, { useState } from 'react'
// import './src/style/Notification.css'
import '../src/style/Notification.css'

import notification from "../src/Image/notification.png"
import { Link, useNavigate } from 'react-router-dom'
import { useUserChat } from './UserChatContext';
import ChatPage from './ChatPage';

const NotificationPage = ({ onClose, receiverId, userId, role, }) => {

    const { chatData, closeChat } = useUserChat();

    const [openMessage, setShow] = useState(false);

    const [openpage, setOpen] = useState(true);

    console.log("0000000000000000000000000000")
    console.log(`NotificationPage - receiverId: ${receiverId}`)
    console.log(`NotificationPage - userId: ${userId}`)
    console.log(`NotificationPage - role: ${role}`)
    console.log("0000000000000000000000000000")


    // console.log(`NotificationPage role - ${role}`)
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(false)
        // navigate("/ChatPage", {
        //     state: {
        //         receiverId,
        //         userId,
        //         role
        //     }
        // });
        onClose(); // notification pəncərəsini bağla
        // navigate('/ChatPage', {
        //     state: { receiverId, userId, role }
        // });

        // navigate("/ChatPage", { state: { background: location, receiverId, userId, role } });
        navigate("/ChatPage", {
            state: {
                background: {
                    pathname: location.pathname,
                    search: location.search,
                    hash: location.hash,
                },
                receiverId,
                userId,
                role
            }
        });


        //alert("Salam")
        // navigate("/ChatPage")
    }
    // const handleClose = () => {
    //     setOpen(false)

    //     // onClose()
    // }

    const handleClose = () => {
        setOpen(false)

        // onClose()
    }

    return (
        <>

            {openpage && (
                <div className="Notification-page-in">
                    <div className="Notification-page-in-elements">
                        <img src={notification} alt="User" className="Notification-img" />
                        <div className='Notification-page-link' onClick={handleClick} >Yeni mesaj</div>
                        <button onClick={handleClose} className="Notification-btn">❌</button>
                    </div>
                </div>
            )}
            {/* {openMessage && (
                <div>
                    <ChatPage
                        onClose={() => setShow(false)}
                        receiverId={receiverId}
                        userId={userId}
                        role={role}

                    />
                </div>
            )} */}

        </>
    );
};

export default NotificationPage;

