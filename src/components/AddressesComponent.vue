<template>
    <div class="m-1 border border-success rounded-3 p-1 pt-3">
        <div>
            <h3 class="ms-3">Endereços Registrados</h3>
            <div v-if="addresses.length > 0">
                <div v-for="addr in addresses" :key="addr.id" class="m-2 border border-success p-3 rounded-3">
                    <div class="fs-5 d-flex align-items-center justify-content-around">
                        <div>
                            <div class="d-flex">
                                <p>{{ addr.street }}</p>
                                <p>, {{ addr.number }}</p>
                            </div>
                            <div class="d-flex">
                                <p>{{ addr.city }}</p>
                                <p>/{{ addr.state }}</p>
                                <p>- {{ addr.country }}</p>
                            </div>
                        </div>
                        <i class="pi pi-map-marker"></i>
                        <div>
                            <ButtonComponent 
                                v-if="!isDefault(addr)" 
                                @click="setAsDefault(addr)" 
                                text="Usar como padrão" 
                                class="btn btn-outline-primary w-100 mt-2"/>
                            <p v-else class="text-primary mt-2 text-center">Endereço padrão</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <ButtonComponent @click="editAddress(addr)" text="Editar" class="btn btn-primary w-100 me-1"/>
                        <ButtonComponent @click="deletAdress(addr.id)" text="Excluir" class="btn btn-secondary w-100 ms-1"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="fs-5 text-center m-4 fw-light">Você não possui nenhum endereço cadastrado <i class="pi pi-home"></i>
                </p>
            </div>
        </div>
        <div ref="formSection">
            <h3  class="ms-3">{{ isEditing? 'Alterar Endereço Registrado' : 'Adicionar Novo Endereço' }}</h3>
            <form @submit.prevent="saveAddress" class="m-2">
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
</style>