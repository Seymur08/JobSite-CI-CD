import React, { useEffect, useRef, useState } from 'react'

import '../src/style/AddWorkerAdvert.css'
import { useDispatch, useSelector } from 'react-redux';
// import { AddNewAdvertWorker } from '../src/style/redux/AllFuntions';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllCategoryWorker } from '../src/style/redux/AdminFunctions';
// import { AddNewAdvertWorker } from '../src/style/redux/AllFuntions';
// import { AddNewAdvertWorker, GetAllCategory } from '../src/style/redux/AllFuntions';
import data from '../public/WorkExperience.json';
import age from '../public/Age.json';
import salary from '../public/Salary.json';
import Cities from '../public/Cities.json';
import Education from '../public/Education.json';

import { AddNewWorkerAdvert } from '../src/style/redux/WorkerFunction';

function AddWorkerAdvert() {

    const navigate = useNavigate();
    const [selected, setSelected] = useState("");
    const AddressRef = useRef();
    const CategoryRef = useRef();
    const WorkExperienceRef = useRef();
    const EducationRef = useRef();
    const SalaryRef = useRef();
    const PhoneRef = useRef();
    const EmailRef = useRef();
    const GenderRef = useRef();
    const DetailedRef = useRef();
    const AgeRef = useRef();


    const [formData, setFormData] = useState({
        Adress: '',
        Category: '',
        Section: '',
        WorkExperience: '',
        Education: '',
        Salary: '',
        Phone: '',
        Email: '',
        Gender: '',
        Detailed: '',
        Age: ''


    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const allcategories = useSelector((store) => store.admin?.categoryWorker)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllCategoryWorker());
    }, []);

    const HandleFormSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(AddNewWorkerAdvert(formData));

        navigate('/WorkerDashboard/WorkerMainPage')


        if (AddNewWorkerAdvert.rejected.match(result)) {
            console.log("Əlavə etmək uğursuz oldu");
        } else {
            console.log("Uğurla əlavə olundu");
        }

    }

    console.log(formData)

    const handleSelectChange = (e) => {
        const selectedSection = e.target.value;
        const category = e.target.selectedOptions[0].dataset.category;
        formData.Category = category;
        formData.Section = selectedSection;
        setSelected(selectedSection)
    };


    return (
        <>
            <div className='advert-main'>
                <div className='advert-main-center'>
                    <form onSubmit={HandleFormSubmit}>
                        <div className='advert-main-center-left'>
                            <h3 style={{ color: "#00aaff" }} id='text-word'>Cv yerleştir</h3>

                            <select id="category" value={selected} onChange={handleSelectChange} required>
                                <option value="">Seçim edin</option>
                                {allcategories?.map((s, index) => (
                                    <optgroup key={index} label={s.category}>
                                        {s?.section?.map((sub, idx) => (
                                            <option key={idx} value={sub.section} data-category={s.category}>
                                                {sub.section}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <input id='input'
                                type="tel"
                                name="Phone"
                                value={formData.Phone}
                                onChange={handleChange}
                                placeholder="Tel"
                                required
                            />
                            <input id='input'
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />

                            <div className='select-gender'>

                                <select
                                    name="Education"
                                    value={formData.Education}
                                    onChange={handleChange}
                                    placeholder="Education"
                                    required>
                                    <option value="" disabled> Təhsil</option>
                                    {Education.map((option) => (
                                        <option key={option.id} value={option.tehsil}>
                                            {option.tehsil}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='select-gender'>

                                <select
                                    name="WorkExperience"
                                    value={formData.WorkExperience}
                                    onChange={handleChange}
                                    placeholder="WorkExperience"
                                    required>
                                    <option value="" disabled> İş təcrübəsi</option>
                                    {data.map((option, index) => (
                                        <option key={index} value={option.work}>
                                            {option.work}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='select-gender'>

                                <select
                                    name="Adress"
                                    value={formData.Adress}
                                    onChange={handleChange}
                                    placeholder="Ünvan"
                                    required>
                                    <option value="" disabled>Ünvan</option>
                                    {Cities.map((c, index) => (

                                        <option key={index} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div className='select-gender'>
                                <select
                                    name="Gender"
                                    value={formData.Gender}
                                    onChange={handleChange}
                                    required>
                                    <option value="" disabled>Seçin</option>
                                    <option value="Kişi">Kişi</option>
                                    <option value="Qadin">Qadın</option>
                                </select>
                            </div>

                            <div className='select-salary'>
                                <h4>Maas</h4>
                                <select
                                    name="Salary"
                                    value={formData.Salary}
                                    onChange={handleChange}
                                    required>
                                    {salary.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
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
                            <h2 style={{ color: "#00aaff" }} id='Telebler'>Ətraflı</h2>
                            <textarea
                                id="textarea-right"
                                name="Detailed"
                                value={formData.Detailed}
                                onChange={handleChange}
                                required></textarea>
                            <button type='submit' id="form-button">Əlavə edin</button>
                        </div>
                    </form>

                </div >

            </div >
        </>
    )
}

export default AddWorkerAdvert
