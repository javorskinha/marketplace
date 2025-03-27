import { defineStore } from "pinia";
import { getUser } from "@/services/HttpService";
import { ref } from "vue";

export const useUserStore = defineStore('user', ()=>{
    const user = ref({});

    async function userData(token) {
        try{
            const result = await getUser(token);
            console.log('dados recebidos',result);
            user.value = result;
        } catch (error){
            console.error('Erro ao buscar dados', error);
            throw error;
        };
    }

    return {user, userData}
})