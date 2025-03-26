import axios from "axios";

const baseURL = 'http://34.138.111.33:8000/';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQyNDA1MDI1fQ.x7c9srN12__xj4UEyfdil6iiuRvYPfwYMOjz1SO9MAQ';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export async function getCategories() {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error){
        console.error('erro ao pegar categorias', error);
        throw error;
    }
}

export async function getLogin() {
    try{
        const response = await api.get('/login');
        return response.data;
    } catch (error){
        console.error('erro ao acessar área de login', error);
        throw error;
    }
}