import { defineStore } from "pinia";
import { deleteUser, getUser, putUser, getAddresses, postAddresses, putAddress, deleteAddress } from "@/services/HttpService";
import { ref } from "vue";

export const useUserStore = defineStore('user', ()=>{
    const user = ref({});
    const addresses = ref([]);

    // user data

    async function userData() {
        try{
            const result = await getUser();
            user.value = result;
        } catch (error){
            console.error('Erro ao buscar dados', error);
            throw error;
        };
    }

    async function changeUserData(userData) {
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

    async function delUser() {
        try{
            console.log('dados sendo deletados...')
            await deleteUser();
            user.value = null;
            addresses.value = [];
        } catch (error){
            console.error('Erro ao deletar dados', error);
            throw error;
        };
    }

    // user addresses

    async function userAddresses(id) {
        try{
            const result = await getAddresses(id);
            addresses.value = result;
        } catch (error){
            console.error('Erro ao exibir endereços', error);
            throw error;
        };
    }

    async function postAddress(addressData) {
            try{
                const response = await postAddresses(addressData);
                addresses.value.push(response);
            } catch (error){
                console.error('Não foi possivel cadastrar o endereço tente novamente.', error);
                throw error;
            }
        };

    async function changeAddressData(id, updatedData) {
        try{
            console.log('novos dados:', updatedData)
            const result = await putAddress(id, updatedData);
            console.log('dados recebidos',result);

            const index = addresses.value.findIndex(addr => addr.id === id);
            if (index !== -1) {
                addresses.value[index] = result;
            };

        } catch (error){
            console.error('Erro ao alterar dados', error);
            throw error;
        };
    }

    async function delAddress(id) {
        try{
            console.log('dados sendo deletados...')
            await deleteAddress(id);
            addresses.value = addresses.value.filter(addr => addr.id !== id);
        } catch (error){
            console.error('Erro ao deletar dados', error);
            throw error;
        };
    }

    return {user, addresses, userData, changeUserData, delUser, userAddresses, postAddress, changeAddressData, delAddress}
})