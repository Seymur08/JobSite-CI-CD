

import React, { useEffect, useState, useMemo } from 'react';
import '../src/style/CardWorker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import isTokenValid from '../src/style/redux/ControlToken';
import { GetAllPermissionWorkers } from '../src/style/redux/HomeFunction';
import Pagination from './Pagination';
import Search from './Search';

function CardWorker() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allWorker = useSelector((state) => state.home?.allokworkers);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    const formData = useMemo(() => ({
        Page: parseInt(searchParams.get("Page")) || 1,
        PageSize: parseInt(searchParams.get("PageSize")) || 6,
        Category: searchParams.get("Category") || '',
        Section: searchParams.get("Section") || '',
        City: searchParams.get("City") || '',
        Salary: parseInt(searchParams.get("Salary")) || 0,
    }), [searchParams]);

    useEffect(() => {
        dispatch(GetAllPermissionWorkers(formData));
    }, [formData, dispatch]);

    useEffect(() => {
        axios.get('http://localhost:5156/api/Admin/GetAllCategoryWorker')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const chunkedCategories = useMemo(() => {
        const chunkSize = Math.ceil(categories.length / 3);
        const chunks = [];
        for (let i = 0; i < categories.length; i += chunkSize) {
            chunks.push(categories.slice(i, i + chunkSize));
        }
        return chunks;
    }, [categories]);

    const handleClick = (id) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!isTokenValid(accessToken)) {
            return navigate('/LoginPage');
        }
        const decoded = jwtDecode(accessToken);
        localStorage.setItem("WorkerId", id);
        localStorage.setItem("userId", decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
        localStorage.setItem("role", decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        navigate(`/WorkerAdvertDetails/${id}`);
    };

    const handleCategorySelect = (category) => {
        setSearchParams({});
        dispatch(GetAllPermissionWorkers(formData));
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set("Category", category);
            params.set("Page", 1);

            return params;
        });
    };

    const handleSearch = (newData) => {
        // setSearchParams({});
        const params = new URLSearchParams();
        Object.entries(newData).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
    };

    return (
        <>
            <div className="menu-wrapper">
                <div className="top-bar">
                    <div className="hamburger" onClick={() => setOpen(!open)}>
                        <div className="bar" /><div className="bar" /><div className="bar" />
                    </div>
                </div>
                <div className={`dropdown-menu ${open ? "menu-open" : "menu-closed"}`}>
                    <div className="categories-container">
                        {chunkedCategories.map((chunk, idx) => (
                            <div key={idx} className="category-box">
                                {chunk.map((item, i) => (
                                    <div key={`${item.category}-${i}`} className="category-item" onClick={() => handleCategorySelect(item.category)}>
                                        <div className='category-item-count'><a>{item.count}</a></div>
                                        <a>{item.category}</a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='categories-container-search-open'>
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>Axtarış 🔍</a>
                    </div>
                    {isOpen && <Search onSelect={handleSearch} />}
                </div>
            </div>

            <div className="card-container">
                <div className="card-wrapper">
                    {allWorker?.items?.length > 0 ? allWorker.items.map((e) => (
                        <div key={e.id} className="card-worker">
                            <div className="card-content">
                                <h4 className="category" onClick={() => handleClick(e.id)}>{e.section}</h4>
                                <h5 className="name">Tehsil : <span>{e.education}</span></h5>
                                <h5 className="name">Əmək haqqı: <span>{e.salary}</span> Azn</h5>
                                <h5 className="name">Tarix : <span>{new Date(e.createdAt).toLocaleDateString('az-AZ')}</span></h5>
                            </div>
                        </div>
                    )) : <h1 style={{ color: "white" }}>Siyahı boşdur</h1>}
                </div>
            </div>

            <Pagination
                totalPages={allWorker?.totalPages || 1}
                totalElement={allWorker?.totalCount || 0}
                onSelect={(page) => {
                    setSearchParams(prev => {
                        const params = new URLSearchParams(prev);
                        params.set("Page", page);
                        return params;
                    });
                }}
            />
        </>
    );
}

export default CardWorker;
