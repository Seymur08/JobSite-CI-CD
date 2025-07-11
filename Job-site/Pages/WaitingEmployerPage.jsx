import '../src/style/WaitingEmployer.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../src/style/redux/store';
// import { ChangeStatusEmployer } from '../src/style/redux/AllFuntions';
import { ChangeStatusEmployer, GetAllWaitEmployers } from '../src/style/redux/AdminFunctions';
import { useNavigate, useParams } from 'react-router-dom';
// import { GetAllEmployers } from '../src/style/redux/functions';
// import { GetAllEmployers } from '../src/style/redux/functions';

function WaitingEmployerPage() {

    // const { id } = useParams();

    // console.log(id)

    // const dispatch = useDispatch();

    // const allemployers = useSelector((store) => store.admin.employers)

    // const waitallemployer = useSelector((state) => state.admin.waitingemployer)

    // useEffect(() => {
    //     if (!allemployers || allemployers.length === 0) {
    //         dispatch(GetAllWaitEmployers());
    //     }
    // }, [dispatch]);

    // const GivePermission = (id) => {

    //     // dispatch(ChangeStatusEmployer({ id: id, status: "Ok" }));
    //     dispatch(ChangeStatusEmployer({ id: id, status: 'Ok' }))
    //         .then(() => {
    //             dispatch(GetAllWaitEmployers()); // Yenidən yüklə
    //         });
    // }


    // const Reject = (id) => {
    //     dispatch(ChangeStatusEmployer({ id: id, status: 'No' }))
    //         .then(() => {
    //             dispatch(GetAllWaitEmployers());
    //         });

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // const allworkers = useSelector((store) => store.admin.workers)

    const waitallemployer = useSelector((state) => state.admin.waitingemployer)



    useEffect(() => {
        dispatch(GetAllWaitEmployers());
    }, [dispatch]);

    const employer = waitallemployer?.find(item => item.id === id)


    console.log(employer)

    const GivePermission = (id) => {
        // dispatch(ChangeStatusEmployer({ id: id, status: "Ok" }));
        dispatch(ChangeStatusEmployer({ id: id, status: 'Ok' }))
            .then(() => {
                dispatch(GetAllWaitEmployers()); // Yenidən yüklə
            });
        navigate('/AdminDashboard/WaitEmployerTable')
    }

    const Reject = (id) => {
        dispatch(ChangeStatusWorker({ id: id, status: 'No' }))
            .then(() => {
                dispatch(GetAllWaitWorkers());
            });
    }

    // console.log("waitallworker")
    // console.log(waitallworker)
    // console.log("waitallworker")



    console.log(waitallemployer)
    return (
        // <div className='container-employer_1'>

        <section className='advertising-container-main-center'>
            {/* {waitallemployer?.map((p, index) => ( */}
            <div className='advertising-container'>

                <div className='advertising-container-employer-left'>
                    <div className='advertising-container-employer-left-up'>
                        <img src={`http://localhost:5156${employer?.employerDto?.user?.profileImagePath}`} alt="none" />
                    </div>
                    <div className='advertising-container-employer-left-down'>
                        <h5>Ad : {employer?.employerDto?.user?.userName}</h5>
                        <h5>Soyad : {employer?.employerDto?.user?.surName}</h5>
                        <h5>Sirket : {employer?.section}</h5>
                        <h5>Sirket : {employer?.company}</h5>
                        <h5>Iş təcrübəsi : {employer?.work_experience}</h5>
                        <h5>Əlaqədar şəxs : {employer?.contact_person}</h5>
                        <h5>İş vaxtı : {employer?.work_time}</h5>
                        <h5>İş qrafiki : {employer?.work_schedule}</h5>
                        <h5>Ünvan : {employer?.address}</h5>
                        <h5>Mail : {employer?.email}</h5>
                        <h5>Telefon : {employer?.phone}</h5>
                        <h5>Əmək haqqı: {employer?.salary_Min} - {employer?.salary_Max} Azn</h5>
                    </div>

                </div>

                <div className='advertising-container-employer-right'>
                    <textarea className='textarea_2'
                        readOnly
                        defaultValue={employer?.requirements}

                    />
                    <div className='advertising-container-button'>
                        <button onClick={() => GivePermission(employer?.id)}>Icaze ver</button>
                        <button onClick={() => Reject(employer?.id)}>Redd et</button>
                    </div>
                </div>
                {/* <a href={`#${p.category}`}>{p.category}</a>
                    <h5>Sirket : {p.section}</h5>
                    <h5>Sirket : {p.company}</h5>
                    <h5>Iş təcrübəsi : {p.work_experience}</h5>
                    <h5>Əlaqədar şəxs : {p.contact_person}</h5>
                    <h5>İş vaxtı : {p.work_time}</h5>
                    <h5>İş qrafiki : {p.work_schedule}</h5>
                    <h5>Ünvan : {p.address}</h5>
                    <h5>Mail : {p.email}</h5>
                    <h5>Telefon : {p.phone}</h5>
                    <h5>Əmək haqqı: {p.salary_Min} - {p.salary_Max} Azn</h5>
                    <textarea
                        readOnly
                        defaultValue={p.requirements}
                        style={{
                            resize: "both",
                            overflow: "auto",
                            width: "100%",
                            minHeight: "100px",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                        }}
                    />
                    <h5>Yaş Min : {p.age_Min}</h5>
                    <h5>Yaş Maks : {p.age_Max}</h5>

                    <div className='advertising-container-button'>
                        <button onClick={() => GivePermission(p.id)}>Icaze ver</button>
                        <button onClick={() => Reject(p.id)}>Redd et</button>
                    </div> */}
            </div>
            {/* ))} */}
        </section>


        // </div >
    )
}

export default WaitingEmployerPage
