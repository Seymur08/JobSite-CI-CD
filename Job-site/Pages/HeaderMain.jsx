import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import '../src/App';
import '../src/style/Header.css';
import '../src/style/Category.css';
import '../src/style/Header-main.css';
import photo from '../src/icons/magnifying-glass.png';
// import Employer from './main';
import Search from './search.jsx';
import cities from '../public/Cities.json'
import salary from '../public/Salary.json'
import age from '../public/Age.json'
import time from '../public/Time.json'

function HeaderMain() {

    const [categories, setCategories] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5156/api/Admin/GetAllCatrgory')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Xəta baş verdi:', error);
            });
    }, []);


    const [formData, setFormData] = useState({
        category: '',
        phone: '',
        company: '',
        work_experience: '',
        contact_person: '',
        work_time: '',
        work_schedule: '',
        address: '',
        salary_Min: '',
        salary_Max: '',
        age_Min: '',
        age_Max: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            response = await axios.post('http://localhost:5156/api/Employer/AddAdvertisement', formData);

            console.log('Server cavabı:', response.data);
        } catch (error) {
            console.error('Xəta baş verdi:', error);
        }
        console.log(formData);
    };


    return (
        <>
            {/* <div className='header-main'>
                <div className='header-main-in'>
                    <div className='header-main-left'>
                        <a href="#">boss.az</a>
                        <button>İş elanları</button>
                        <button>İş axtaranlar</button>
                    </div>
                    <div className='header-main-right'>

                        <button className='button-haqqimizda'>Haqqımızda</button>
                        <button className='button-elan'>Elan yerləşdirin</button>
                    </div>
                </div>

            </div> */}
            <div className='advertising-employer'>
                {/* <Employer /> */}
                <div className='advertising-employer-element'>
                    <div className='advertising-employer-element-left'>
                        <div className='advertising-employer-element-left_1'>
                            <h1>İŞ ELANI YERLƏŞDİRİN</h1>
                            <button>CV yerləşdirin</button>
                        </div>
                        <form action="">

                            <div className='advertising-employer-element-left_2'>
                                <p>ELAN</p>

                                <label htmlFor="">Unvan</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="unvan"
                                    required />
                                <label htmlFor="">Əlaqədar şəxs</label>
                                <input
                                    type="text"
                                    name="contact_person"
                                    value={formData.contact_person}
                                    onChange={handleChange}
                                    placeholder="Əlaqədar şəxs"
                                    required />
                                <label htmlFor="">Sirket</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="company"
                                    required />

                                <label htmlFor="">Telefon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Telefon nömrəsi"
                                    required />

                                <label htmlFor="">Kateqoriya</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required>
                                    <option value=""></option>
                                    {categories.map(city => (
                                        <option key={city.id} value={city.id}>
                                            {city.category}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="">Is Tecrubasi</label>
                                <select
                                    id="work_experience"
                                    name="work_experience"
                                    value={formData.work_experience}
                                    onChange={handleChange}
                                    required>
                                    <option value="1 ildən aşağı">1 ildən aşağı</option>
                                    <option value="1 ildən 3 ilə qədər">1 ildən 3 ilə qədər</option>
                                    <option value="3 ildən 5 ilə qədər">3 ildən 5 ilə qədər</option>
                                    <option value="5 ildən artıq">5 ildən artıq</option>
                                </select>
                                <label htmlFor="">Şəhər</label>
                                <select
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required>
                                    <option value=""></option>
                                    {cities.map(city => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>

                                <div className='advertising-employer-element-left-select'>
                                    <h3 htmlFor="">Is vaxti</h3>
                                    <div>
                                        <p htmlFor="">Min</p>
                                        <select
                                            id="work_time"
                                            name="work_time"
                                            value={formData.work_time}
                                            onChange={handleChange}
                                            required>
                                            <option value=""></option>
                                            {time.map((option) => (
                                                <option key={option.id} value={option.saat}>
                                                    {option.saat}
                                                </option>
                                            ))}
                                        </select>
                                        <p htmlFor="">Max</p>
                                        <select
                                            id="work_schedule"
                                            name="work_schedule"
                                            value={formData.work_schedule}
                                            onChange={handleChange}
                                            required>
                                            <option value=""></option>
                                            {time.map((option) => (
                                                <option key={option.id} value={option.saat}>
                                                    {option.saat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className='advertising-employer-element-left-select'>
                                    <h3 htmlFor="">Maaş</h3>
                                    <div>
                                        <p htmlFor="">Min</p>
                                        <select
                                            id="salary_Min"
                                            name="salary_Min"
                                            value={formData.salary_Min}
                                            onChange={handleChange}
                                            required>
                                            <option value=""></option>
                                            {salary.map((option) => (
                                                <option key={option.id} value={option.label}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <p htmlFor="">Max</p>
                                        <select
                                            id="salary_Max"
                                            name="salary_Max"
                                            value={formData.salary_Max}
                                            onChange={handleChange}
                                            required>
                                            <option value=""></option>
                                            {salary.map((option) => (
                                                <option key={option.id} value={option.label}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                <div className='advertising-employer-element-left-select'>
                                    <h3 htmlFor="">Yaş</h3>
                                    <div>
                                        <p htmlFor="">Min</p>
                                        <select
                                            id='age_Min'
                                            name='age_Min'
                                            value={formData.age_Min}
                                            onChange={handleChange}
                                            required>

                                            <option value=""></option>
                                            {age.map((option) => (
                                                <option key={option.id} value={option.age}>
                                                    {option.age}
                                                </option>
                                            ))}
                                        </select>
                                        <p htmlFor="">Max</p>
                                        <select
                                            id='age_Max'
                                            name='age_Max'
                                            value={formData.age_Max}
                                            onChange={handleChange}
                                            required>
                                            <option value=""></option>
                                            {age.map((option) => (
                                                <option key={option.id} value={option.age}>
                                                    {option.age}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className='advertising-employer-element-left_2-btn'>
                                    <button onClick={handleSubmit}>Yerləşdirin</button>
                                </div>
                            </div>
                        </form>
                    </div>


                    <div className='advertising-employer-element-right'>
                        <h2>QAYDALAR</h2>
                        <code>
                            1. Bir vakansiyanın 30 gün müddətinə yerləşdirilməsi pulsuz həyata keçirilir <br /><br />
                            2. Vakansiya yalnız Azərbaycan daxilində olan işləri əhatə etməlidir.<br /><br />
                            3. Vakansiya haqqında elanın ən qısa müddətdə dərc olunması üçün formanın doldurulmasına dair bütün təlimatlara ciddi riayət olunmalıdır.  Səliqəsiz doldurulmuş formalar redaktəyə məruz qalacaq və dərhal dərc olunmayacaq.<br /><br />
                            4. Elanların yalnız baş (BÖYÜK) hərflərlə və ya başqa əlifba ilə (translitlə) yazılması qadağandır. Elan bütünlüklə bir dildə olmalıdır.<br /><br />
                            5. Şirkətin adı olan sütunda şirkətin rəsmi, hüquqi adı, həmin müəssisə holdinq tərkibindədirsə, holdinqin adı və şirkətin fəaliyyət istiqaməti (növü) qeyd olunmalıdır.<br /><br />
                            6. Əlaqələr yazılan sütunda aktiv şəhər telefonlarının nömrələri və şirkətin korporativ elektron ünvanları qeyd olunmalıdır.<br /><br />
                            7. İstifadəçi 5 və 6-cı bəndlərə riayət etmədikdə, elan ödənişli əsaslarla qəbul edilir.
                            «Əmək haqqı» sütununun doldurulması mütləqdir, məbləğ AZN-lə göstərilməlidir. Əgər əmək haqqı 500 AZN-ə qədərdirsə, əmək haqqı diapazonu 200 AZN-i; 1000 AZN-ə qədərdirsə 300 AZN-i; 2000 AZN-ə qədərdirsə, 500 AZN-i aşmamalıdır.<br /><br />
                            8. Dərc olunmuş elanda əlaqə nömrələrinin, vakansiyanın adının dəyişdirilməsi qadağandır.<br /><br />
                            10. «Namizədə olan tələblər» mümkün qədər ətraflı yazılmalıdır.<br /><br />
                            11. «Mövqenin (vəzifənin) təsviri» də həmçinin iş qrafiki, vəzifə öhdəlikləri və işin şərtləri qeyd olunmaqla, ətraflı yazılmalıdır.<br /><br />
                            12. Mövqe (vəzifə) seçilmiş kateqoriyaya uyğun olmalı, əgər elə kateqoriya yoxdursa, onda «Müxtəlif» adlanan alt-kateqoriyada yerləşdirilməlidir.<br /><br />
                            13. Aşağıdakı kimi elanlar dərhal ləğv olunacaq:<br /><br />

                            ədəbsiz, təhqiredici sözlər və ifadələr olan;
                            şəbəkə marketinqi və ya qadağan olunmuş, şübhəli fəaliyyət növləri ilə məşğul olan şirkətlərdə iştirak təklifləri olan.<br /><br />

                            14. İş elanı yerləşdirilərkən, «Vəzifə» sütununda kateqoriyaya uyğun olan ikili mövqe qeyd oluna bilər. Məsələn, satıcı-kassir, barista-ofisiant, sürücü-ekspeditor, çörəkçi-şirniyyatçı və s.<br />

                        </code>

                    </div>
                </div>

            </div>
        </>

    );
};

export default HeaderMain;
