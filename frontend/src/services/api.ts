import axios from 'axios';
import { toast } from "react-toastify";

const api = axios.create({
 baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
});

api.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    const errorMessage = error.response?.data?.detail || "Erro inesperado no servidor";
    
    if (expectedError) {
            toast.warn(errorMessage);
        } else {
            toast.error("Erro de conexão ou servidor fora do ar.");
        }
    return Promise.reject(error);
});

export default api;