<template>
    <div class="m-1 rounded-3 p-1 pt-3 d-flex flex-column flex-md-row">
        <div class="w-100">
            <h3 class="ms-3">Endereços Registrados</h3>
            <div v-if="addresses.length > 0">
                <div v-for="addr in addresses" :key="addr.id" class="m-2 p-md-3 rounded-3">
                    <div class="fs-5 d-flex align-items-center justify-content-between w-100 border-bottom border-info mt-3 mt-md-0 pb-3">
                        <div class="d-flex align-items-center">
                            <i class="pi pi-map-marker text-info d-none d-md-block"></i>
                            <div class="ms-2">
                                <div>
                                    <p class="m-0">{{ addr.street }}, {{ addr.number }}</p>
                                    <p class="m-0">CEP: {{ addr.zip }}</p>
                                    <p class="m-0">{{ addr.city }}/{{ addr.state }} - {{ addr.country }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="custom-width">
                            <div>
                                <p v-if="!isDefault(addr)" @click="setAsDefault(addr)" class="text-black m-0"><i class="pi pi-circle-off"></i> Tornar padrão</p>
                                <p v-else class="text-info border-bottom border-info m-0"><i class="pi pi-check-circle"></i>Endereço padrão</p>
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-content-end">
                                <ButtonComponent @click="editAddress(addr)" icon="pi pi-pen-to-square" class="my-md-1 text-secondary" text="Editar"/>
                                <ButtonComponent @click="deletAdress(addr.id)" icon="pi pi-trash text-danger" class="my-md-1 text-secondary" text="Excluir"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="fs-5 text-center m-4 fw-light">Você não possui nenhum endereço cadastrado <i class="pi pi-home"></i>
                </p>
            </div>
        </div>
        <div ref="formSection" class="w-100 w-md-50 d-flex flex-column align-items-center">
            <h3>{{ isEditing? 'Editar Endereço' : 'Adicionar Novo Endereço' }}</h3>
            <form @submit.prevent="saveAddress" class="m-2 w-75">
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
                <ButtonComponent type="submit" :text="isEditing? 'ALTERAR' : 'ADICIONAR'" class="btn btn-info"></ButtonComponent>
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
const defaultAddress = computed(() => userStore.defaultAddress);

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
    if(isEditing.value){
        await userStore.changeAddressData(editedAddress.value.id, editedAddress.value);
        window.alert('Endereço alterado com sucesso');
    } else {
        await userStore.postAddress(editedAddress.value);
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
    const confirmation = window.confirm('Tem certeza que deseja excluir esse endereço?');

    if(!confirmation){
        return;
    }

    await userStore.delAddress(id);
    window.alert('endereço deletado');
    await userStore.userAddresses();
}

async function setAsDefault(addr) {
    userStore.turnDefault(addr);
    window.alert('Endereço definido como padrão!');
}

function isDefault(addr){
    return defaultAddress.value?.id === addr.id;
}

onMounted (()=>{
    showUserAddresses()
});
</script>

<style scoped>
    .pi-map-marker{
        font-size: 2em;
    }

    .custom-width{
        width: 150px;
    }
</style>