import React, { useEffect, useState } from 'react'
import '../src/style/EmployerAdvertDetails.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GetEmployerJobId } from '../src/style/redux/AllFuntions';
import ChatPage from './ChatPage';
import { jwtDecode } from 'jwt-decode';
import { useUserChat } from './UserChatContext';
import { GetUserAbout } from '../src/style/redux/HomeFunction';
import isTokenValid from '../src/style/redux/ControlToken';
// import { useUserChat } from './UserChatContext';


function EmployerAdvertDetails() {

    // const { chatData, closeChat } = useUserChat();

    const { chatData, setUserData } = useUserChat();


    const [openMessage, setShowChat] = useState(false);

    const { id } = useParams();
    const token = localStorage.getItem("accessToken")

    const decoded = jwtDecode(token);

    const userid = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

    const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]

    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    const dispatch = useDispatch();
    const employer = useSelector((store) => store.employer.employer)

    useEffect(() => {
        if (id != null) {
            dispatch(GetEmployerJobId(id));
        }

    }, [dispatch, id]);


    useEffect(() => {
        // if (isTokenValid(localStorage.getItem("accessToken")))
        dispatch(GetUserAbout());
    }, [dispatch])


    const handleClickMessage = () => {
        setShowChat(true)
    }

    if (chatData) {
        console.log("employer employer employer employer ")
        console.log(`useParams: ${id}`)
        console.log(`{chatData.receiverId: ${chatData?.receiverId}`)
        console.log(`{chatData.userId: ${chatData?.userId}`)
        console.log(`{chatData.role: ${chatData?.role}`)
        console.log(`{closeChat: ${chatData.isOpenChat}`)
        console.log(" employer employer employer employer")
    }

    return (
        <>
            <div className='advert-contanier-main'>

                <div className='advert-contanier-about'>
                    <div className='advert-contanier-about-left'>

                        {employer ? (
                            <>
                                <div className="label">Kateqoriya:</div><h3 className="value">{employer.category}</h3>
                                <div className="label">Telefon:</div><div className="value">{employer.phone}</div>
                                <div className="label">Email:</div><div className="value">{employer.email}</div>
                                <div className="label">Şirkət:</div><div className="value">{employer.company}</div>
                                <div className="label">İş təcrübəsi:</div><div className="value">{employer.work_experience}</div>
                                <div className="label">Əlaqədar şəxs:</div><div className="value">{employer.contact_person}</div>
                                <div className="label">İş vaxtı:</div><div className="value">{employer.work_time}</div>
                                <div className="label">İş qrafiki:</div><div className="value">{employer.work_schedule}</div>
                                <div className="label">Ünvan:</div><div className="value">{employer.address}</div>
                                <div className="label">Minimum əməkhaqqı:</div><div className="value">{employer.salary_Min} Azn</div>
                                <div className="label">Maksimum əməkhaqqı:</div><div className="value">{employer.salary_Max} Azn</div>
                                <div className="label">Minimum yaş:</div><div className="value">{employer.age_Min}</div>
                                <div className="label">Maksimum yaş:</div><div className="value">{employer.age_Max}</div>
                                <div className="label">Elanın yaradılma tarixi:</div>
                                <div className="value">
                                    {new Date(employer.createdAt).toLocaleDateString('az-AZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="label">Son müraciət tarixi:</div>
                                <div className="value">
                                    {new Date(employer.deadlineAt).toLocaleDateString('az-AZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="label">Yenilənmə tarixi:</div><div className="value">{employer.updatedAt ? employer.updatedAt : "- - - -"}</div></>
                        ) : "bos"}

                    </div>
                    <div className='advert-contanier-about-right'>
                        <div className="label-right">Tələblər</div>
                        <p>{employer && employer.requirements ? employer.requirements : " "}</p>


                    </div>

                </div>
                <div className='advert-contanier-complaint'>

                    <button onClick={handleClickMessage} >Muraciyet et</button>

                </div>
            </div>
            {openMessage && (
                <div>
                    <ChatPage
                        onClose={() => setShowChat(false)}
                        receiverId={localStorage.getItem("EmployerId")}
                        userId={localStorage.getItem("userId")}
                        role={localStorage.getItem("role")}

                    />
                </div>
            )}
        </>
    )
}

export default EmployerAdvertDetails
