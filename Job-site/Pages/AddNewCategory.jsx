import React, { useEffect, useState } from 'react'
import '../src/style/AddNewCategory.css'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewCategorys, GetAllCategoryWorker } from '../src/style/redux/AdminFunctions';
import InfoPage from './InfoPage';
import { useNavigate } from 'react-router-dom';
// import { AddNewCategorys, GetAllCategory } from '../src/style/redux/AllFuntions';

function AddNewCategory() {
    const [showPopup, setInfoPage] = useState(false);
    const [selected, setSelected] = useState("");  // Seçim üçün state
    const [ischeck, setIsCheck] = useState(false);  // Checkbox state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux store-dan bütün kategoriyanı əldə et
    const allcategories = useSelector((store) => store.admin.categoryWorker);

    useEffect(() => {
        dispatch(GetAllCategoryWorker());  // Sayfa yükləndikdə kategoriya məlumatlarını al
    }, [dispatch]);

    const [formData, setFormData] = useState({
        Category: '',
        section: '',
        isitnew: false,
    });

    const handleChangeText = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (e) => {
        setIsCheck(e.target.checked); // Checkbox-un statusunu təyin et
        setFormData({
            ...formData,
            isitnew: e.target.checked // `isitnew` state-ni yenilə
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        const result = await dispatch(AddNewCategorys(formData)).unwrap(); // Yeni reklam əlavə etmək üçün action 
        if (result) {
            setInfoPage(true);
            setTimeout(() => {
                navigate("/AdminPage");
            }, 3000); // 3 saniyə sonra navigate("/AdminPage") çağırılacaq
        }
    };

    return (
        <>
            <div className='category-page'>
                <div className='category-page-center'>
                    <form id='form-category' onSubmit={handleFormSubmit}>
                        <h1>Kategoriya Elave Et</h1>

                        {ischeck ? (
                            <input
                                type="text"
                                name="Category"
                                value={formData.Category}
                                onChange={handleChangeText}
                                placeholder="Kateogiya adi"
                                required
                            />

                        ) : (<select
                            id="category"
                            value={selected}
                            onChange={(e) => {
                                setSelected(e.target.value);  // Seçimi yenilə
                                setFormData({
                                    ...formData,
                                    Category: e.target.value  // `Category` state-ni yenilə
                                });
                            }}
                            required
                        >
                            <option value="">Secim edin</option>
                            {allcategories?.map((o, index) => (
                                <option key={index} value={o.category}>{o.category}</option>
                                // <optgroup key={index} label={option.category}> {/* Kategoriya adı */}
                                //     {option.subCategoriesDto.map((sub, subIndex) => (
                                //         <option key={subIndex} value={sub.section}>
                                //             {sub.section} 
                                //         </option>
                                //     ))}
                                // </optgroup>
                            ))}
                        </select>)}

                        <input
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleChangeText}
                            placeholder="Bölmə"
                            required
                        />

                        <div className='category-page-button'>
                            <div id='checkbox'>
                                <input
                                    type="checkbox"
                                    name="subscribe"
                                    checked={formData.isitnew}  // Checkbox-un dəyərini `formData`-ya bağla
                                    onChange={handleCheckboxChange}  // Checkbox dəyişərkən handle et
                                />
                                <h3>Yeni</h3>
                            </div>

                            <button type='submit'>Elave et</button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && (
                <InfoPage
                    message="Kategoriya uğurla yenilendi"
                    onClose={() => setInfoPage(false)}
                />
            )}
        </>
    );
}

export default AddNewCategory;









// import React, { useEffect, useState } from 'react'
// import '../src/style/AddNewCategory.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { GetAllCategory } from '../src/style/redux/AllFuntions';

// function AddNewCategory() {

//     const [selected, setSelected] = useState("");
//     const [ischeck, setischeck] = useState(false);
//     console.log("bye bye")



//     const dispatch = useDispatch();


//     const allcategories = useSelector((store) => store.admin.category)

//     useEffect(() => {
//         dispatch(GetAllCategory());
//     }, []);

//     const [formData, setFormData] = useState({
//         Category: '',
//         section: '',
//         isitnew: false,


//     });

//     console.log(allcategories)

//     const handleChangeText = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleChange = (e) => {
//         formData.isitnew = e.target.checked;
//         setischeck(true);

//         // useEffect(() => {
//         //     console.log(e.target.checked)
//         // }, [ischeck])

//     };


//     const HandleFormSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData)
//         dispatch(AddNewAdvertWorker(formData));


//     }


//     return (
//         <div className='category-page'>
//             <div className='category-page-center'>
//                 <form id='form-category' onSubmit={HandleFormSubmit}>
//                     <h1>Kategoriya Elave Et</h1>
//                     {ischeck && (
//                         <select id="category" value={selected} onChange={(e) => setSelected(e.target.value, formData.Category = e.target.value)} required>
//                             <option value={formData.selected}>secim edin</option>
//                             {allcategories.map((option, index) => (
//                                 <option key={index} value={option}>
//                                     {option}
//                                 </option>))}
//                             {/* {allcategories.map((s, index) => (
//                             <optgroup key={index} label={s.category}>
//                                 {s.subCategoriesDto.map((sub, idx) => (
//                                     <option key={idx} value={sub.section}>
//                                         {sub.section}
//                                     </option>
//                                 ))}
//                             </optgroup>
//                         ))} */}
//                         </select>
//                     )}
//                     <input
//                         type="text"
//                         name="Category"
//                         value={formData.Category}
//                         onChange={handleChangeText}
//                         placeholder="Bolum"
//                         required
//                     />
//                     <div className='category-page-button'>
//                         <div id='checkbox'>
//                             <input type="checkbox" name="subscribe"

//                                 value={formData.isitnew}
//                                 onChange={handleChange} />
//                             <h3>Yeni</h3>
//                         </div>
//                         <button type='submit'>Elave et</button>
//                     </div>
//                 </form>
//             </div>

//         </div>
//     )
// }

// export default AddNewCategory
