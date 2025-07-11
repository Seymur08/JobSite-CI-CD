import React, { useState } from 'react'
import image from '../src/Image/open-door.png'
import '../src/style/ForgetPasswordPage.css'
import { useNavigate } from 'react-router-dom';
import InfoPage from './InfoPage';
import { useDispatch } from 'react-redux';
import { ForgetChange } from '../src/style/redux/PartnerFunctions';




function ForgetChangePassword() {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    // const [Showinfo, setShovinfo] = useState(false);
    // const [showPopup, setInfoPage] = useState(false);
    const [showPopup, setInfoPage] = useState(false);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const [formData, setFormData] = useState({
        newpassword: '',
        againpassword: '',
    });


    const ChangePassword = async (e) => {
        e.preventDefault();
        console.log(formData);
        const result = await dispatch(ForgetChange(formData)).unwrap()

        if (result) {
            setInfoPage(true);
            setTimeout(() => {
                localStorage.removeItem("TemporaryToken");
                navigate("/LoginPage");
            }, 3000); // 3 saniyə sonra navigate("/LoginPage") çağırılacaq
        }

    }

    return (
        <>
            <div className='Login-Page'>
                <img src={image} alt="none" />
                <div className='Login-Page-Form'>
                    <h2>Yeni Şifrə</h2>
                    <form onSubmit={ChangePassword}>

                        <div className='Login-Page-Input'>
                            <h1>Yeni Şifrə</h1>
                            <input
                                type="text"
                                name="newpassword"
                                value={formData.newpassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='Login-Page-Input'>
                            <h1>Tekrarlayin</h1>
                            <input
                                type="text"
                                name="againpassword"
                                value={formData.againpassword}
                                onChange={handleChange}
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
                <InfoPage
                    message="Emeliyyat uğurla yerine yetirildi!"
                    onClose={() => setInfoPage(false)}

                />
            )}
        </>
    )
}

export default ForgetChangePassword
