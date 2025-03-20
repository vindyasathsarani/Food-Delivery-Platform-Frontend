import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL, // Automatically uses your environment's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
