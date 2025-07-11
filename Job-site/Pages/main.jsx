

// import viteLogo from '/vite.svg'
// import '../src/App'
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


// function Employer() {

//     const [employerData, setEmployerData] = useState(null);

//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("http://localhost:5156/api/Employer/GetAllAdvertisement")
//             .then(res => setEmployerData(res.data))
//             .catch(error => console.error("Məlumat alınarkən xəta baş verdi: ", error));
//     }, []);

//     const handleAbout = () => {
//         alert("Salam")
//         navigate('/HeaderMain');
//     }


//     return (
//         <>

//             <div className='advertising-container-main'>

//                 <div className='advertising-container-main-center'>
//                     {employerData?.map(p => (
//                         <div key={p.id} className='advertising-container'>
//                             <a href={`#${p.category}`}>{p.category}</a>
//                             <h5>Sirket : {p.company}</h5>
//                             {/* <h5>Iş təcrübəsi : {p.work_experience}</h5>
//                         <h5>Əlaqədar şəxs : {p.contact_person}</h5>
//                         <h5>İş vaxtı : {p.work_time}</h5>
//                         <h5>İş qrafiki : {p.work_schedule}</h5>
//                         <h5>Ünvan : {p.address}</h5> */}
//                             {/* <h5>Əmək haqqı Min : {p.salary_Min}-{p.salary_Max} Azn</h5> */}
//                             <span style={{ marginLeft: '10px' }}>Əmək haqqı:
//                                 <h5 style={{
//                                     background: '#e2e8f0',
//                                     borderRadius: '5px',
//                                     border: '2px solid blue',
//                                     display: 'inline',
//                                     padding: '2px 10px',
//                                 }} >{p.salary_Min} - {p.salary_Max} Azn</h5></span>
//                             {/* <h5>Əmək haqqı Maks : {p.salary_Max} Azn</h5> */}
//                             {/* <h5>Yaş Min : {p.age_Min}</h5>
//                         <h5>Yaş Maks : {p.age_Max}</h5> */}
//                             <div className='advertising-container-button' >
//                                 <button onClick={handleAbout}>Etrafli</button>
//                                 <button>Sikayet et</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>




//         </>
//     );
// }

// export default Employer;



