import { defineStore } from "pinia";
import { deleteUser, getUser, putUser } from "@/services/HttpService";
import { ref } from "vue";

export const useUserStore = defineStore('user', ()=>{
    const user = ref({});

    async function userData(token) {
        try{
            const result = await getUser(token);
            user.value = result;
        } catch (error){
            console.error('Erro ao buscar dados', error);
            throw error;
        };
    }

    async function changeUserData(token, userData) {
        try{
            console.log('novos dados:', userData)
            const result = await putUser(token, userData);
            console.log('dados recebidos',result);
            user.value = result;
        } catch (error){
            console.error('Erro ao alterar dados', error);
            throw error;
        };
    }

    async function delUser(token) {
        try{
            console.log('dados sendo deletados...')
            await deleteUser(token);
            user.value = null;
        } catch (error){
            console.error('Erro ao deletar dados', error);
            throw error;
        };
    }

    return {user, userData, changeUserData, delUser}
})