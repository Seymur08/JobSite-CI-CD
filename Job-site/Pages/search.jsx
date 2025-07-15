
import React, { useEffect, useState } from 'react';
import '../src/style/Search.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategoryWorker } from '../src/style/redux/AdminFunctions';
import Cities from '../src/data/Cities.json';
import Salary from '../src/data/Salary.json';

function Search({ onSelect }) {
    const dispatch = useDispatch();
    const categoryWorker = useSelector((store) => store.admin.categoryWorker);

    useEffect(() => {
        dispatch(GetAllCategoryWorker());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        Page: 1,
        PageSize: 6,
        Category: '',
        Section: '',
        City: '',
        Salary: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
        const selectedSection = e.target.value;
        const category = e.target.selectedOptions[0].dataset.category;
        setFormData({ ...formData, Section: selectedSection, Category: category });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSelect(formData);
    };

    return (
        <div className='search-section'>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className='search-section-in'>
                    <div className='search-box'>
                        <select name="Section" required value={formData.Section} onChange={handleSelectChange} className="Select">
                            <option value="">Seçim edin</option>
                            {categoryWorker.map((s, i) => (
                                <optgroup key={i} label={s.category}>
                                    {s.section.map((sec, idx) => (
                                        <option key={idx} value={sec.section} data-category={s.category}>
                                            {sec.section}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <div className='search-box'>
                        <select className='Select' name="City" value={formData.City} onChange={handleChange}>
                            <option value="">Şəhər</option>
                            {Cities.map((c, i) => (
                                <option key={i} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='search-box'>
                        <select className='Select' name="Salary" value={formData.Salary} onChange={handleChange}>
                            <option value="">Əmək haqqı</option>
                            {Salary.map((s, i) => (
                                <option key={i} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='search-button'>
                    <button type="submit">Axtar</button>
                </div>
            </form>
        </div>
    );
}

export default Search;







