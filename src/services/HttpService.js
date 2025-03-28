import axios from "axios";

const baseURL = 'http://34.138.111.33:8000/';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
});

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

export async function postRegister(userData) {
    try{
        const response = await api.post('/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        return response.data;
    } catch(error){
        console.error('erro ao realizar registro', error);
        throw error;
    }
}

export async function postRenewToken(token) {
    try{
        const response = await api.post('/renew-token',token);
        return response.data;
    } catch(error){
        console.error('erro ao renovar token', error);
        throw error;
    }
}

export async function getUser(token) {
    try {
        const response = await api.get('/users/me',
            {headers: {
                Authorization: `Bearer ${token}`
            }});
        return response.data;
    } catch (error){
        console.error('erro ao recuperar dados do usuário', error);
        throw error;
    }
}

export async function putUser(token, userData) {
    try {
        const response = await api.put('/users/me', userData,
            {headers: {
                Authorization: `Bearer ${token}`
            }});
        return response.data;
    } catch (error){
        console.error('erro ao alterar dados de usuário', error);
        throw error;
    }
}

export async function deleteUser(token) {
    try {
        const response = await api.delete('/users/me',
            {headers: {
                Authorization: `Bearer ${token}`
            }});
        return response.data;
    } catch (error){
        console.error('erro ao deletar usuário', error);
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