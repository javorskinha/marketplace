import { defineStore } from "pinia";
import { postLogin } from "@/services/HttpService";
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

    async function logout(){
        token.value = null;
        user.value = null;
        localStorage.removeItem('token')
    };

    return{ token, user, isAuthenticated, login, logout};
})