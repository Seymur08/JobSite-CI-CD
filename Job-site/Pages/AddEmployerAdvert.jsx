

import '../src/style/AddEmployerAdvert.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllCategoryEmployer } from '../src/style/redux/AdminFunctions';
import data from '../src/data/WorkExperience.json';
import age from '../src/data/Age.json';
import salary from '../src/data/Salary.json';
import Work_schedule from '../src/data/Work_schedule.json';
import city from '../src/data/Cities.json'

import { AddNewAdvert } from '../src/style/redux/EmployerFuntion';

function AddEmployerAdvert() {

    const [selected, setSelected] = useState("");
    const [start_Time, setstartTime] = useState("");
    const [end_time, setEndtime] = useState("");

    const navigate = useNavigate()


    const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18);

    // const salaryOptions = Array.from({ length: 2500 }, (_, i) => i + 300);
    const salaryOptions = Array.from(
        { length: Math.floor((2500 - 300) / 100) + 1 },
        (_, i) => 300 + i * 100
    );


    const [formData, setFormData] = useState({
        Category: '',
        Section: '',
        Phone: '',
        Email: '',
        Company: '',
        Work_experience: '',
        Contact_person: '',
        Work_time: '',
        Work_schedule: '',
        Requirements: '',
        Address: '',
        Salary_Min: '',
        Salary_Max: '',
        Age_Min: '',
        Age_Max: '',

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
        formData.Work_time = " start_Time + end_time"
    };

    const allcategories = useSelector((store) => store.admin?.categoryEmployer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllCategoryEmployer());
    }, [dispatch]);

    console.log(formData);

    const HandleFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(AddNewAdvert(formData));
        navigate('/EmployerDashboard/EmployerMainPage')

    }

    const handleSelectChange = (e) => {
        const selectedSection = e.target.value;
        const category = e.target.selectedOptions[0].dataset.category;
        formData.Category = category;
        formData.Section = selectedSection;
        setSelected(selectedSection)
    };

    const handlestartTime = (e) => {
        const value = e.target.value;
        setstartTime(value);
        if (value && end_time) {
            setFormData((prev) => ({
                ...prev,
                Work_time: `${value} - ${end_time}`,
            }));
        }
    };

    const handleEndtime = (e) => {
        const value = e.target.value;
        setEndtime(value);
        if (start_Time && value) {
            setFormData((prev) => ({
                ...prev,
                Work_time: `${start_Time} - ${value}`,
            }));
        }
    };


    console.log("allcategories")
    console.log(allcategories)
    console.log("allcategories")

    return (
        <>
            <div className='advertmain'>
                <div className='advertmaincenter'>
                    <form className='Form' onSubmit={HandleFormSubmit}>
                        <div className='advertmaincenterleft'>
                            <h3 style={{ color: "#00aaff" }} id='textword'>İş elan yerleştir</h3>
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
                            <input id='input'
                                type="text"
                                name="Company"
                                value={formData.Company}
                                onChange={handleChange}
                                placeholder="Sirket"
                                required
                            />

                            <select id="category"
                                name="Work_experience"
                                value={formData.Work_experience}
                                onChange={handleChange}
                                placeholder="Work_experience"
                                required>
                                <option value="" disabled selected> İş təcrübəsi</option>
                                {data.map((option, index) => (
                                    <option key={index} value={option.work}>
                                        {option.work}
                                    </option>
                                ))}
                            </select>
                            <input id='input'
                                type="text"
                                name="Contact_person"
                                value={formData.Contact_person}
                                onChange={handleChange}
                                placeholder="Əlaqədar şəxs"
                                required
                            />

                            <select id="category"
                                name="Work_schedule"
                                value={formData.Work_schedule}
                                onChange={handleChange}
                                placeholder="Work_schedule"
                                required>
                                <option value="" disabled selected> İş qrafiki</option>
                                {Work_schedule.map((option) => (
                                    <option key={option.id} value={option.isQrafiki}>
                                        {option.isQrafiki}
                                    </option>
                                ))}
                            </select>
                            <select id="category"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                placeholder="Ünvan"
                                required>
                                <option value="" disabled selected>Ünvan</option>
                                {city.map((option) => (
                                    <option key={option.id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>

                            <div className='selected'>
                                <div className='selected-in'>
                                    <div>Maaş</div>
                                    <div>Min</div>
                                </div>
                                <select
                                    name="Salary_Min"
                                    value={formData.Salary_Min}
                                    onChange={handleChange}
                                    required>
                                    {salary.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div>Max</div>
                                <select

                                    name="Salary_Max"
                                    value={formData.Salary_Max}
                                    onChange={handleChange}
                                    required>
                                    {salary.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='selected'>
                                <div className='selected-in'>
                                    <div>İş vaxti</div>
                                    <div>Min</div>
                                </div>
                                <select
                                    name="Work_time"
                                    value={start_Time}
                                    onChange={handlestartTime}
                                    required>
                                    {Work_time.map((option) => (
                                        <option key={option.id} value={option.isBaslamaSaati}>
                                            {option.isBaslamaSaati}
                                        </option>
                                    ))}
                                </select>
                                <div>Max</div>
                                <select
                                    name="Work_time"
                                    value={end_time}
                                    onChange={handleEndtime}
                                    required>
                                    {Work_time.map((option) => (
                                        <option key={option.id} value={option.isBaslamaSaati}>
                                            {option.isBaslamaSaati}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* <h3>Yas</h3> */}
                            <div className='selected'>
                                <div className='selected-in'>
                                    <div>Yaş</div>
                                    <div>Min</div>
                                </div>
                                <select
                                    name="Age_Min"
                                    value={formData.Age_Min}
                                    onChange={handleChange}
                                    required>
                                    {age.map((option, index) => (
                                        <option key={index} value={option.age}>
                                            {option.age}
                                        </option>
                                    ))}
                                </select>
                                <div>Max</div>
                                <select
                                    name="Age_Max"
                                    value={formData.Age_Max}
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
                        <div className='advertmaincenterright'>
                            <h2 style={{ color: "#00aaff" }} id='Telebler'>Tələblər</h2>
                            <textarea
                                id="textarearight"
                                name="Requirements"
                                value={formData.Requirements}
                                onChange={handleChange}
                                required></textarea>
                            <button type='submit' id="formbutton">Əlavə edin</button>
                        </div>
                    </form>

                </div >
                {/* {showToast && (
                    <InfoPage
                        message="Əməliyyat uğurla yerinə yetirildi!"
                        onClose={() => setShowToast(false)}
                    />
                )} */}

            </div >

        </>
    );
}

export default AddEmployerAdvert;

