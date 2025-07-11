import React, { useEffect, useState } from 'react'
// import '../src/style/WorkerAdvertDetails.css'
import '../src/style/EmployerAdvertDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetWorkerJobId } from '../src/style/redux/WorkerFunction';
import ChatPage from './ChatPage';
import { jwtDecode } from 'jwt-decode';
import { useUserChat } from './UserChatContext';
import { GetUserAbout } from '../src/style/redux/HomeFunction';
import isTokenValid from '../src/style/redux/ControlToken';


function WorkerAdvertDetails() {

    const [openMessage, setShowChat] = useState(false);
    const { chatData, setUserData } = useUserChat();

    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();
    const worker = useSelector((store) => store.worker.worker)

    const token = localStorage.getItem("accessToken")
    const decoded = jwtDecode(token);
    const userid = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

    console.log(`local id ${localStorage.getItem("WorkerId")}`)
    console.log(`userId  ${localStorage.getItem("userId")}`)
    console.log(`role  ${localStorage.getItem("role")}`)


    useEffect(() => {
        dispatch(GetWorkerJobId(id));

    }, [dispatch, id]);


    useEffect(() => {
        // if (isTokenValid(localStorage.getItem("accessToken")))
        dispatch(GetUserAbout());
    }, [])

    console.log(worker)

    const handleClickMessage = () => {
        setShowChat(true)
    }

    return (
        <>
            <div className='advert-contanier-main'>

                <div className='advert-contanier-about'>
                    {!worker ? (
                        <div>Yüklənir...</div>
                    ) : (
                        <>
                            <div className='advert-contanier-about-left'>
                                <div className="label">Kateqoriya:</div><div className="value">{worker.category}</div>
                                <div className="label">Ad:</div><div className="value">{worker.workerDto.userDto.userName}</div>
                                <div className="label">Soyad:</div><div className="value">{worker.workerDto.userDto.surName}</div>
                                <div className="label">Yas:</div><div className="value">{worker.age}</div>
                                <div className="label">Telefon:</div><div className="value">{worker.phone}</div>
                                <div className="label">Email:</div><div className="value">{worker.email}</div>
                                <div className="label">İş təcrübəsi:</div><div className="value">{worker.workExperience}</div>
                                <div className="label">Təhsil:</div><div className="value">{worker.education}</div>
                                <div className="label">Ünvan:</div><div className="value">{worker.adress}</div>
                                <div className="label">Cinsi:</div><div className="value">{worker.gender}</div>
                                <div className="label">Maas:</div><div className="value">{worker.salary} AZN</div>
                                <div className="label">Elanın yaradılma tarixi:</div>
                                <div className="value">
                                    {new Date(worker.createdAt).toLocaleDateString('az-AZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="label">Son müraciət tarixi:</div>
                                <div className="value">
                                    {new Date(worker.deadlineAt).toLocaleDateString('az-AZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="label">Yenilənmə tarixi:</div><div className="value">{worker.updatedAt ? worker.updatedAt : "- - - -"}</div>
                            </div>
                            <div className='advert-contanier-about-right'>
                                <div className="label-right">Ətraflı</div>
                                <p>{worker.detailed}</p>
                            </div>
                        </>
                    )}

                </div>
                <div className='advert-contanier-complaint'>

                    <button onClick={handleClickMessage}>Muraciyet et</button>

                </div>
            </div >
            {openMessage && (
                <div>
                    <ChatPage
                        onClose={() => setShowChat(false)}
                        receiverId={localStorage.getItem("WorkerId")}
                        userId={localStorage.getItem("userId")}
                        role={localStorage.getItem("role")}

                    />
                </div>
            )
            }
        </>
    )
}

export default WorkerAdvertDetails
