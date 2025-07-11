
import viteLogo from '/vite.svg'
import '../src/App'
import '../src/style/AdminPage.css'

import React, { useState, useEffect } from 'react';
import Admin from './Admin';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../src/icons/announcement.png'
import eye from '../src/icons/eye.png'
import dont from '../src/icons/no-stopping.png'
import key from '../src/icons/key.png'
import plus from '../src/icons/plus-symbol.png'
import { useDispatch, useSelector } from 'react-redux';
import isTokenValid from '/src/style/redux/ControlToken.js';
import { jwtDecode } from 'jwt-decode';
import {
    GetAllBlokedEmployer, GetAllBlokedWorker,
    GetAllWaitEmployers, GetAllWaitWorkers
} from '../src/style/redux/AdminFunctions';
import AutoClosePopup from './Toast';
import { GeneratorCode } from '../src/style/redux/PartnerFunctions';
import { AllAdvertCount } from '../src/style/redux/HomeFunction';


function AdminPage() {

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!isTokenValid(accessToken)) {
            navigate('/LoginPage');
        }
        if (isTokenValid(accessToken)) {
            const decoded = jwtDecode(accessToken);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            if (role != "Admin") {
                navigate('/LoginPage');

            }
        }
    }, [navigate, accessToken]);


    const dispatch = useDispatch();

    const aladvertcount = useSelector((store) => store.home.alladvertcount)
    const waitworker = useSelector((store) => store.admin.waitingworker)
    const waitemployer = useSelector((store) => store.admin.waitingemployer)
    const allblockworkers = useSelector((state) => state.admin.allblockworker)
    const allblockemployers = useSelector((state) => state.admin.allblockemployers)


    useEffect(() => {
        dispatch(AllAdvertCount());

        if (!waitemployer || waitemployer.length === 0) {
            dispatch(GetAllWaitEmployers());
        }
        if (!waitworker || waitworker.length === 0) {
            dispatch(GetAllWaitWorkers());
        }
        if (!allblockworkers) {
            dispatch(GetAllBlokedWorker());
        }
        if (!allblockemployers) {
            dispatch(GetAllBlokedEmployer());
        }


    }, [dispatch]);


    const [showPopup, setShowPopup] = useState(false);

    const handleChangePassword = () => {
        dispatch(GeneratorCode());
        setShowPopup(true);
    }


    return (
        <>

            <div className='Admin-Page'>
                <div className='top-box'>
                    <div className='top-box-in_1'>
                        <img id='image' src={icon} alt="none" />
                        <div className='top-box-in-world'>
                            <h2>{aladvertcount}</h2>
                            <h1>Ümumi elan sayı</h1>
                        </div>
                    </div>
                    <div className='top-box-in_2'>
                        <img id='image' src={eye} alt="none" />
                        <div className='top-box-in-world'>
                            <h2>{(waitworker?.length || 0) + (waitemployer?.length || 0)}</h2>
                            <h1>Gözləyənlərin sayı</h1>
                        </div>
                    </div>
                    <div className='top-box-in_3'>
                        <img id='image' src={dont} alt="none" />
                        <div className='top-box-in-world'>
                            <h2>123</h2>
                            <h1>Bloklananların sayı</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='middle-box'>
                <div className='middle-box-in'>
                    <img src={key} alt="none" />
                    <a className='link-button' onClick={handleChangePassword} ><h1>Şifrə dəyişdir</h1></a>

                </div>

                <div className='middle-box-in'>
                    <img src={eye} alt="none" />
                    <Link className='link' to="/WaitingPage"
                    ><h1>Gözləyənlər</h1></Link>


                </div>

            </div>

            <div className='middle-box'>
                <div className='middle-box-in'>
                    <img src={plus} alt="none" />
                    <Link className='link' to="/AddNewCategory"><h1>Kateqoriyaya əlavə edin</h1></Link>

                </div>
                <div className='middle-box-in'>
                    <img src={plus} alt="none" />
                    <Link className='link' to="/BlockedAdvertPage"><h1>Bloklananlara bax</h1></Link>

                </div>

            </div> */}
            {showPopup && (
                <AutoClosePopup
                    message="Məlumat uğurla qeyd edildi!"
                    onClose={() => setShowPopup(false)}
                />
            )}


        </>
    );
}




export default AdminPage;
