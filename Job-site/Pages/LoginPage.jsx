
import '../src/style/Login.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import image from '../src/Image/open-door.png'
import { Link, useNavigate } from 'react-router-dom';
import { GetLogin } from '../src/style/redux/AllFuntions';
import { useDispatch } from 'react-redux';
import isTokenValid from '../src/style/redux/ControlToken';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { GetUserAbout } from '../src/style/redux/HomeFunction';

function Login({ setToken }) {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [generalError, setGeneralError] = useState('');
    const dispatch = useDispatch()

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

    const { setError, clearErrors, formState: { errors, general } } = useForm();

    const Login = async (e) => {
        e.preventDefault();
        clearErrors();
        const result = await dispatch(GetLogin(formData));
        const accessToken = localStorage.getItem('accessToken');
        if (isTokenValid(accessToken)) {

            const decoded = jwtDecode(accessToken);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

            if (role === "Admin") {
                navigate('/AdminDashboard');
            }
            if (role === "Worker") {
                navigate('/WorkerDashboard');

            }
            if (role === "Employer") {
                navigate("/EmployerDashboard")

            }
            await dispatch(GetUserAbout())
            setToken(accessToken);




        }

        else if (GetLogin.rejected.match(result)) {
            const apiErrors = result.payload;

            Object.entries(apiErrors).forEach(([field, messages]) => {
                setError(field, {
                    type: 'server',
                    message: messages[0],
                    general: general
                });
            });

            if (apiErrors.general) {
                setGeneralError(apiErrors.general);
            }
        }

    }


    return (
        <>
            <div className='LoginPage'>
                <img id='imageLogin' src={image} alt="none" />
                <form onSubmit={Login}>
                    {generalError && <div className="error">Nese Sehv Bas Verdi</div>}
                    <h2>Login Formu</h2>
                    <div className='LoginPageInput'>
                        <h1>Email</h1>
                        <input
                            type="text"
                            name="email"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                        {errors?.Email?.message && <div className="error">{errors?.Email?.message}</div>}
                    </div>
                    <div className='LoginPageInput'>
                        <h1>Şifrə</h1>
                        <input
                            type="text"
                            name="password"
                            value={formData.surName}
                            onChange={handleChange}
                            required
                        />
                        {errors?.Password?.message && <div className="error">{errors.Password.message}</div>}
                    </div>
                    <div className='LoginPageButton'>
                        <Link to="/ForgetPasswordPage">Şifrəni unutmusan</Link>
                        <button type='submit'>Daxil ol</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;

