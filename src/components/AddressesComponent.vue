<template>
    <div>
        <div>
            <h3>Endereços Registrados</h3>
            <div v-for="addr in addresses" :key="addr.id">
                <p>{{ addr.street }}</p>
                <p>{{ addr.number }}</p>
                <p>{{ addr.city }}</p>
                <p>{{ addr.state }}</p>
                <p>{{ addr.country }}</p>
                <ButtonComponent @click="editAddress(addr)" text="Editar" class="purple"/>
                <ButtonComponent @click="deletAdress(addr.id)" text="excluir endereço" class="white"/>
            </div>
        </div>
        <div ref="formSection">
            <form @submit.prevent="saveAddress">
                <h3>{{ isEditing? 'alterar endereço existente' : 'Adicionar novo endereço' }}</h3>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.street" type="text" placeholder="Street" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.number" type="number" placeholder="Number" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.zip" type="text" placeholder="Zip" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.city" type="text" placeholder="City" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.state" type="text" placeholder="State" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.country" type="text" placeholder="Country" required class="input"/>
                </div>
                <ButtonComponent type="submit" :text="isEditing? 'Alterar' : 'Adicionar'" class="yellow"></ButtonComponent>
            </form> 
        </div>
    </div>
</template>

<script setup>
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();

const addresses = userStore.addresses;

console.log('array dos endereços no componente', addresses.value)

const editedAddress = ref({
    street: '',
    number: null,
    zip: '',
    city: '',
    state: '',
    country: ''
})

const isEditing = ref(false);

const formSection = ref(null);

async function showUserAddresses() {
    const result =  await userStore.userAddresses();
    addresses.value = result;
}

function scrollToForm(){
    if(formSection.value) {
        formSection.value.scrollIntoView({ behavior:'smooth', block: 'start'})
    }
}

async function saveAddress() {
    console.log('COMPONENTE Entrando em saveAddress', isEditing.value, 'addresses data:', addresses.value);
    if(isEditing.value){
        console.log('COMPONENTE Editando endereço, id do endereço:', editedAddress.value.id, 'dados do endereço:', editedAddress.value);
        await userStore.changeAddressData(editedAddress.value.id, editedAddress.value);
        console.log('COMPONENTE Endereço alterado com sucesso');
        window.alert('Endereço alterado com sucesso');
    } else {
        await userStore.postAddress(editedAddress.value);
        console.log('ADICIONANDO endereço...');
        window.alert('Endereço adicionado com sucesso');
    };

    resetForm();
}

function editAddress(addr){
    editedAddress.value = { ...addr};
    isEditing.value = true;
    scrollToForm();
}

function resetForm() {
    editedAddress.value = {
        street: '',
        number: null,
        zip: '',
        city: '',
        state: '',
        country: ''
    };
    isEditing.value = false;
}

async function deletAdress(id) {
    console.log('COMPONENTE id do endereço', id);
    await userStore.delAddress(id);
    window.alert('endereço deletado');
}

onMounted (()=>{
    showUserAddresses()
});
</script>