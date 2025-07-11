
import viteLogo from '/vite.svg'
import '../src/App'
import '../src/style/Login.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Admin from './Admin';
import { refreshControl } from './ControRefrechlToken';
import { useNavigate } from 'react-router-dom';

// import { refreshControl } from './ControlToken';


function AdminLogin() {
    const [isOpen, setIsOpen] = useState(true);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Yeni state əlavə edirik
    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        email: '',
        password: ''

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Salam");
        let response = await axios.post('http://localhost:5156/api/Admin/Login', formData
        )
            .then(response => {
                if (response.status === 200) {
                    const token = response.data.token // tokenden yalniz acsess tokeni verdik refrsh i yox
                    localStorage.setItem("Token", token.token)
                    localStorage.setItem("RefreshToken", token.refreshToken)
                    console.log('token ', token);
                    closeModal();
                    navigate('/AdminPage');

                }
                else {
                    console.log("status ", response.status)
                }
            })
            .catch(error => {
                console.error("xeta ", error);
            });


    };


    return (
        <>

            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Admin Formu</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Sifre"
                                required
                            />
                            <button type='submit'>Daxil ol</button>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}




export default AdminLogin;
