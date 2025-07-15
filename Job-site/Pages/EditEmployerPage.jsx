import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { GetAllCategory } from '../src/style/redux/AdminFunctions';
import { Link, useParams } from 'react-router-dom';
import data from '../src/data/WorkExperience.json';
import age from '../src/data/Age.json';
import salary from '../src/data/Salary.json';
import time from '../src/data/Time.json';
import { RemoveAdvertisementEmp, UpdateEmployerJob } from '../src/style/redux/EmployerFuntion';
import "../src/style/EditEmployerPage.css"

function EditEmployerPage() {

    const { id } = useParams();

    const employers = useSelector((state) => state.employer.employers)



    // const employer = employers.find((w) => w.id == id);
    const employer = Array.isArray(employers) ? employers.find(e => e.id === id) : null;

    const [selected, setSelected] = useState("");

    const [formData, setFormData] = useState({
        Id: '',
        Phone: '',
        Email: '',
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
            [e.target.name]: e.target.value
        });
    };

    const allcategories = useSelector((store) => store.admin.category)
    const dispatch = useDispatch();

    useEffect(() => {
        if (employer) {
            setFormData({
                Id: employer.id || "",
                Phone: employer.phone || '',
                Category: employer.category || '',
                Company: employer.company || '',
                Email: employer.email || '',
                Work_experience: employer.work_experience || '',
                Contact_person: employer.contact_person || '',
                Work_time: employer.work_time || '',
                Work_schedule: employer.work_schedule || '',
                Requirements: employer.requirements || '',
                Address: employer.address || '',
                Salary_Min: employer.salary_Min || '',
                Salary_Max: employer.salary_Max || '',
                Age_Min: employer.age_Min || '',
                Age_Max: employer.age_Max || '',

            });
        }
    }, [employer]);

    const HandleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdateEmployerJob(formData));

    }

    console.log(formData)

    return (
        <>

            <div className='advertmain'>
                <div className='advertmaincenter'>
                    <form className='Form' onSubmit={HandleFormSubmit}>
                        <div className='advertmaincenterleft'>
                            <h2>{employer?.category}</h2>
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
                                name="Contact_person"
                                value={formData.Contact_person}
                                onChange={handleChange}
                                placeholder="Əlaqədar şəxs"
                                required
                            />

                            <input
                                type="text"
                                name="Work_time"
                                value={formData.Work_time}
                                onChange={handleChange}
                                placeholder="İş vaxti"
                                required
                            />

                            <input
                                type="text"
                                name="Work_schedule"
                                value={formData.Work_schedule}
                                onChange={handleChange}
                                placeholder="İş qrafiki"
                                required
                            />

                            <input
                                type="text"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                placeholder="Ünvan"
                                required
                            />


                            <h3>Maas</h3>
                            <div className='select-salary'>
                                <h4>Min</h4>
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
                                <h4>Max</h4>
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
                            <h3>Yas</h3>
                            <div className='selectage'>
                                <h4>Min</h4>
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
                                <h4>Max</h4>
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
                            <div id='Telebler'>Tələblər</div>
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
                    <Toast
                        message="Əməliyyat uğurla yerinə yetirildi!"
                        onClose={() => setShowToast(false)}
                    />
                )} */}

            </div >

        </>
    )
}

{/* <input
                                type="text"
                                name="Company"
                                value={formData.Company}
                                onChange={handleChange}
                                placeholder="Sirket"
                                required
                            /> */}
{/* <input
                                type="text"
                                name="Work_experience"
                                value={formData.Work_experience}
                                onChange={handleChange}
                                placeholder="İş təcrübəsi"
                                required
                            /> */}

export default EditEmployerPage
