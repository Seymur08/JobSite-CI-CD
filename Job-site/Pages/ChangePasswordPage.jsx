import React, { useState } from 'react';
import '../src/style/ChangePasswordPage.css';
import change_password from '../src/Image/change-password.jpg';
import AutoClosePopup from './Toast';
import InfoPage from './InfoPage';
import { useDispatch } from 'react-redux';
// import { ChangePassword } from '../src/style/redux/AdminFunctions';
import { useNavigate } from 'react-router-dom';
import { ChangePassword } from '../src/style/redux/PartnerFunctions';
import { jwtDecode } from 'jwt-decode';
import isTokenValid from '../src/style/redux/ControlToken';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPopup, setInfoPage] = useState(false);
    const [formData, setFormData] = useState({
        Email: '',
        OldPassword: '',
        NewPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(ChangePassword(formData)).unwrap();
        if (result) {
            setInfoPage(true);
            setTimeout(() => {

                const accessToken = localStorage.getItem("accessToken")
                const decode = jwtDecode(accessToken);
                const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                if (role === "Worker" && isTokenValid(accessToken)) {
                    navigate('/WorkerDashboard/WorkerMainPage')
                }
                else if (role === "Employer" && isTokenValid(accessToken)) {
                    navigate('/EmployerDashboard/EmployerMainPage')
                }
                else if (role === "Admin" && isTokenValid(accessToken)) {
                    navigate('/AdminPAge')
                }

            }, 3000); // 3 saniye sonra rola gore yonlendirir
        }

    };

    console.log(formData)
    return (
        <>
            <div className='change-password-Page'>
                <img src={change_password} alt="none" />
                <div className='change-password-Page-Form'>
                    <h2>Şifrə dəyişdir</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='change-password-Page-Input'>
                            <h3>Email</h3>
                            <input
                                type="text"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='change-password-Page-Input'>
                            <h3>Köhnə Şifrə</h3>
                            <input
                                type="text"
                                name="OldPassword"
                                value={formData.OldPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='change-password-Page-Input'>
                            <h3>Yeni Şifrə</h3>
                            <input
                                type="text"
                                name="NewPassword"
                                value={formData.NewPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='change-password-Page-Button'>
                            <button type='submit'>Təstik et</button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && (
                <InfoPage
                    message="Məlumat uğurla yerine yetirildi"
                    onClose={() => setInfoPage(false)}
                />
            )}
        </>
    );
}

export default ChangePasswordPage;

















// import React, { useState } from 'react'
// import '../src/style/ChangePasswordPage.css'
// import '../src/style/Toast.css'
// import change_password from '../src/Image/change-password.jpg'
// import Toast from './Toast';
// import AutoClosePopup from './Toast';

// function ChangePasswordPage() {

//     const [showPopup, setshowPopup] = useState(false)
//     const [formData, setFormData] = useState({

//         Email: '',
//         OlaPassword: '',

//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });


//     };


//     const handleSubmit = () => {
//         setshowPopup(true);
//     }


//     return (

//         <>
//             <div className='change-password-Page'>
//                 <img src={change_password} alt="none" />
//                 <div className='change-password-Page-Form'>
//                     <h2>Şifrə dəyişdir</h2>
//                     <form onSubmit={handleSubmit}>

//                         <div className='change-password-Page-Input'>
//                             <h1>Köhnə Şifrə</h1>
//                             <input
//                                 type="text"
//                                 name="Email"
//                                 value={formData.Email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className='change-password-Page-Input'>
//                             <h1>Yeni Şifrə</h1>
//                             <input
//                                 type="text"
//                                 name="OlaPassword"
//                                 value={formData.OlaPassword}
//                                 onChange={handleChange}

//                                 required
//                             />
//                         </div>
//                         <div className='change-password-Page-Button'>
//                             <button type='submit'>Təstik et</button>
//                         </div>

//                     </form>
//                 </div>
//             </div>
//             {showPopup && (
//                 <AutoClosePopup
//                     message="Məlumat uğurla qeyd edildi!"
//                     onClose={() => setShowPopup(false)}
//                 />
//             )}

//         </>
//     )
// }

// export default ChangePasswordPage
