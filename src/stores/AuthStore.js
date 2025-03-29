import { defineStore } from "pinia";
import { postLogin, postRegister, postRenewToken } from "@/services/HttpService";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const token = ref(localStorage.getItem('token') || null);
    const user = ref(null);
    const isAuthenticated = computed(()=> !!token.value);

    async function login(credentials) {
        try{
            const response = await postLogin(credentials);
            token.value = response.token;
            localStorage.setItem('token', response.token);
            user.value = response.user;
        } catch (error){
            console.error('Erro ao fazer login', error);
            throw error;
        };
    };

    async function register(userData) {
        try{
            const response = await postRegister(userData);
            user.value = response.data;
            await login({ email: userData.email, password: userData.password });
        } catch (error){
            console.error('Não foi possivel realizar o cadastro, tente novamente.', error);
            throw error;
        }
    };

    // async function renewToken() {
    //     try{
    //         const response = await postRenewToken(token.value);
    //         token.value = response.token;
    //         localStorage.setItem('token', response.token);
    //     } catch (error){
    //         console.error('Erro ao renovar token', error);
    //         throw error;
    //     };
    // };


    async function logout(){
        token.value = null;
        user.value = null;
        localStorage.removeItem('token')
    };

    return{ token, user, isAuthenticated, login, register, logout};
})