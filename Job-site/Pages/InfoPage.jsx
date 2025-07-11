import { useEffect, useState } from "react";
import '../src/style/InfoPage.css';
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";


const InfoPage = ({ message, onClose }) => {
    console.log("hgcjhgcjhgfcjhfcjfhcjhgcvjhg");
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 1500); // 1.5 saniyə

        return () => clearTimeout(timeoutId);
    }, [onClose]);

    return (
        <div className="container-info-mini">
            <p className="text" >{message}</p>
        </div>
    );
};

export default InfoPage;
