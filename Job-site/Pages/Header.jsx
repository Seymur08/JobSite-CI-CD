import React, { useState } from 'react';
// import '../src/style/Deneme.css'; // CSS faylını daxil edirik
// import '../src/style/HeaderMain.css';
import '../src/style/Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();  // useNavigate hook-u ilə səhifəyə keçid

    const goToAboutPage = () => {
        navigate('/HeaderMain');  // Burada /about səhifəsinə keçilir
    };

    return (
        <>


            {/* <div className='header-main'>
                <div className='header-main-in'>
                    <div className='header-main-left'>
                        <a href="#">boss.az</a>
                        <button>İş elanları</button>
                        <button>İş axtaranlar</button>
                    </div>
                    <div className='header-main-right'>

                        <button className='button-haqqimizda'>Haqqımızda</button>
                        <button onClick={goToAboutPage} className='button-elan'>Elan yerləşdirin</button>
                    </div>

                    <div>

                    </div>
                </div>

            </div> */}
        </>
    );
}

export default Header;






