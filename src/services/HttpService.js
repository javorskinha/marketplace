import axios from "axios";

const baseURL = 'http://34.138.111.33:8000/';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

/*api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)*/

export async function postLogin(credentials) {
    try{
        const response = await api.post('/login', {
            email: credentials.email,
            password: credentials.password
        });
        return response.data;
    } catch (error){
        console.error('erro fazer login', error);
        throw error;
    }
}

export async function getCategories() {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error){
        console.error('erro ao pegar categorias', error);
        throw error;
    }
}

export default api;