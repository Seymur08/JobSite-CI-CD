// import axios from "axios";

// // Axios instansiyası
// const api = axios.create({
//     baseURL: "http://localhost:5156/api",
//     withCredentials: true, // RefreshToken cookie-dədirsə mütləqdir
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });


// // ✅ Logout funksiyasıback
// function logout() {
//     localStorage.removeItem("accessToken");
//     // Refresh token serverdə cookie-də olduğu üçün onu burdan silmək olmur, amma yönləndirə bilərik
//     window.location.href = "/HomePage"; // və ya istədiyin logout səhifəsi
//     console.log("rijvnrijvbrijvbivjrbirjbfn")
// }


// // ✅ Request interceptor — hər sorğudan əvvəl accessToken əlavə et
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


// // ✅ Response interceptor — 401 alındıqda refresh et və sorğunu təkrar et
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // ✅ Refresh token ilə yeni access token al
//                 const refreshResponse = await axios.post(
//                     "http://localhost:5156/api/Auth/RefreshToken",
//                     {},
//                     { withCredentials: true } // RefreshToken cookie-dədirsə lazımdır
//                 );

//                 const newAccessToken = refreshResponse.data.token;

//                 // ✅ Yeni tokeni yadda saxla
//                 localStorage.setItem("accessToken", newAccessToken);
//                 console.log("RefreshToken RefreshToken RefreshToken")


//                 // ✅ Header-i yenilə və sorğunu təkrar göndər
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // ✅ Refresh token də expired olubsa (401 və ya 403 gəlirsə) => logout
//                 if (
//                     refreshError.response?.status === 401 ||
//                     refreshError.response?.status === 403
//                 ) {
//                     console.log("logout logout logout logout logout")
//                     logout();
//                 }

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;


//////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// Axios instansiyası
const api = axios.create({
    baseURL: "http://localhost:5156/api", // "http://localhost:5156/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Logout funksiyası
function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/HomePage";
}

// Refresh queue üçün dəyişənlər
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

// Request interceptor: accessToken əlavə edir
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: 401 zamanı refresh və təkrar
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Token expire olubsa və təkrar cəhd etməmişiksə
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshResponse = await axios.post(
                        "http://localhost:5156/api/Auth/RefreshToken",
                        {},
                        { withCredentials: true }
                    );

                    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")

                    const newAccessToken = refreshResponse.data.token;
                    localStorage.setItem("accessToken", newAccessToken);
                    isRefreshing = false;

                    // Bütün gözləyən sorğulara tokeni ötür
                    onRefreshed(newAccessToken);

                    // İlk 401 olan request-i yenidən göndər
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;

                    if (
                        refreshError.response?.status === 401 ||
                        refreshError.response?.status === 403
                    ) {
                        logout();
                    }

                    return Promise.reject(refreshError);
                }
            }

            // Əgər artıq refresh gedirsə, növbəyə qoş
            return new Promise((resolve) => {
                addRefreshSubscriber((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    resolve(api(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default api;



// import axios from "axios";

// // Axios instansiyası
// const api = axios.create({
//     baseURL: "http://localhost:5156/api",
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Logout funksiyası
// function logout() {
//     localStorage.removeItem("accessToken");
//     window.location.href = "/HomePage";
// }

// // Refresh mexanizmi
// let isRefreshing = false;
// let refreshSubscribers = [];

// function onRefreshed(token) {
//     refreshSubscribers.forEach((callback) => callback(token));
//     refreshSubscribers = [];
// }

// function addRefreshSubscriber(callback) {
//     refreshSubscribers.push(callback);
// }

// // Refresh tokeni alma funksiyası
// async function refreshAccessToken() {
//     try {
//         const response = await axios.post(
//             "http://localhost:5156/api/Auth/RefreshToken",
//             {},
//             { withCredentials: true }
//         );
//         const newToken = response.data.token;
//         localStorage.setItem("accessToken", newToken);
//         return newToken;
//     } catch (error) {
//         throw error;
//     }
// }

// // Request interceptor: accessToken əlavə edir
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response interceptor: 401 zamanı refresh və retry (1 dəfə)
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Əgər artıq retry olunubsa və yenə 401 gəlibsə → logout
//         if (error.response?.status === 401 && originalRequest._retryOnce) {
//             logout();
//             return Promise.reject(error);
//         }

//         // İlk dəfədir 401 gəlir və refresh yoxdur
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             if (!isRefreshing) {
//                 isRefreshing = true;

//                 try {
//                     const newToken = await refreshAccessToken();
//                     isRefreshing = false;
//                     onRefreshed(newToken);
//                     originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                     return api(originalRequest);
//                 } catch (refreshError) {
//                     isRefreshing = false;
//                     logout();
//                     return Promise.reject(refreshError);
//                 }
//             }

//             // Refresh gedir, növbəyə qoş
//             return new Promise((resolve, reject) => {
//                 addRefreshSubscriber((newToken) => {
//                     originalRequest._retryOnce = true; // Retry edilmiş işarə
//                     originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                     resolve(api(originalRequest));
//                 });
//             });
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;

