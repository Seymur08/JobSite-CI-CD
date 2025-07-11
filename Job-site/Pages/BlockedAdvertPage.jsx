import React, { useEffect } from 'react'
import '../src/style/WaitingPage.css'
import { data, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllBlokedEmployer, GetAllBlokedWorker } from '../src/style/redux/AdminFunctions';


function BlockedAdvertPage() {
    const dispatch = useDispatch();
    const allblockworkers = useSelector((state) => state.admin.allblockworker)

    const allblockemployers = useSelector((state) => state.admin.allblockemployers)

    // useEffect(() => {
    //     if (!allblockworkers) {
    //         dispatch(GetAllBlokedWorker());
    //     }
    //     if (!allblockemployers) {
    //         dispatch(GetAllBlokedEmployer());
    //     }
    // }, [dispatch])


    // console.log(allblockworkers.length)
    // console.log(allblockemployers.length)
    // console.log(employer.length)


    return (
        <div className='Waiting-Page'>
            <h1 id='text'>Blok Olanlar</h1>
            <div className='Waiting-Page-in'>
                <div className='Waiting-Page-Employer'>
                    <Link to="/WaitingEmployerPage"><h1>Is elanlari</h1></Link>
                    <h2>{allblockworkers}</h2>
                </div>
                <div className='Waiting-Page-Worker'>
                    <Link to="/WaitingWorkerPage"> <h1>Is Axtaranlar</h1></Link>
                    <h2>{allblockemployers}</h2>
                </div>
            </div>
        </div>
    )
}

export default BlockedAdvertPage
