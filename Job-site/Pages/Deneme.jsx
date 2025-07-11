import "../src/style/Deneme.css"
// import { Link } from 'react-router-dom'
import photo from "../src/Image/photo_1.jpeg"
import update from "../src/icons/refresh-page-option.png"
// import '../src/style/WorkerMainPage.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllWorkerJobList, RemoveAdvertisement } from '../src/style/redux/WorkerFunction';
import image from '../src/icons/delete.png'
import { ConFirmCode, GeneratorCode } from '../src/style/redux/PartnerFunctions';
import AutoClosePopup from './Toast';

function Deneme() {

    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState("");

    const [active, setActive] = useState('');

    const [modal, setmodal] = useState(false);
    const [id, setid] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.worker.workerjobs)




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
        alert("salam")
        await dispatch(GeneratorCode());
        setShowPopup(true);

    }

    useEffect(() => {
        const foo = async () => {
            if (popupData.trim() !== "") {
                var result = await dispatch(ConFirmCode(popupData)).unwrap();
                if (result) {
                    navigate("/ChangePasswordPage")
                }

            }
        }
        foo();

    }, [popupData]);

    return (
        <>
            <div className='main-panel'>
                <div className='panel-left'>

                    <div className="img-box">
                        <div className="img-box-img">
                            <img className="Image" src={photo} alt="" />
                            <img className="Image-update" src={update} alt="" onClick={handleUpdate} />
                        </div>
                        <h3 style={{ color: "White" }}>{workers[0]?.workerDto?.userDto?.userName + " " + workers[0]?.workerDto?.userDto?.surName}</h3>
                    </div>


                    <div className='Link-btn-box'>
                        <div className={`Link-btn-in ${activeLink === 'profile' ? 'active' : ''}`}>
                            <Link onClick={() => handleClick('profile')}
                            >
                                Profile
                            </Link>
                        </div>

                        <div className={`Link-btn-in ${activeLink === 'cv' ? 'active' : ''}`}>
                            <Link to={'/AddWorkerAdvert'} onClick={() => handleClick('cv')}
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

                        <div className={`Link-btn-in ${activeLink === 'asd' ? 'active' : ''}`}>
                            <Link onClick={() => handleClick('asd')}
                            >
                                asdsaasd
                            </Link>
                        </div>
                    </div>


                </div>
                <div className='panel-right'>

                    <div className='contanier-table-box'>
                        <div className='contanier-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Baxış sayı</th>
                                        <th>Ad Soyad</th>
                                        <th>Kategoriya</th>
                                        <th>Status</th>
                                        <th>Email</th>
                                        <th>Əməliyyatlar </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(workers) && workers.length > 0 ? (
                                        workers.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.category}</td>
                                                <td>{item.workerDto.userDto.userName} {item.workerDto.userDto.surName}</td>
                                                <td>{item.category}</td>
                                                <td>
                                                    <span className={`status ${item.status === 1 ? 'confirmed' :
                                                        item.status === 2 ? 'rejected' :
                                                            item.status === 0 ? 'waiting' : 'blocked'}`}>
                                                        {item.status === 1 ? 'Təsdiqlənib' :
                                                            item.status === 2 ? 'Rədd edilib' :
                                                                item.status === 0 ? 'Gözləmədə' : 'Bloklanıb'}
                                                    </span>
                                                </td>

                                                <td>{item.email}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <Link className="btn edit" to={`/EditWorkerPage/${item.id}`}>✏️</Link>
                                                        <div className="btn delete" onClick={() => handleDelete(item.id)}>❌</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px', widows: "auto" }}>
                                                Heç bir işçi tapılmadı.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {modal && (
                                <div className="modal">
                                    <img src={image} alt="Finder Icon" />
                                    <h2>Silmək istədiyinizə əminsiniz <br /> </h2>
                                    <p>Bu element birdefelik silinəcək.<br />Bu əməliyyatı geri qaytara bilməzsiniz.</p>
                                    <div className="buttons">
                                        <button onClick={handleCancel} className="cancel">Leğv et</button>
                                        <button onClick={handleDeleteOk} className="delete">Sil</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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

export default Deneme
