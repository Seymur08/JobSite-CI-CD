import { useEffect, useState } from "react";
import '../src/style/Toast.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConFirmCode } from "../src/style/redux/PartnerFunctions";
import isTokenValid from "../src/style/redux/ControlToken";

const AutoClosePopup = ({ onClose, onData }) => {

    const [showPopup, showInfoPage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(45); // 10 saniyəlik sayğac

    useEffect(() => {

        if (secondsLeft === 0) {
            onClose();
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);   // 1000 idi

        return () => clearInterval(intervalId);
    }, [secondsLeft, onClose]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {

        if (onData) {
            onData(inputValue); // input-dakı dəyəri geri göndər
        }


        onClose();
    }

    const handleSubmit = () => {
        if (inputValue.trim() !== "") {

            onSubmit(inputValue);
            onClose();
        }
    };

    return (
        <>
            <div className="container-info">
                <p className="text">{secondsLeft}</p> {/* Mətni göstərin */}
                <input className="textinput"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Məlumat daxil edin" />

                <button className="textbuttun" onClick={handleClick}>Testiq Et</button>
            </div>
        </>
    );
};

export default AutoClosePopup;








