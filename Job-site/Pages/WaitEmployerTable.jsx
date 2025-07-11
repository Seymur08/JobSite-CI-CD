import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllWaitEmployers, GetAllWaitWorkers } from '../src/style/redux/AdminFunctions';

function WaitEmployerTable() {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const allemployers = useSelector((store) => store.admin.employers)

    const waitallemployer = useSelector((state) => state.admin.waitingemployer)

    useEffect(() => {
        if (!allemployers || allemployers.length === 0) {
            dispatch(GetAllWaitEmployers());
        }
    }, [dispatch]);

    const handleItem = (id) => {

        navigate(`/AdminDashboard/WaitingEmployerPage/${id}`)
    }

    return (
        <>
            <div className="container_table_1">
                <div className="header">
                    <h2>Iş Emlanları</h2>

                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Sekil</th>
                            <th>Ad Soyad</th>
                            <th>Şirkət</th>
                            <th>Ünvan</th>
                            <th>Tarix</th>
                            <th>Kategoriya</th>
                            <th>Maas</th>
                            <th>Ətraflı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waitallemployer?.map((item) => (
                            <tr key={item.id}>
                                <td className="user">
                                    <img src={`http://localhost:5156${item?.employerDto?.user?.profileImagePath}`} alt="none" />

                                </td>

                                <td>{item?.employerDto?.user?.userName + " " + item?.employerDto?.user?.surName}</td>

                                <td>{item.company}</td>
                                <td>{item.address}</td>


                                <td>
                                    {new Date(item.createdAt).toLocaleDateString('az-AZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td>{item.section}</td>
                                <td>{item.salary_Min + " / " + item.salary_Max}</td>
                                <td>
                                    <span className="action gear" onClick={() => handleItem(item.id)}>➕</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default WaitEmployerTable
