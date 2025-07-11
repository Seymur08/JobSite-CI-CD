// SignalRContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const SignalRContext = createContext(null);

export const SignalRProvider = ({ children, token }) => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {

        if (token) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5156/chatHub',
                    {
                        accessTokenFactory: () => token
                    }
                )
                .withAutomaticReconnect()
                .build();

            newConnection
                .start()
                .then(() => {
                    console.log('SignalR Quruldu');
                    setConnection(newConnection);
                })
                .catch((err) => console.error('SignalR connection error:', err));

            return () => {
                newConnection.stop();
            };
        }
    }, [token]);

    return (
        <SignalRContext.Provider value={connection}>
            {children}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => useContext(SignalRContext);


