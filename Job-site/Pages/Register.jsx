// import viteLogo from '/vite.svg'
// import '../src/App'
// import '../src/style/Register.css'
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function Register() {
//     const [isOpen, setIsOpen] = useState(false);

//     const openModal = () => setIsOpen(true);
//     const closeModal = () => setIsOpen(false);
//     // const [role, setRole] = useState("Worker");

//     const [formData, setFormData] = useState({
//         userName: '',
//         surName: '',
//         age: '',
//         gender: '',
//         email: '',
//         password: '',
//         phone: '',
//         role: ''
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let response;
//             // const data = formData;
//             console.log("##################")
//             console.log(formData.role)
//             console.log("##################")
//             if (formData.role === "Admin") {
//                 response = await axios.post('http://localhost:5156/api/Admin/Register', formData);
//                 console.log("admin");
//             } else if (formData.role === "Worker") {
//                 response = await axios.post('http://localhost:5156/api/Employer/Register', formData);
//                 console.log("employer");
//             } else if (formData.role === "Employer") {
//                 response = await axios.post('http://localhost:5156/api/Worker/Register', formData);
//                 console.log("Worker");
//             }

//             console.log('Server cavabı:', response.data);
//         } catch (error) {
//             console.error('Xəta baş verdi:', error);
//         }
//         console.log(formData);
//     };

//     return (
//         <>
//             <button onClick={openModal}>Formu Aç</button>

//             {isOpen && (
//                 <div className="modal" onClick={closeModal}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <span className="close" onClick={closeModal}>&times;</span>
//                         <h2>Qeydiyyat Formu</h2>
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 type="text"
//                                 name="userName"
//                                 value={formData.userName}
//                                 onChange={handleChange}
//                                 placeholder="İstifadəçi adı ve ya ad"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="surName"
//                                 value={formData.surName}
//                                 onChange={handleChange}
//                                 placeholder="Soyad"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="age"
//                                 value={formData.age}
//                                 onChange={handleChange}
//                                 placeholder="Yaş"
//                                 required
//                             />
//                             {/* <input
//                                 type="text"
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                                 placeholder="Cins"
//                                 required
//                             /> */}
//                             <select
//                                 className="modal-content-select"
//                                 name="role"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                             >
//                                 <option value="Kişi">Kişi</option>
//                                 <option value="Qadın">Qadın</option>
//                             </select>
//                             <input
//                                 type="text"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="mail"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="Şifrə"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 placeholder="Telefon"
//                                 required
//                             />
//                             <select
//                                 className="modal-content-select"
//                                 name="role"
//                                 value={formData.role}
//                                 onChange={handleChange}
//                             >
//                                 <option value="Worker">İşçi</option>
//                                 <option value="Employer">İşəgötürən</option>
//                                 <option value="Admin">Admin</option>
//                             </select>
//                             <button type="submit">Təsdiq Et</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque optio amet officiis, consequuntur nam sint. Voluptates placeat expedita, laboriosam et error architecto praesentium asperiores iste, sapiente natus non, illum quae cum nihil pariatur quaerat facere? Magni dolor perferendis accusamus odio explicabo perspiciatis obcaecati minima consequatur debitis quibusdam error, qui, possimus minus, consequuntur quaerat excepturi officia! Tenetur temporibus cumque mollitia maxime, dolore sapiente delectus quos accusantium ad, molestiae itaque ea ratione harum sint hic voluptatum, rerum sequi voluptatibus. Saepe eius pariatur modi ipsam fuga dolore id expedita, animi molestias molestiae consequuntur beatae provident cumque sit veritatis vel excepturi voluptatum rerum deserunt obcaecati dignissimos reprehenderit nesciunt. Vero odit esse nemo, omnis magni culpa dignissimos nostrum modi animi deserunt qui atque suscipit saepe exercitationem iure eaque temporibus quos rerum molestiae odio? Ipsum fuga, accusantium sint possimus hic est? Iure nostrum molestias id dolorem.</p>
//         </>
//     );
// }

// export default Register;


