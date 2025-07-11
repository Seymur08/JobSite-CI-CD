
import "../src/style/EmployerDashboard.css"
// import { Link } from 'react-router-dom'
import photo from "../src/Image/photo_1.jpeg"
import update from "../src/icons/loading-arrow.png"// import '../src/style/WorkerMainPage.css'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllWorkerJobList, RemoveAdvertisement } from '../src/style/redux/WorkerFunction';
import image from '../src/icons/delete.png'
import { ConFirmCode, GeneratorCode } from '../src/style/redux/PartnerFunctions';
import AutoClosePopup from './Toast';
import { GetAllEmployerJobList } from "../src/style/redux/EmployerFuntion"
import { GetUserAbout, UpdateImage } from "../src/style/redux/HomeFunction"
import isTokenValid from "../src/style/redux/ControlToken"



function EmployerDashboard() {

    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState("");

    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('');

    const dispatch = useDispatch();
    const employers = useSelector((state) => state.employer.employers)
    const userabout = useSelector((state) => state.home.userabout)
    useEffect(() => {
        dispatch(GetAllEmployerJobList());
    }, [dispatch])


    useEffect(() => {
        // if (isTokenValid(localStorage.getItem("accessToken")))
        dispatch(GetUserAbout());
    }, [])


    const handleClick = (link) => {
        setActiveLink(link);
    };


    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleUpdateClick = () => {
        fileInputRef.current.click();
        console.log("Sagol")

    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("ProfileImage", file);
            await dispatch(UpdateImage(formData));
            await dispatch(GetUserAbout());
            window.location.reload();
            console.log("Bomba kimi")

        }
    };



    console.log(employers)

    const handleChangePassword = async () => {
        await dispatch(GeneratorCode());
        setShowPopup(true);
    }

    useEffect(() => {
        const foo = async () => {
            if (popupData.trim() !== "") {
                var result = await dispatch(ConFirmCode(popupData)).unwrap();
                if (result) {
                    navigate("/EmployerDashboard/ChangePasswordPage")
                }
            }
        }
        foo();

    }, [popupData]);


    return (
        <>
            <div className='mainpanel'>
                <div className='panelleft'>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    <div className="img-box">
                        <div className="img-box-img">
                            <img
                                className="Image"
                                src={`http://localhost:5156${userabout?.profileImagePath || image}`}
                                alt="Profil"
                            />
                            <img
                                className="Image-update"
                                src={update}
                                alt="Yenilə"
                                onClick={handleUpdateClick}
                            />
                        </div>
                    </div>
                    <h3 style={{ color: "white" }}>{userabout?.userName + " " + userabout?.surName}</h3>

                    <div className='Linkbtnbox'>
                        <div className={`Linkbtnin ${activeLink === 'profile' ? 'active' : ''}`}>
                            <Link onClick={() => handleClick('profile')}
                            >
                                Profile
                            </Link>
                        </div>

                        <div className={`Linkbtnin ${activeLink === 'asd' ? 'active' : ''}`}>
                            <Link to={'/EmployerDashboard/EmployerMainPage'} onClick={() => handleClick('asd')}
                            >
                                Elanlar
                            </Link>
                        </div>

                        <div className={`Linkbtnin ${activeLink === 'cv' ? 'active' : ''}`}>
                            <Link to={'/EmployerDashboard/AddEmployerAdvert'} onClick={() => handleClick('cv')}
                            >
                                Elan Yerləşdir
                            </Link>
                        </div>

                        <div className={`Linkbtnin ${activeLink === 'password' ? 'active' : ''}`}>
                            <Link onClick={() => {
                                handleClick('password');
                                handleChangePassword();
                            }}
                            >
                                Şifrə dəyişdir
                            </Link>
                        </div>


                    </div>


                </div>
                <div className='panelright'>
                    <Outlet />

                </div>

            </div >

            {showPopup && (
                <AutoClosePopup
                    onClose={() => setShowPopup(false)}
                    onData={(data) => {
                        setPopupData(data);
                    }}
                />
            )}

        </>
    )
}

export default EmployerDashboard


