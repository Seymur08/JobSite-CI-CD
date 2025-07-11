
// import React, { createContext, useContext, useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";

// const SignalRContext = createContext(null);

// export const SignalRProvider = ({ children }) => {
//     const [connection, setConnection] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("accessToken");
//         if (!token) return;

//         const newConnection = new signalR.HubConnectionBuilder()
//             .withUrl("http://localhost:5156/chatHub", {
//                 accessTokenFactory: () => token,
//             })
//             .withAutomaticReconnect()
//             .build();

//         newConnection
//             .start()
//             .then(() => {
//                 console.log("SignalR bağlantısı quruldu");
//                 setConnection(newConnection);
//             })
//             .catch((err) => console.error("Bağlantı xətası:", err));

//         return () => {
//             newConnection.stop();
//         };
//     }, []);

//     return (
//         <SignalRContext.Provider value={connection}>
//             {children}
//         </SignalRContext.Provider>
//     );
// };

// export const useSignalR = () => useContext(SignalRContext);
