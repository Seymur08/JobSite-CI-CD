// components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import image from '../Image/not-image.jpg';
import image from '../src/Image/not-image.jpg'
import '../src/style/HomePage.css';
function Layout({ name, handleProfile, handleLogout }) {
    return (
        <>
            <header>
                <nav className='section-header'>
                    <div className='site-section-left'>
                        <Link to="/HomePage" id='Job-Site-Name'>JobGate.az</Link>
                        <Link to="/cardworker">İş axtaranlar</Link>
                        <Link to="/cardemployer">İş elanları</Link>
                        <Link to="/AddEmployerAdvert">Elan yerleşdir</Link>
                    </div>
                    <div className='site-section-right'>
                        <div className='profile-name'>
                            <Link onClick={handleProfile}>
                                <div className='profile-img'>
                                    <img src={image} alt="" />
                                    <div className={`profile-active ${name !== "" ? 'green' : 'red'}`}></div>
                                </div>
                            </Link>
                            <h1 style={{ color: "yellow" }}>{name}</h1>
                        </div>
                        {name === "" ? (
                            <>
                                <Link to="/LoginPage">Login</Link>
                                <Link to="/RegisterPage">Sign Up</Link>
                            </>
                        ) : null}
                        <a onClick={handleLogout}>Çıxın</a>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    );
}

export default Layout;
