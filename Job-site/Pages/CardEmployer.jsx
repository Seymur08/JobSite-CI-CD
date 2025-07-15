
import React, { useEffect, useMemo, useState } from 'react';
import '../src/style/CardEmployer.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import isTokenValid from '../src/style/redux/ControlToken';
// import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Search from './search.jsx';
import Pagination from './Pagination';
import { GetAllPermissionEmployers } from '../src/style/redux/HomeFunction';
import { useUserChat } from './UserChatContext';
import { jwtDecode } from 'jwt-decode';

function CardEmployer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setUserData } = useUserChat();

    const employers = useSelector(store => store.home.allokEmployers);

    const [searchParams, setSearchParams] = useSearchParams();

    // 1. formData useMemo ilə searchParams-dan oxunur
    const formData = useMemo(() => ({
        Page: Number(searchParams.get('Page')) || 1,
        PageSize: 6,
        Category: searchParams.get('Category') || '',
        Section: searchParams.get('Section') || '',
        City: searchParams.get('City') || '',
        Salary: Number(searchParams.get('Salary')) || 0,
    }), [searchParams]);

    // 2. formData dəyişdikdə API çağırışı
    useEffect(() => {
        dispatch(GetAllPermissionEmployers(formData));
    }, [dispatch, formData]);

    // Kateqoriyalar
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5156/api/Admin/GetAllCategoryEmployer')
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const chunkedCategories = useMemo(() => {
        const chunkSize = Math.ceil(categories.length / 3) || 1;
        const chunks = [];
        for (let i = 0; i < 3; i++) {
            chunks.push(categories.slice(i * chunkSize, (i + 1) * chunkSize));
        }
        return chunks;
    }, [categories]);

    // 3. Kateqoriya seçimi - searchParams-ı dəyişir, Page 1 olur
    const handleCategorySelect = (category) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('Category', category);
            params.set('Page', 1);
            return params;
        });
    };

    // 4. Search form-dan gələn filter dəyərləri searchParams-a yazılır
    const handleSearch = (data) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            // Filter məlumatlarını əlavə et
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });
            params.set('Page', 1); // yeni axtarışda səhifə 1
            return params;
        });
    };

    // 5. Pagination üçün səhifə seçimi
    const handlePageSelect = (page) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('Page', page);
            return params;
        });
    };

    const handleClick = (id) => {
        const token = localStorage.getItem('accessToken');
        if (!isTokenValid(token)) return navigate('/LoginPage');

        const decoded = jwtDecode(token);
        const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        localStorage.setItem("EmployerId", id);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);

        navigate(`/EmployerAdvertDetails/${id}`);
    };

    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    if (loading) return <p style={{ color: 'white' }}>Yüklənir...</p>;

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
                        {chunkedCategories.map((chunk, i) => (
                            <div key={i} className="category-box">
                                {chunk.map((item, j) => (
                                    <div
                                        key={j}
                                        className="category-item"
                                        onClick={() => handleCategorySelect(item.category)}
                                    >
                                        <div className='category-item-count'>
                                            <a href="#" className="category-link">{item.count}</a>
                                        </div>
                                        <a href="#" className="category-link">{item.category}</a>
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

            <div className="cardemployer-1">
                <div className="cardwrapper-1">
                    {employers?.items?.length > 0 ? (
                        employers.items.map((e) => (
                            <div key={e.id} className="card-1">
                                <div className="cardcontent-1">
                                    <h4 className="category-1" onClick={() => handleClick(e.id)}>{e.section}</h4>
                                    <h5 className="name-1">Şirkət: <span>{e.company}</span></h5>
                                    <h5 className="name-1">Əmək haqqı: <span>{e.salary_Min} - {e.salary_Max}</span> AZN</h5>
                                    <h5 className="name-1">Tarix: <span>{new Date(e.createdAt).toLocaleDateString('az-AZ')}</span></h5>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 style={{ color: "white" }}>Siyahı Boşdur</h1>
                    )}
                </div>
            </div>

            <Pagination
                totalPages={employers?.totalPages || 1}
                totalElement={employers?.totalCount || 0}
                onSelect={handlePageSelect}
            />
        </>
    );
}

export default CardEmployer;



