import { defineStore } from "pinia";
import { deleteUser, getUser, putUser, getAddresses, postAddresses, putAddress, deleteAddress, deleteCart } from "@/services/HttpService";
import { ref } from "vue";

export const useUserStore = defineStore('user', ()=>{
    const user = ref({});
    const addresses = ref([]);
    const defaultAddress = ref({});

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
            const result = await putUser(userData);
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
            await deleteCart();
        } catch (error){
            console.error('Erro ao deletar dados', error);
            throw error;
        };
    }

    //create-moderator

    // user addresses
    async function userAddresses(id) {
        try{
            const result = await getAddresses(id);
            addresses.value = result;
        } catch (error){
            console.error('Erro ao exibir endereços', error);
            throw error;
        };

        return addresses.value;
    }

    async function postAddress(addressData) {
            try{
                const response = await postAddresses(addressData);
                console.log('dados na store:', response)
                addresses.value.push(response);
            } catch (error){
                console.log('Não foi possivel cadastrar o endereço tente novamente.', error);
                throw error;
            }
        };

    async function changeAddressData(id, updatedData) {
        console.log('USER STORE id do endereço', id, 'novos dados:', updatedData);
        try{
            const result = await putAddress(id, updatedData);
            console.log('dados recebidos',result);

            const index = addresses.value.findIndex(addr => addr.id === id);
            if (index !== -1) {
                addresses.value[index] = result;
            };

        } catch (error){
            console.error('Erro ao alterar dados user store', error);
            throw error;
        };
    }

    async function delAddress(id) {
        console.log('USERSTORE id do endereço', id);
        try{
            console.log('dados sendo deletados...')
            await deleteAddress(id);
            addresses.value = addresses.value.filter(addr => addr.id !== id);
        } catch (error){
            console.error('Erro ao deletar dados', error);
            throw error;
        };
    }

    function turnDefault(addressData) {
        defaultAddress.value = addressData;
    }

    return {user, addresses, defaultAddress, userData, changeUserData, delUser, userAddresses, postAddress, changeAddressData, delAddress, turnDefault}
}, {persist: true})