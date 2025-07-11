
import "../src/style/WorkerDashboard.css"
// import { Link } from 'react-router-dom'
import photo from "../src/Image/photo_1.jpeg"
import update from "../src/icons/loading-arrow.png"
// import '../src/style/WorkerMainPage.css'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllWorkerJobList, RemoveAdvertisement } from '../src/style/redux/WorkerFunction';
import image from '../src/icons/delete.png'
import { ConFirmCode, GeneratorCode } from '../src/style/redux/PartnerFunctions';
import AutoClosePopup from './Toast';
import { GetUserAbout } from "../src/style/redux/HomeFunction"
import isTokenValid from "../src/style/redux/ControlToken"
// import isTokenValid from "../src/style/redux/ControlToken"

function WorkerDashboard() {

    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState("");

    const [active, setActive] = useState('');

    const [modal, setmodal] = useState(false);
    const [id, setid] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.worker.workerjobs)

    const userabout = useSelector((state) => state.home.userabout)


    useEffect(() => {
        dispatch(GetAllWorkerJobList());
    }, [dispatch])


    const handleDelete = (id) => {
        setmodal(true);
        setid(id)
    }



    const handleUpdate = () => {
        alert("Salam")
    }


    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link) => {
        setActiveLink(link);
    };


    const handleCancel = () => {
        setmodal(false);
    }

    const handleDeleteOk = async () => {
        await dispatch(RemoveAdvertisement(id));
        await dispatch(GetAllWorkerJobList());
        setmodal(false);
    }

    const handleChangePassword = async () => {
        // alert("salam")
        await dispatch(GeneratorCode());
        setShowPopup(true);

    }

    useEffect(() => {
        // if (isTokenValid(localStorage.getItem("accessToken")))
        dispatch(GetUserAbout());
    }, [])

    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleUpdateClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Şəkili göstərə bilmək üçün URL yaddaşa verilir
        }
    };

    useEffect(() => {
        const foo = async () => {
            if (popupData.trim() !== "") {
                var result = await dispatch(ConFirmCode(popupData)).unwrap();
                if (result) {
                    navigate("/WorkerDashboard/ChangePasswordPage")
                }

            }
        }
        foo();

    }, [popupData]);

    return (
        <>
            <div className='main-panel'>
                <div className='panel-left'>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    {/* <div className="img-box">
                        <div className="img-box-img">
                            <img className="Image" src={`http://localhost:5156${userabout?.profileImagePath || image}`} alt="" />
                        </div>
                        <img className="Image-update" src={update} alt="" onClick={handleUpdateClick} />
                        <h3 style={{ color: "White" }}>{userabout?.userName + " " + userabout?.surName}</h3>
                    </div> */}

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

                    <div className='Link-btn-box'>
                        <div className={`Link-btn-in ${activeLink === 'profile' ? 'active' : ''}`}>
                            <Link onClick={() => handleClick('profile')}
                            >
                                Profile
                            </Link>
                        </div>
                        <div className={`Link-btn-in ${activeLink === 'advert' ? 'active' : ''}`}>
                            <Link to={'/WorkerDashboard/WorkerMainPage'} onClick={() => handleClick('advert')}
                            >
                                Elanlar
                            </Link>
                        </div>

                        <div className={`Link-btn-in ${activeLink === 'cv' ? 'active' : ''}`}>
                            <Link to={'/WorkerDashboard/AddWorkerAdvert'} onClick={() => handleClick('cv')}
                            >
                                Cv Yerləşdir
                            </Link>
                        </div>

                        <div className={`Link-btn-in ${activeLink === 'password' ? 'active' : ''}`}>
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
                <div className='panel-right'>
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
export default WorkerDashboard
