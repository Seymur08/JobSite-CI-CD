import React, { useEffect, useState } from 'react'
// import '../src/style/EmployerMainPage.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllEmployerJobList, RemoveAdvertisementEmp } from '../src/style/redux/EmployerFuntion';
import { ConFirmCode, GeneratorCode } from '../src/style/redux/PartnerFunctions';
import AutoClosePopup from './Toast';
// import { useSignalR } from '../src/style/SignalR/SignalRProvider';
import image from '../src/icons/delete.png'
// import { RemoveAdvertisement } from '../src/style/redux/WorkerFunction';

function EmployerMainPage() {

    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState("");

    const navigate = useNavigate();
    const [modal, setmodal] = useState(false);
    const [id, setid] = useState("");

    const dispatch = useDispatch();
    const employers = useSelector((state) => state.employer.employers)
    useEffect(() => {
        dispatch(GetAllEmployerJobList());
    }, [dispatch])

    const handleDelete = (id) => {
        setmodal(true);
        setid(id)
    }


    const handleCancel = () => {
        setmodal(false);
    }

    const handleDeleteOk = async () => {
        await dispatch(RemoveAdvertisementEmp(id));
        await dispatch(GetAllEmployerJobList());
        setmodal(false);
    }

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
            {/* <div className='contanier-head'>
                <Link className='contanier-head-link' to={'/AddWorkerAdvert'}>Cv Yerlasdir</Link>
                <Link className='contanier-head-link' onClick={handleChangePassword}>Şifre değiştir</Link>
            </div> */}
            <div className='contanier-table-box'>
                <div className='contanier-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Baxis sayi</th>
                                <th>Sirket</th>
                                <th>Kategoriya</th>
                                <th>Status</th>
                                <th>Email</th>
                                <th>Əməliyyatlar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(employers) && employers.length > 0 ? (
                                employers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.view_Count}</td>
                                        <td>{item.company}</td>
                                        <td>{item.section}</td>
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
                                                <Link className="btn edit" to={`/EmployerDashboard/EditEmployerPage/${item.id}`}>✏️</Link>
                                                <div className="btn delete" onClick={() => handleDelete(item.id)}>❌</div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        Heç bir elan tapılmadı.
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

export default EmployerMainPage
