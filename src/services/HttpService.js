import axios from "axios";

const baseURL = 'http://35.196.79.227:8000/';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//authentication requests

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

// export async function postRenewToken() {
//     try{
//         const response = await api.post('/renew-token',);
//         return response.data;
//     } catch(error){
//         console.error('erro ao renovar token', error);
//         throw error;
//     }
// }

//verify-token

// user data requests

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

//users/created-moderator

// user addresses requests

export async function getAddresses(addressId = null) {
    try {
        let url = '/addresses';

        if(addressId){
            url = `/addresses/${addressId}`;
        }
        const response = await api.get(url);
        return response.data;
    } catch (error){
        console.error('erro ao recuperar endereço', error);
        throw error;
    }
}

export async function postAddresses(addressData) {
    try {
        const response = await api.post('/addresses', addressData);
        console.log('dados de entrada:', response.data)
        return response.data;
    } catch (error){
        console.error('erro ao registrar endereço', error.response);
        throw error;
    }
}

export async function putAddress(id, updatedData) {
    console.log('HTTP id do endereço', id, 'novos dados:', updatedData);
    try {
        const response = await api.put(`/addresses/${id}`, updatedData);
        return response.data;
    } catch (error){
        console.error('erro ao alterar endereço http', error.response);
        throw error;
    }
}

export async function deleteAddress(id) {
    console.log('HTTP id do endereço', id);
    try {
        const response = await api.delete(`/addresses/${id}`);
        return response.data;
    } catch (error){
        console.error('erro ao deletar endereço', error.response);
        throw error;
    }
}

// categories requests

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