import { defineStore } from "pinia";
import { postCart, postLogin, postRegister, postRenewToken } from "@/services/HttpService";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const token = ref(localStorage.getItem('token') || null);
    const user = ref(JSON.parse(localStorage.getItem('user')) || null);
    const isAuthenticated = computed(()=> !!token.value);
    let refreshTimeout;

    function parseExp(token){
        try {
            const [, payload] = token.split('.');
            return JSON.parse(atob(payload)).exp * 1000; // milissegundos
        } catch {
            return null;
        }
    }

    function brandRenewToken(){
        if (!token.value) return;
        const exp = parseExp(token.value);
        if (!exp) return;

        const timeUntilRefresh = exp - Date.now() - 10 * 60 * 1000;
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(renewToken, Math.max(timeUntilRefresh, 0));
    }

    async function login(credentials) {
        try{
            const response = await postLogin(credentials);
            token.value = response.token;
            localStorage.setItem('token', response.token);
            user.value = response.user;
            localStorage.setItem('user', JSON.stringify(response.user));
            brandRenewToken();
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
            await postCart();
        } catch (error){
            console.error('Não foi possivel realizar o cadastro, tente novamente.', error);
            throw error;
        }
    };

    async function renewToken() {
        try{
            const response = await postRenewToken();
            token.value = response.token;
            localStorage.setItem('token', response.token);
            brandRenewToken();
        } catch (error){
            console.error('Erro ao renovar token', error);
            throw error;
        };
    };

    function logout(){
        token.value = null;
        user.value = null;
        clearTimeout(refreshTimeout);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    function initialize() {
        if (token.value) {
            brandRenewToken();
        }
    }

    return{ token, user, isAuthenticated, initialize, login, register, logout};
}, {persist: true})