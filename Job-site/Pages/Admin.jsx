import viteLogo from '/vite.svg'
import '../src/App'
import '../src/style/Admin.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshControl } from './ControRefrechlToken';
import { useDispatch, useSelector } from 'react-redux';
import store from '../src/style/redux/store';


function Admin() {

    const [setemployer, setEmployer] = useState(false);
    const [workerData, setWorkerData] = useState(null);

    const [setworker, setWorker] = useState(false);
    const [employerData, setEmployerData] = useState(null);


    localStorage.setItem("oneOk", JSON.stringify(true));
    localStorage.setItem("twoOk", JSON.stringify(true));
    const navigate = useNavigate();

    const handleWorker = (e) => {
        e.preventDefault();
        setWorker(true);
        navigate('/Worker')

    }

    useEffect(() => {
        let oneOk = JSON.parse(localStorage.getItem("oneOk"));

        const cehcktoken = async () => {
            let token = localStorage.getItem("Token");
            if (isTokenValid(token) && oneOk) {
                console.log("Token keçərlidir.");
                localStorage.setItem("oneOk", JSON.stringify(false));
                navigate('/Admin');
            }
            else {
                let twoOk = JSON.parse(localStorage.getItem("oneOk"));

                if (!isTokenValid(token) && twoOk) {
                    const a = await refreshControl();
                }

                let token_2 = localStorage.getItem("Token");
                if (isTokenValid(token_2) && twoOk) {
                    console.log("Token hələ də keçərlidir.");
                    localStorage.setItem("twoOk", JSON.stringify(false));
                    navigate('/Admin');
                }
                else {
                    console.log("Token Artik keçərsizdir.");
                    navigate('/AdminLogin');
                }

            }
        };
        cehcktoken();

    }, [navigate])




    const dispatch = useDispatch();
    const allemployers = useSelector((store) => store.admin.employers)


    const handleEmployer = async () => {
        // dispatch(GetAllEmployers)

    };





    // const allCategory = useSelector((store) => store.admin.category)
    // const handleChangeCategory = async () => {

    //     dispatch(GetAllCategory())

    //     console.log(allCategory)

    // }


    useEffect(() => {
        if (setworker) {

            axios.get("http://localhost:5156/api/Admin/GetAllWorkers")
                .then(res => setWorkerData(res.data))
                .catch(error => console.error("Məlumat alınarkən xəta baş verdi: ", error));
        }
        // console.log("BBBBBBBBBBBBBBBBBBBBBBBB");

    }, [setworker]);



    const [ChangePassword, setFormData] = useState({
        oldpassword: '',
        newpassword: '',
    });

    const handleChangePassword = (e) => {
        setFormData({
            ...ChangePassword,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmitPassword = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5156/api/Admin/ChangePassword", ChangePassword,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => setWorkerData(res.data))
            .catch(error => console.error("Məlumat alınarkən xəta baş verdi: ", error));
        console.log(typeof ChangePassword);

        setFormData({
            oldpassword: '',
            newpassword: ''
        });
    }

    const [category, setCategory] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5156/api/Admin/AddNewCategory', { category },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Serverdən cavab:', response.data);
                alert('Uğurla göndərildi!');
            })
            .catch(error => {
                console.error('Xəta:', error);
                alert('Xəta baş verdi!');
            });
    };

    const handleChange = (e) => {
        setCategory(e.target.value)
    }



    const GivePermission = (id) => {
        ChangeStatus(id, 'Ok')
    }


    const Reject = (id) => {
        ChangeStatus(id, 'No')
    }






    const Block = (id) => {
        axios.post("http://localhost:5156/api/Employer/ChangeBlock", {
            status: 'True',
            id: id
        })
            .then(res => {
                console.log("Serverdən cavab: ", res.data);
                setEmployerData(prevData => prevData.filter(product => product.id !== id));
            })
            .catch(error => console.error("Məlumat alınarkən xəta baş verdi: ", error));
    }

    // setEmployerData(prevData => prevData.filter(product => product.id !== id));

    const ChangeStatus = (id, st) => {

        axios.post("http://localhost:5156/api/Employer/ChangeStatus", {
            status: st,
            id: id
        })
            .then(res => {
                console.log("Serverdən cavab: ", res.data);
                setEmployerData(prevData => prevData.filter(product => product.id !== id));
            })
            .catch(error => console.error("Məlumat alınarkən xəta baş verdi: ", error));
    };

    return (
        <>
            <div className='Admin-page'>
                <div className='Admin-page-in-section'>
                    <form onSubmit={handleSubmit}>
                        <div className='Admin-page-in-section-div'>
                            <select
                                id="city"
                                name="city"
                                //value={allCategory}
                                //onChange={handleChangeCategory}
                                required>
                                <option value=""></option>
                                {/* {cities.map(city => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))} */}
                            </select>

                            <input
                                type="text"
                                name="email"
                                value={category}
                                onChange={handleChange}
                                placeholder="Kategoriya"
                                required
                            />
                        </div>

                        <button type='submit'>Kateqoriya əlavə edin</button>
                    </form>
                </div>

                <div className='Admin-page-in-section-btn'>
                    <form onSubmit={handleSubmitPassword}>
                        <div className='Admin-page-in-section-btn-div'>
                            <input
                                type="text"
                                name="oldpassword"
                                value={ChangePassword.oldpassword}
                                onChange={handleChangePassword}
                                placeholder="Kohne Sifre"
                                required
                            />
                            <input
                                type="text"
                                name="newpassword"
                                value={ChangePassword.newpassword}
                                onChange={handleChangePassword}
                                placeholder="Yeni Sifre"
                                required
                            />
                        </div>
                        <button type='submit'>Şifrəni dəyişdirin.</button>
                    </form>
                    <button onClick={handleEmployer}>İş elanları </button>
                    <button onClick={handleWorker}>İş axtaranlar</button>
                </div>

            </div>


            <div className='advertising-container-main'>

                <div className='advertising-container-main-center'>
                    {allemployers?.map(p => (
                        <div key={p.id} className='advertising-container'>
                            <a href={`#${p.category}`}>{p.category}</a>
                            <h5>Sirket : {p.company}</h5>
                            <h5>Iş təcrübəsi : {p.work_experience}</h5>
                            <h5>Əlaqədar şəxs : {p.contact_person}</h5>
                            <h5>İş vaxtı : {p.work_time}</h5>
                            <h5>İş qrafiki : {p.work_schedule}</h5>
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

export default Admin;
