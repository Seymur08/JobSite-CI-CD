import React, { useEffect } from 'react'
import '../src/style/WaitWorkerTable.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeStatusWorker, GetAllWaitWorkers } from '../src/style/redux/AdminFunctions';

function WaitWorkerTable() {

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
    }

    const Reject = (id) => {
        dispatch(ChangeStatusWorker({ id: id, status: 'No' }))
            .then(() => {
                dispatch(GetAllWaitWorkers());
            });
    }

    console.log("waitallworker")
    console.log(waitallworker)
    console.log("waitallworker")



    const handleItem = (id) => {

        navigate(`/AdminDashboard/WaitingWorkerPage/${id}`)
    }

    return (
        <>
            <div className="container_table_1">
                <div className="header">
                    <h2>Iş Axtaranlar</h2>
                    {/* <div class="actions">
                        <button class="btn export"><i class="icon">📄</i> Export to Excel</button>
                        <button class="btn add"><i class="icon">➕</i> Add New User</button>
                    </div> */}
                </div>

                <table>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Sekil</th>
                            <th>Ad Soyad</th>
                            <th>Yas</th>
                            <th>Ünvan</th>
                            <th>Tarix</th>
                            <th>Kategoriya</th>
                            <th>Tehsil</th>
                            <th>Ətraflı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waitallworker?.map((item) => (
                            <tr key={item.id}>
                                <td className="user">
                                    <img src={`http://localhost:5156${item?.workerDto?.userDto?.profileImagePath}`} alt="none" />

                                </td>

                                <td>{item?.workerDto?.userDto?.userName + " " + item?.workerDto?.userDto?.surName}</td>

                                <td>{item.age}</td>
                                <td>{item.adress}</td>

                                <td>
                                    {new Date(item.createdAt).toLocaleDateString('az-AZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td>{item.section}</td>
                                <td>{item.education}</td>
                                <td>
                                    <span className="action gear" onClick={() => handleItem(item.id)}>➕</span>
                                    {/* <span class="action delete">❌</span> */}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default WaitWorkerTable
