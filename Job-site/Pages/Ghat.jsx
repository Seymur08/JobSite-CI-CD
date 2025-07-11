// import React, { useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";

// const Chat = ({ userId, token }) => {
//     const [connection, setConnection] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState("");
//     const [receiverId, setReceiverId] = useState(""); // Employer or Worker ID

//     useEffect(() => {
//         const connect = new signalR.HubConnectionBuilder()
//             .withUrl("http://localhost:5156/chathub", {
//                 accessTokenFactory: () => token
//             })
//             .withAutomaticReconnect()
//             .build();

//         connect.on("ReceiveMessage", (senderId, message) => {
//             setMessages(prev => [...prev, { senderId, message }]);
//         });

//         connect.start().then(() => {
//             console.log("Connected to SignalR");
//         });

//         setConnection(connect);
//     }, []);

//     const sendMessage = async () => {
//         if (connection && messageInput && receiverId) {
//             await connection.invoke("SendMessage", userId, receiverId, messageInput);
//             setMessages(prev => [...prev, { senderId: userId, message: messageInput }]);
//             setMessageInput("");
//         }
//     };

//     return (
//         <div>
//             <h2>Mesajlaşma</h2>
//             <input
//                 type="text"
//                 placeholder="Qəbul edən ID"
//                 value={receiverId}
//                 onChange={(e) => setReceiverId(e.target.value)}
//             />
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index}><strong>{msg.senderId}</strong>: {msg.message}</div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//             />
//             <button onClick={sendMessage}>Göndər</button>
//         </div>
//     );
// };

// export default Chat;




// // import React, { useEffect, useState } from 'react';
// // import * as signalR from '@microsoft/signalr';

// // function ChatWindow({ receiverId, userId, token }) {
// //     const [connection, setConnection] = useState(null);
// //     const [messages, setMessages] = useState([]);
// //     const [message, setMessage] = useState('');
// //     const [isOpen, setIsOpen] = useState(true);

// //     useEffect(() => {
// //         const newConnection = new signalR.HubConnectionBuilder()
// //             .withUrl("http://localhost:5156/chatHub", {
// //                 accessTokenFactory: () => token,
// //             })
// //             .withAutomaticReconnect()
// //             .build();

// //         setConnection(newConnection);
// //     }, [token]);

// //     useEffect(() => {
// //         if (connection) {
// //             connection.start()
// //                 .then(() => {
// //                     console.log('Connected to SignalR hub');

// //                     connection.on("ReceiveMessage", (fromUserId, msg) => {
// //                         setMessages(prev => [...prev, { sender: fromUserId, text: msg }]);
// //                     });
// //                 })
// //                 .catch(err => console.error('SignalR connection failed: ', err));
// //         }
// //     }, [connection]);

// //     const sendMessage = async () => {
// //         if (message.trim() === "") return;

// //         try {
// //             await connection.invoke("SendMessage", receiverId, message);
// //             setMessages(prev => [...prev, { sender: userId, text: message }]);
// //             setMessage('');
// //         } catch (err) {
// //             console.error("Error sending message: ", err);
// //         }
// //     };

// //     return (
// //         <div className="fixed bottom-4 right-4 w-72 shadow-xl rounded-xl bg-white border border-gray-300">
// //             <div
// //                 className="bg-green-600 text-white px-4 py-2 rounded-t-xl cursor-pointer"
// //                 onClick={() => setIsOpen(!isOpen)}
// //             >
// //                 {isOpen ? "Söhbəti bağla" : "Mesaj yaz"}
// //             </div>

// //             {isOpen && (
// //                 <div className="p-2 max-h-96 flex flex-col">
// //                     <div className="flex-1 overflow-y-auto mb-2 space-y-1">
// //                         {messages.map((msg, index) => (
// //                             <div
// //                                 key={index}
// //                                 className={`p-2 rounded-lg max-w-xs ${msg.sender === userId ? 'bg-green-100 self-end' : 'bg-gray-200 self-start'}`}
// //                             >
// //                                 {msg.text}
// //                             </div>
// //                         ))}
// //                     </div>

// //                     <div className="flex space-x-2">
// //                         <input
// //                             value={message}
// //                             onChange={e => setMessage(e.target.value)}
// //                             className="flex-1 border border-gray-300 rounded px-2"
// //                             placeholder="Mesaj yaz..."
// //                         />
// //                         <button
// //                             onClick={sendMessage}
// //                             className="bg-green-600 text-white px-3 rounded"
// //                         >
// //                             Göndər
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// // export default ChatWindow;










// // import { HubConnectionBuilder } from "@microsoft/signalr";
// // import { useState, useEffect } from "react";

// // const connection = new HubConnectionBuilder()
// //     .withUrl("http://localhost:5156/chatHub") // Backend portu 5000 assumed
// //     .withAutomaticReconnect()
// //     .build();

// // function ChatApp() {
// //     const [messages, setMessages] = useState([]);
// //     const [user, setUser] = useState("");
// //     const [message, setMessage] = useState("");

// //     useEffect(() => {
// //         connection.on("ReceiveMessage", (user, message) => {
// //             setMessages(prev => [...prev, { user, message }]);
// //         });

// //         connection.start().catch(err => console.error(err));
// //     }, []);

// //     const sendMessage = async () => {
// //         try {
// //             await connection.invoke("SendMessage", user, message);
// //             setMessage("");
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };

// //     return (
// //         <div>
// //             <input type="text" placeholder="User" value={user} onChange={e => setUser(e.target.value)} />
// //             <input type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
// //             <button onClick={sendMessage}>Send</button>
// //             <ul>
// //                 {messages.map((msg, index) => (
// //                     <li key={index}><strong>{msg.user}:</strong> {msg.message}</li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // }

// // export default ChatApp;
