import React, { useEffect, useState } from 'react';
import '../src/style/HomePage.css';
import image from '../src/Image/not-image.jpg'
import facebook from '../src/icons/facebook.png'
import twitter from '../src/icons/twitter.png'
import instagram from '../src/icons/instagram.png'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import '../src/App';
import '../src/App';
import CardWorker from './CardWorker';
import AdminPage from './AdminPage';
import CardEmployer from './CardEmployer';
import WaitingEmployerPage from './WaitingEmployerPage';
import WaitingWorkerPage from './WaitingWorkerPage';
import RegisterPage from './RegisterPage';
import ChangePasswordPage from './ChangePasswordPage';
import WaitingPage from './WaitingPage';
import ForgetPasswordPage from './ForgetPasswordPage';
import AddEmployerAdvert from './AddEmployerAdvert';
import Login from './LoginPage';
import { jwtDecode } from 'jwt-decode';
import isTokenValid from '../src/style/redux/ControlToken';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPermissionEmployers, GetAllPermissionWorkers, GetUserAbout } from '../src/style/redux/HomeFunction';

import email from "../src/Image/email.png"
import { clearUserAbout } from '../src/style/redux/HomeSlice';

function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const accessToken = localStorage.getItem('accessToken');

    const userabout = useSelector((state) => state.home.userabout)

    useEffect(() => {
        // if (isTokenValid(accessToken))
        dispatch(GetUserAbout());
    }, [])

    const handleProfile = () => {

        // if (!accessToken || !isTokenValid(accessToken)) {
        //     console.warn("Token mövcud deyil və ya etibarsızdır");
        //     return;
        // }


        const decoded = jwtDecode(accessToken);
        const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setName(name);
        if (role === "Worker" && isTokenValid(accessToken)) {

            navigate('/WorkerDashboard/WorkerMainPage')

        }
        else if (role === "Employer" && isTokenValid(accessToken)) {
            navigate('/EmployerDashboard/EmployerMainPage')

        }
        else if (role === "Admin" && isTokenValid(accessToken)) {
            navigate('/AdminDashboard')

        }
    }


    const LogOut = () => {
        localStorage.removeItem('accessToken');
        setName("");
        navigate('/HomePage'); // Çıxış etdikdən sonra səhifəyə yönləndirir
        dispatch(clearUserAbout())
        // window.location.reload();
    }


    return (
        <>
            <Outlet />
            <header>
                <nav className='section-header'>
                    <div className='site-section-left'>
                        <Link to="/HomePage" id='Job-Site-Name' >JobGate.az</Link>
                        <Link to="/cardworker">İş axtaranlar</Link>
                        <Link to="/cardemployer">İş elanları</Link>
                        {/* <Link to="/AddEmployerAdvert">Elan yerleşdir</Link> */}
                    </div>
                    <div className='site-section-right'>
                        <div className='profile-name' >
                            {/* to='/WorkerMainPage' */}
                            <div onClick={handleProfile}>


                                <div className="profile-img">
                                    <img
                                        src={`http://localhost:5156${userabout?.profileImagePath}`}
                                        alt=""
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = image;
                                        }}
                                    />
                                    <div className={`profile-active ${userabout?.userName !== undefined ? 'green' : 'red'}`}></div>
                                </div>

                            </div>

                            {userabout?.userName !== undefined && (
                                <h3 style={{ color: "yellow" }}>{userabout?.userName}</h3>
                            )}
                        </div>
                        {userabout?.userName !== undefined ? (
                            <>
                                {/* <img style={{ width: "35px" }} src={email} alt="none" /> */}
                            </>
                        ) : (<>

                            <Link to="/LoginPage">Login</Link>
                            <Link to="/RegisterPage">Sign Up</Link>
                        </>)}
                        <a onClick={LogOut} >Çıxın</a>
                    </div>
                </nav>
            </header >

        </>
    )
}

export default HomePage;


