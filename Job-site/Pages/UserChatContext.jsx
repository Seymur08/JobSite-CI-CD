import React, { createContext, useContext, useState } from 'react';

const UserChatContext = createContext();

export const UserChatProvider = ({ children }) => {

    const [chatData, setUserData] = useState({
        receiverId: null,
        userId: null,
        role: null,
        isOpenChat: true,
        isOpenNotification: true
    });

    return (
        <UserChatContext.Provider value={{ chatData, setUserData }}>
            {children}
        </UserChatContext.Provider>
    );
};

export const useUserChat = () => useContext(UserChatContext);


