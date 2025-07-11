import React, { useEffect } from 'react'
import '../src/style/WaitingPage.css'
import { data, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function WaitingPage() {

    const worker = useSelector((state) => state.admin.waitingworker)

    const employer = useSelector((state) => state.admin.waitingemployer)

    // const dispatch = useDispatch();



    // useEffect(() => {
    //     if (!worker) {
    //         dispatch(GetAllBlokedWorker());

    //     }
    //     if (!employer) {
    //         dispatch(GetAllBlokedWorker());

    //     }
    // }, [dispatch])



    console.log(worker.length)
    console.log(employer.length)


    return (
        <div className='Waiting-Page'>
            <h1 id='text'>Gözləyənlər</h1>
            <div className='Waiting-Page-in'>
                <div className='Waiting-Page-Employer'>
                    <Link to="/WaitingEmployerPage"><h1>Is elanlari</h1></Link>
                    <h2>{employer.length}</h2>
                </div>
                <div className='Waiting-Page-Worker'>
                    <Link to="/WaitingWorkerPage"> <h1>Is Axtaranlar</h1></Link>
                    <h2>{worker.length}</h2>
                </div>
            </div>
        </div>
    )
}

export default WaitingPage
