// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useSignalR } from './style/SignalR/SignalRProvider';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import NotificationPage from '../Pages/NotificationPage';
// import OneSignal from 'react-onesignal';
// import { useUserChat } from '../Pages/UserChatContext';

// export const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//     const { chatData, setUserData } = useUserChat();

//     const [isChatPageOpen, setIsChatPageOpen] = useState(false);

//     const navigate = useNavigate();
//     const connection = useSignalR(); // təkcə bir dəfə qurulsun
//     const [messages, setMessages] = useState([]);

//     const [notificationOpen, setNotificationOpen] = useState(false);

//     const [notificationData, setNotificationData] = useState();

//     const token = localStorage.getItem("accessToken");
//     const decoded = token && jwtDecode(token);
//     const currentUserId = decoded && decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
//     const role = decoded && decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

//     useEffect(() => {
//         if (!connection) return;

//         const handler = (senderUserId, role, username, message) => {

//             setMessages(prev => [
//                 ...prev,
//                 { sender: String(senderUserId), role: role, name: username, text: message },
//             ]);


//             if (String(senderUserId) !== String(currentUserId) && !isChatPageOpen) {

//                 // if (!isChatPageOpen) {
//                 Notification.requestPermission().then(permission => {
//                     if (permission === "granted") {
//                         new Notification("Salam!", { body: "Bu bir test bildirişidir" });

//                         console.log(`${username} yeni mesaj var`)
//                         console.log(`${role} den mesaj var`)

//                         if (role === "Employer") {

//                             setNotificationData({
//                                 receiverId: senderUserId,
//                                 userId: currentUserId,
//                                 role: role
//                             });
//                         }


//                         if (role === "Worker") {

//                             setNotificationData({
//                                 receiverId: senderUserId,
//                                 userId: currentUserId,
//                                 role: role
//                             });
//                         }

//                         setNotificationOpen(true)
//                     } else {
//                         console.log("İcazə verilmədi: ", permission);
//                     }
//                 });
//                 // }

//             }
//         };

//         connection.on("ReceiveMessage", handler);
//         return () => connection.off("ReceiveMessage", handler);
//     }, [connection]);

//     return (
//         <>
//             <ChatContext.Provider value={{
//                 messages, setMessages, connection, notificationOpen, setNotificationOpen,
//                 isChatPageOpen,
//                 setIsChatPageOpen
//             }}>
//                 {children}
//             </ChatContext.Provider>

//             {notificationOpen && notificationData && <NotificationPage
//                 onClose={() => setNotificationOpen(false)}
//                 receiverId={notificationData.receiverId}
//                 userId={notificationData.userId}
//                 role={notificationData.role}

//             />}
//         </>
//     );
// };
// export const useChat = () => {
//     const context = useContext(ChatContext);
//     if (!context) {
//         throw new Error("useChat must be used within a ChatProvider");
//     }
//     return context;
// };



import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSignalR } from './style/SignalR/SignalRProvider';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import NotificationPage from '../Pages/NotificationPage';
import OneSignal from 'react-onesignal';
import { useUserChat } from '../Pages/UserChatContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { chatData, setUserData } = useUserChat();

    const [isChatPageOpen, setIsChatPageOpen] = useState(false);
    const isChatPageOpenRef = useRef(isChatPageOpen);

    const navigate = useNavigate();
    const connection = useSignalR();
    const [messages, setMessages] = useState([]);

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationData, setNotificationData] = useState();

    const token = localStorage.getItem("accessToken");
    const decoded = token && jwtDecode(token);
    const currentUserId = decoded && decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const role = decoded && decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Hər dəfə chat səhifəsi açılanda/göstəriləndə ref-i yenilə
    useEffect(() => {
        isChatPageOpenRef.current = isChatPageOpen;
    }, [isChatPageOpen]);

    useEffect(() => {
        if (!connection) return;

        const handler = (senderUserId, role, username, message) => {
            setMessages(prev => [
                ...prev,
                { sender: String(senderUserId), role: role, name: username, text: message },
            ]);

            if (String(senderUserId) !== String(currentUserId) && !isChatPageOpenRef.current) {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("Salam!", { body: "Yeni mesajınız var!" });

                        setNotificationData({
                            receiverId: senderUserId,
                            userId: currentUserId,
                            role: role
                        });

                        setNotificationOpen(true);
                    } else {
                        console.log("İcazə verilmədi: ", permission);
                    }
                });
            }
        };

        connection.on("ReceiveMessage", handler);
        return () => connection.off("ReceiveMessage", handler);
    }, [connection, currentUserId]);

    return (
        <>
            <ChatContext.Provider value={{
                messages, setMessages, connection,
                notificationOpen, setNotificationOpen,
                isChatPageOpen, setIsChatPageOpen
            }}>
                {children}
            </ChatContext.Provider>

            {notificationOpen && notificationData && (
                <NotificationPage
                    onClose={() => setNotificationOpen(false)}
                    receiverId={notificationData.receiverId}
                    userId={notificationData.userId}
                    role={notificationData.role}
                />
            )}
        </>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
