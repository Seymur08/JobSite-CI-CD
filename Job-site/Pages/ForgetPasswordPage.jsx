import React, { useEffect, useState } from 'react'
import image from '../src/Image/open-door.png'
import '../src/style/ForgetPasswordPage.css'
import AutoClosePopup from './Toast';
import { ForgetConFirmCode, ForgetPassword, GeneratorCode } from '../src/style/redux/PartnerFunctions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import isTokenValid from '../src/style/redux/ControlToken';

function ForgetPasswordPage() {
    const [popupData, setPopupData] = useState("");
    const navigate = useNavigate()

    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [showPopup, setShowPopup] = useState(false);

    const HandleChangeForget = async (e) => {
        e.preventDefault();
        console.log(formData);
        await dispatch(ForgetPassword(formData))



        setShowPopup(true);


    }


    useEffect(() => {
        const check = async () => {
            if (popupData.trim() !== "") {
                const result = await dispatch(ForgetConFirmCode(popupData)).unwrap();
                if (result === true) {

                    navigate("/ForgetChangePassword");
                }

            }
        }

        console.log(popupData);
        check();
    }, [popupData])


    return (
        <>
            <div className='Login-Page'>
                <img src={image} alt="none" />
                <div className='Login-Page-Form'>
                    <h2>Şifrə Bərpa Formu</h2>
                    <form onSubmit={HandleChangeForget}>

                        <div className='Login-Page-Input'>
                            <h1>Email</h1>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='Login-Page-Input'>
                            <h1>Telefon</h1>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="\d{10}"
                                maxLength="10"
                                required
                            />
                        </div>
                        <div className='Login-Page-Button'>
                            <button type='submit'>Davam et</button>
                        </div>

                    </form>
                </div>
            </div>
            {showPopup && (
                <AutoClosePopup
                    onClose={() => setShowPopup(false)}
                    onData={(data) => {
                        setPopupData(data);
                    }}
                />
            )}

        </>
    )
}

export default ForgetPasswordPage
