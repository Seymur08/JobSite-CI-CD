import axios from 'axios';

// Axios instansı yaradılır
const axiosInstance = axios.create({
    baseURL: 'http://your-api-url.com', // API URL-nizi buraya daxil edin
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Cookies göndərilsin deyə credentials parametri
});

// Access token-ı yeniləmək üçün refresh token istifadə edirik
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Əgər 401 (Unauthorized) xətası alırıqsa, refresh token istifadə edirik
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Refresh token ilə yeni access token almağa cəhd edirik
                const response = await axios.post('http://your-api-url.com/refresh');

                const accessToken = response.data.accessToken;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Sorğunu yenidən göndəririk
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh token yenilənə bilməzsə, istifadəçini çıxarırıq
                console.error('Session expired, logging out...');
                window.location.href = '/login'; // Login səhifəsinə yönləndiririk
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
