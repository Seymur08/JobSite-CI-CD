
import viteLogo from '/vite.svg'
import '../src/style/WorkerPage.css'
import '../src/style/Admin.css'
import '../src/App'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import viteLogo from '/vite.svg'
// import '../src/App'
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';


function Worker() {

    const [workerdata, setworkerdata] = useState(null);

    useEffect(() => {

        axios.get("http://localhost:5156/api/Admin/GetAllWorkers")
            .then(res => {
                setworkerdata(res.data)
                console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
                console.log(workerdata);
            })
            .catch(error => console.error("Məlumat alınarkən xəta baş verdi: ", error));

    }, []);



    return (
        <>
            <div className='advertising-container-main-worker'>
                <h1>Salam</h1>

                <div className='advertising-container-main-center'>

                    {workerdata?.map(p => (

                        <div key={p.id} className='advertising-container'>
                            <h1>Samal</h1>
                            <a href={`#${p.category}`}>Kategoriya : {p.category}</a>
                            <h5>Sirket : {p.city}</h5>
                            <h5>Əlaqədar şəxs : {p.position}</h5>
                            <h5>İş vaxtı : {p.gender}</h5>
                            <h5>Ünvan : {p.address}</h5>
                            <h5>Mail : {p.email}</h5>
                            <h5>Telefon : {p.phone}</h5>
                            <span style={{ marginLeft: '10px' }}>Əmək haqqı:
                                <h5 style={{
                                    background: '#e2e8f0',
                                    borderRadius: '5px',
                                    border: '1px solid blue',
                                    display: 'inline',
                                    padding: '2px 10px',
                                }} >{p.salary_Min} - {p.salary_Max} Azn</h5></span>
                            <h5>Yaş Min : {p.age_Min}</h5>
                            <h5>Yaş Maks : {p.age_Max}</h5>



                            <button onClick={() => GivePermission(p.id)}>Icaze ver</button>
                            <button onClick={() => Reject(p.id)}>Redd et</button>
                            <button onClick={() => Block(p.id)}>Blokla</button>


                        </div>
                    ))}
                </div>
            </div>



        </>
    );
}

export default Worker;



