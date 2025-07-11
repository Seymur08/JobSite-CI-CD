
import "../src/style/AdminDashboard.css"
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
import { Dropdown, DropdownItem } from "flowbite-react"
import isTokenValid from "../src/style/redux/ControlToken"

function AdminDashboard() {

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleClick = (link) => {
        setActiveLink(link);
        if (link === 'cv') {
            setIsDropdownOpen(true); // Dropdown açılır
            // window.location.reload();
        }
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



    const handleWaitEmployer = () => {

        navigate("/AdminDashboard/WaitingEmployerPage")
    }



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
                    navigate("/AdminDashboard/ChangePasswordPage")
                }

            }
        }
        foo();

    }, [popupData]);


    return (
        <>
            <div className='mainpanel'>
                <div className='panelleft'>

                    <div className='Linkbtnbox'>

                        <div className={`Linkbtnin ${activeLink === 'main' ? 'active' : ''}`}>
                            <Link onClick={() => handleClick('main')}
                                to="/AdminDashboard"
                            >
                                Əsas səhifə
                            </Link>
                        </div>
                        <div className={`Linkbtnin ${activeLink === 'category' ? 'active' : ''}`}>
                            <Link onClick={() => handleClick('category')}
                                to="/AdminDashboard/AddNewCategory"
                            >
                                Yeni Kategoriya
                            </Link>
                        </div>

                        <div className={`Linkbtnin ${activeLink === 'open_1' ? 'active' : ''}`}>
                            <Link to={'/AdminDashboard/WaitWorkerTable'} onClick={() => handleClick('open_1')}
                            >
                                Iş Axtaranlar
                            </Link>
                        </div>

                        <div className={`Linkbtnin ${activeLink === 'open_2' ? 'active' : ''}`}>
                            <Link to={'/AdminDashboard/WaitEmployerTable'} onClick={() => handleClick('open_2')}
                            >
                                İş Elanları
                            </Link>
                        </div>

                        <div className={`Linkbtnin ${activeLink === 'password' ? 'active' : ''}`}>
                            <Link onClick={() => {
                                handleClick('password');
                                handleChangePassword();
                            }}
                            >
                                Şifre dəyişdirin
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

export default AdminDashboard
