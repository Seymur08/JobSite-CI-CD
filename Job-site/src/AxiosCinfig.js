// import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:5000/api" });

// // Refresh token ilə yeni access token almaq
// const refreshAccessToken = async () => {
//     try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const { data } = await api.post("/auth/refresh-token", { refreshToken });
//         localStorage.setItem("accessToken", data.accessToken);
//         return data.accessToken;
//     } catch (error) {
//         console.error("Refresh token xətası:", error);
//         return null;
//     }
// };

// // API sorğusu göndərmək
// const fetchData = async () => {
//     try {
//         const accessToken = localStorage.getItem("accessToken");
//         const response = await api.get("/protected-route", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         console.log("Məlumat:", response.data);
//     } catch (error) {
//         if (error.response && error.response.status === 401) {
//             const newAccessToken = await refreshAccessToken();
//             if (newAccessToken) {
//                 fetchData(); // Yeni token ilə yenidən sorğu göndər
//             }
//         } else {
//             console.error("API xətası:", error);
//         }
//     }
// };

// // API-ni çağır
// fetchData();