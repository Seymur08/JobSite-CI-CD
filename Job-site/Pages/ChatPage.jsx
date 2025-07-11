import React, { useEffect, useState, useRef, useContext } from "react";
import sendIcon from '../src/icons/send-message.png';
import { useSignalR } from "../src/style/SignalR/SignalRProvider";
import '../src/style/ChatPage.css';
import { jwtDecode } from "jwt-decode";
import { useChat } from "../src/ChatContext";
import { useUserChat } from "./UserChatContext";
import { useLocation, useNavigate } from "react-router-dom";


const ChatPage = (props) => { // { onClose, receiverId, userId, role }


    const navigate = useNavigate();
    const location = useLocation();

    const receiverId = props.receiverId || location.state?.receiverId;
    const userId = props.userId || location.state?.userId;
    const role = props.role || location.state?.role;

    const onClose = props.onClose ?? (() => navigate(-1));
    const { messages, setMessages, connection } = useChat(); //

    const handleClose = () => {
        setMessages([]); // Chat bağlananda mesajları sil
        onClose();
    }



    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef(null);

    const { chatData, closeChat } = useUserChat();

    const [openMessage, setShow] = useState(false);


    const { setIsChatPageOpen } = useChat();

    useEffect(() => {
        setIsChatPageOpen(true); // ChatPage açıldı
        return () => {
            setIsChatPageOpen(false); // ChatPage bağlandı
        };
    }, []);


    const handleSendMessage = () => {
        if (!inputMessage.trim() || !connection) return;
        connection.invoke("SendMessage", receiverId, role, inputMessage)
            .catch(console.error);
        setInputMessage("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSendMessage();
    };


    useEffect(() => {
        return () => {
            localStorage.removeItem("backgroundPath");
        };
    }, []);

    return (

        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-header">
                    <img src="/logo.png" alt="User" className="profile-pic" />
                    <span>Live Chat</span>
                    <button onClick={handleClose} className="close-btn">X</button>
                </div>
                <div className="chat-body">
                    {messages?.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === userId ? 'me' : 'other'}`}>
                            <span className="name">{msg.name}</span>
                            <div className="bubble">{msg.text}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Mesaj yazın..."
                        value={inputMessage}                 // input state
                        onChange={(e) => setInputMessage(e.target.value)}  // input-u dəyiş
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleKeyDown}>➤</button>
                </div>
            </div>
        </div>

    );
};


export default ChatPage;

