import React, { useEffect, useState } from 'react'

import '../src/style/AddWorkerAdvert.css'
import { useDispatch, useSelector } from 'react-redux';
// import { AddNewAdvertWorker } from '../src/style/redux/AllFuntions';
import { Link, useParams } from 'react-router-dom';
// import { GetAllCategory } from '../src/style/redux/AdminFunctions';
// import { UpdateWorkerjob } from '../src/style/redux/AllFuntions';
// import { AddNewAdvertWorker, GetAllCategory } from '../src/style/redux/AllFuntions';
import data from '../public/WorkExperience.json';
import age from '../public/Age.json';
import salary from '../public/Salary.json';
import { UpdateWorkerjob } from '../src/style/redux/WorkerFunction';



function AddWorkerAdvert() {

    const { id } = useParams();

    const workers = useSelector((state) => state.worker.workerjobs)

    const worker = workers.find((w) => w.id == id);

    // const emploworkeryer = Array.isArray(workers) ? workers.find(e => e.id === id) : null;


    // console.log(emploworkeryer)

    const [selected, setSelected] = useState("");


    const [formData, setFormData] = useState({
        Adress: '',
        WorkExperience: '',
        Education: '',
        Salary: '',
        Phone: '',
        Email: '',
        Gender: '',
        Detailed: '',

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const allcategories = useSelector((store) => store.admin.categoryWorker)
    const dispatch = useDispatch();

    useEffect(() => {
        if (worker) {
            setFormData({
                Id: worker.id || '',
                Adress: worker.adress || '',
                WorkExperience: worker.workExperience || '',
                Education: worker.education || '',
                Salary: worker.salary || '',
                Phone: worker.phone || '',
                Email: worker.email || '',
                Detailed: worker.detailed || '',
                Age: worker.age || ''
            });
        }
    }, [worker]);

    const HandleFormSubmit = (e) => {
        e.preventDefault();

        dispatch(UpdateWorkerjob(formData));

    }



    console.log(formData)


    return (
        <>

            {/* <div className='advert-main-head'>
                <h1 id='text-word'>Cv yerleştir</h1>
                <Link className='advert-main-head-button' to={"/AddEmployerAdvert"} >Elan Yerlestir</Link>
            </div> */}
            <div className='advert-main'>
                <div className='advert-main-center'>
                    <form onSubmit={HandleFormSubmit}>
                        <div className='advert-main-center-left'>
                            <h1 style={{ color: "#d5dbde" }}>{worker?.category}</h1>
                            <input
                                type="tel"
                                name="Phone"
                                value={formData.Phone}
                                onChange={handleChange}
                                placeholder="Tel"
                                required
                            />
                            <input
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text"
                                name="Education"
                                value={formData.Education}
                                onChange={handleChange}
                                placeholder="Təhsil"
                                required
                            />
                            {/* <input
                                type="text"
                                name="WorkExperience"
                                value={formData.WorkExperience}
                                onChange={handleChange}
                                placeholder="İş təcrübəsi"
                                required
                            /> */}
                            <div className='select-gender'>

                                <select
                                    name="WorkExperience"
                                    value={formData.WorkExperience}
                                    onChange={handleChange}
                                    required>
                                    {data.map((option, index) => (
                                        <option key={index} value={option.work}>
                                            {option.work}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <input
                                type="text"
                                name="Address"
                                value={formData.Adress}
                                onChange={handleChange}
                                placeholder="Ünvan"
                                required
                            />

                            <div className='select-salary'>
                                <h4>Maas</h4>
                                <select
                                    name="Salary"
                                    value={formData.Salary}
                                    onChange={handleChange}
                                    required>
                                    {salary.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='select-age'>
                                <h4>Yas</h4>
                                <select
                                    name="Age"
                                    value={formData.Age}
                                    onChange={handleChange}
                                    required>
                                    {age.map((option, index) => (
                                        <option key={index} value={option.age}>
                                            {option.age}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div className='advert-main-center-right'>
                            <div id='Telebler'>Ətraflı</div>
                            <textarea
                                id="textarea-right"
                                name="Detailed"
                                value={formData.Detailed}
                                onChange={handleChange}
                                required></textarea>
                            <button type='submit' id="form-button">Yadda Saxla</button>
                        </div>
                    </form>

                </div >

            </div >
        </>
    )
}

export default AddWorkerAdvert
