

import viteLogo from '/vite.svg'
import '../src/App'
import '../src/style/RegisterPage.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import image from '../src/Image/DigitalMarketing.png'
import Toast from './Toast';
import { useDispatch } from 'react-redux';
import { RegisterWorker } from '../src/style/redux/WorkerFunction';
import { RegisterEmployer } from '../src/style/redux/EmployerFuntion';
import InfoPage from './InfoPage';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        UserName: '',
        SurName: '',
        Email: '',
        Password: '',
        Gender: '',
        Age: '',
        Phone: '',
        Role: '',
        ProfileImagePath: null

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            ProfileImagePath: e.target.files[0]
        });
    };

    const [showToast, setShowToast] = useState(false);


    const dispatch = useDispatch();

    const HandleRegister = async (e) => {
        e.preventDefault();


        const data = new FormData();
        data.append("UserName", formData.UserName);
        data.append("SurName", formData.SurName);
        data.append("Email", formData.Email);
        data.append("Password", formData.Password);
        data.append("Gender", formData.Gender);
        data.append("Age", formData.Age);
        data.append("Phone", formData.Phone);
        data.append("Role", formData.Role);
        data.append("ProfileImagePath", formData.ProfileImagePath);



        if (formData.Role == 'Worker') {
            const result = await dispatch(RegisterWorker(data));
            console.log(result);
            // navigate("/WorkerMainPage")
            setShowToast(true);

            // navigate("/HomePage")

        }
        else if (formData.Role == 'Employer') {
            await dispatch(RegisterEmployer(data))
            // navigate("/EmployerMainPage")
            setShowToast(true);

            //navigate("/HomePage")

        }


        // setShowToast(true);
    }

    console.log(showToast);

    return (
        <>
            <div className='Register-Page'>
                <img src={image} alt="none" />
            </div>

            <div className='Register-Page-Form'>
                <h2>Qeydiyyat Formu</h2>
                <form onSubmit={HandleRegister}>
                    <div className='Register-Page-Form-in'>
                        <input
                            type="text"
                            name="UserName"
                            value={formData.UserName}
                            onChange={handleChange}
                            placeholder="Ad"
                            required
                        />
                        <input
                            type="text"
                            name="SurName"
                            value={formData.SurName}
                            onChange={handleChange}
                            placeholder="Soyad"
                            required
                        />
                        <input
                            type="text"
                            name="Age"
                            value={formData.Age}
                            onChange={handleChange}
                            placeholder="Yaş"
                            required
                        />
                        <select
                            className="modal-content-select"
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Cinsiyyət seçin</option>
                            <option value="Kişi">Kişi</option>
                            <option value="Qadın">Qadın</option>
                        </select>
                        <input
                            type="text"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="mail"
                            required
                        />
                        <input
                            type="text"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            placeholder="Şifrə"
                            required
                        />
                        <input
                            type="text"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            placeholder="Telefon"
                            required
                        />
                        <select
                            className="modal-content-select"
                            name="Role"
                            value={formData.Role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Rol seçin</option>
                            <option value="Worker">işçi</option>
                            <option value="Employer">İşəgötürən</option>
                        </select>

                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button type="submit">Təsdiq Et</button>
                    </div>
                </form>
            </div>
            {showToast && (
                <InfoPage
                    message="Qeydiyyat uğurla yerinə yetirildi!"
                    onClose={() => {
                        setShowToast(false);
                        navigate("/HomePage");
                    }}
                />
            )}

        </>
    );
}

export default RegisterPage;

