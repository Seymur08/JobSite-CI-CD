import React, { useEffect } from 'react'
// import { GetAllEmployers } from '../src/style/redux/functions';
import { useDispatch, useSelector } from 'react-redux';
// import { GetAllWorkers } from '../src/style/redux/AdminSlice';
import '../src/style/WaitingWorkerPage.css';
import { ChangeStatusWorker, GetAllWaitWorkers } from '../src/style/redux/AdminFunctions';
import { Link, useNavigate, useParams } from 'react-router-dom';


function WaitingWorkerPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // const allworkers = useSelector((store) => store.admin.workers)

    const waitallworker = useSelector((state) => state.admin.waitingworker)



    useEffect(() => {
        dispatch(GetAllWaitWorkers());
    }, [dispatch]);


    const GivePermission = (id) => {
        // dispatch(ChangeStatusEmployer({ id: id, status: "Ok" }));
        dispatch(ChangeStatusWorker({ id: id, status: 'Ok' }))
            .then(() => {
                dispatch(GetAllWaitWorkers()); // Yenidən yüklə
            });
        navigate('/AdminDashboard/WaitWorkerTable')
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

    const worker = waitallworker?.find(item => item.id === id)


    // console.log(id)
    console.log(worker)
    // console.log(worker.adress)
    // console.log(worker.category)




    // const HandleId = (id) => {
    //     console.log(id)
    //     console.log(id)
    //     console.log(id)
    //     console.log(id)
    //     console.log(id)
    //     console.log(id)
    //     console.log(id)
    //     console.log(id)
    //     navigate(`/WorkerAdvertDetails/${p.id}`)
    // }


    return (
        <>
            {/* <div className='container'> */}
            {/* <button onClick={() => handleEmployer()}>Redd et</button> */}
            {/* 
                <div className='title'>
                    <h1>Is Axtaranlar</h1>
                </div> */}
            {/* <div className='advertising-container-main'>

            </div> */}

            <div className='advertising-container-main-center_1'>

                {/* <h1>adssdasdad</h1> */}

                <div className='advertising-container_1'>
                    <div className='advertising-container-worker-left'>
                        <div className='advertising-container-worker-left-up'>
                            <img src={`http://localhost:5156${worker?.workerDto?.userDto?.profileImagePath}`} alt="none" />
                        </div>
                        <div className='advertising-container-worker-left-down'>
                            <h5>Ad : {worker?.workerDto?.userDto?.userName}</h5>
                            <h5>Soyad : {worker?.workerDto?.userDto?.surName}</h5>
                            <h5>Bolum : {worker?.section}</h5>
                            <h5>Ünvan : {worker?.adress}</h5>
                            <h5>Iş təcrübəsi : {worker?.workExperience}</h5>
                            <h5>Yas: {worker?.age}</h5>
                            <h5>Tehsil : {worker?.education}</h5>
                            <h5>Cinsi : {worker?.gender}</h5>
                            <h5>Mail : {worker?.email}</h5>
                            <h5>Telefon : {worker?.phone}</h5>
                            <h5>Əmək haqqı: {worker?.salary} Azn</h5>
                        </div>

                    </div>

                    <div className='advertising-container-worker-right'>
                        <textarea className='textarea_1'
                            readOnly
                            defaultValue={worker?.detailed}

                        />
                        <div className='advertising-container-button'>
                            <button onClick={() => GivePermission(worker?.id)}>Icaze ver</button>
                            <button onClick={() => Reject(worker?.id)}>Redd et</button>
                        </div>
                    </div>
                </div>

            </div>

            {/* </div> */}
        </>
    )
}

export default WaitingWorkerPage
