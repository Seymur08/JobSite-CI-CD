

import viteLogo from '/vite.svg'
import '../src/App'
import '../src/style/Login.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';


// function LoginForm() {
//     const [mail, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const data = {
//         mail,
//         password
//     };

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         try {
//             const response = await axios.post('http://localhost:5156/api/Employer/Login', {
//                 email: mail,  // mail -> email
//                 password: password
//             });

//             console.log('Server response:', response.data);
//         } catch (error) {
//             console.error('Error sending data:', error);
//         }
//     };




//     return (
//         <div className="form-container">
//             <h2>Giriş Formu</h2>
//             <form onSubmit={handleSubmit} className="login-form">
//                 <div>
//                     <label>İstifadəçi adı:</label>
//                     <input
//                         type="text"
//                         value={mail}
//                         onChange={handleUsernameChange}
//                         placeholder="İstifadəçi adını daxil edin"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Şifrə:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                         placeholder="Şifrəni daxil edin"
//                         required
//                     />
//                 </div>
//                 <button type="submit">Giriş</button>
//             </form>
//         </div>
//     );
// }

// export default LoginForm;

// function Register() {
//     const [isOpen, setIsOpen] = useState(false);

//     const openModal = () => setIsOpen(true);
//     const closeModal = () => setIsOpen(false);

//     return (
//         <>
//             <div className="modal" onClick={closeModal}>
//                 <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                     <span className="close" onClick={closeModal}>&times;</span>
//                     <h2>Giriş Formu</h2>
//                     <form>
//                         <input type="text" placeholder="Email" />
//                         <input type="password" placeholder="Şifrə" />
//                         <button type="submit">Daxil ol</button>
//                         <button type="submit">Register</button>
//                     </form>
//                 </div>
//             </div>

//         </>
//     );
// };


// export default Register;


// import React, { useState } from 'react';
// import './modal.css'; // Modal stilləri varsa daxil et

function Register() {
    const [isOpen, setIsOpen] = useState(true);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    const Login = () => {
        console.log(formData);
    }

    return (
        <>
            {/* <button onClick={openModal}>Qeydiyyatdan keç</button> */}

            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Qeydiyyat Formu</h2>
                        <form >
                            {/* <input type="text" placeholder="Email" required />
                            <input type="password" placeholder="Şifrə" required /> */}
                            <input
                                type="text"
                                name="email"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text"
                                name="password"
                                value={formData.surName}
                                onChange={handleChange}
                                placeholder="Sifre"
                                required
                            />
                            <button onClick={Login}>Daxil ol</button>
                            <button type="button" onClick={() => alert("Qeydiyyat düyməsi")}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Register;
