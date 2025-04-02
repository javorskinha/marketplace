<template>
    <div class="addresses">
        <div>
            <h3>Endereços Registrados</h3>
            <div v-if="addresses.length > 0">
                <div v-for="addr in addresses" :key="addr.id" class="address-container">
                    <div class="text">
                        <div class="block-one">
                            <p>{{ addr.street }}</p>
                            <p>, {{ addr.number }}</p>
                        </div>
                        <div class="block-two">
                            <p>{{ addr.city }}</p>
                            <p>/{{ addr.state }}</p>
                            <p>- {{ addr.country }}</p>
                        </div>
                    </div>
                    <div class="buttons">
                        <ButtonComponent @click="editAddress(addr)" text="Editar" class="gray button"/>
                        <ButtonComponent @click="deletAdress(addr.id)" text="Excluir" class="white button"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="no-adress">Você não possui nenhum endereço cadastrado <i class="pi pi-home"></i>
                </p>
            </div>
        </div>
        <div ref="formSection">
            <h3>{{ isEditing? 'Alterar Endereço Registrado' : 'Adicionar Novo Endereço' }}</h3>
            <form @submit.prevent="saveAddress">
                <div class="input-box">
                    <InputComponent v-model="editedAddress.street" type="text" placeholder="Rua" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.number" type="number" placeholder="Número" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.zip" type="text" placeholder="CEP" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.city" type="text" placeholder="Cidade" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.state" type="text" placeholder="Estado" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model="editedAddress.country" type="text" placeholder="País" required class="input"/>
                </div>
                <ButtonComponent type="submit" :text="isEditing? 'ALTERAR' : 'ADICIONAR'" class="blue"></ButtonComponent>
            </form> 
        </div>
    </div>
</template>

<script setup>
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useUserStore } from "@/stores/UserStore";
import { computed, onMounted, ref } from "vue";

const userStore = useUserStore();

const addresses = computed (() => userStore.addresses);

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
    await userStore.userAddresses();
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
    await userStore.userAddresses();
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
    await userStore.userAddresses();
}

onMounted (()=>{
    showUserAddresses()
});
</script>

<style scoped>
    .addresses{
        margin: 2em 0 1em 0;
        padding: 0.5em 0;
        border: solid 1px var(--color-light-beige);
    }

    .address-container{
        margin: 1em;
        padding: 0.5em;
        border: solid 1px var(--color-light-beige);
    }

    .text{
        font-size: 1.1em;
        letter-spacing: 1px;
        margin-bottom: 0.5em;
    }

    .block-one{
        display: flex;
    }

    .block-two{
        display: flex;
        color: var(--color-gray);
    }

    .buttons{
        display: flex;
    }

    .button{
        height: 25px;
    }

    .no-adress{
        font-size: 1.2em;
        font-weight: 200;
        color: var(--color-gray);
        text-align: center;
        margin: 2em;
    }

    h3{
        margin-left: 0.6em;
    }

    form{
        margin: 0.5em;
    }

    .blue{
        display: block;
        place-self: center;
        width: 94%;
        height: 30px;
    }
</style>