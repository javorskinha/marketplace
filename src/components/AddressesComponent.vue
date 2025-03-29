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
            </div>
        </div>
        <div>
            <form @submit.prevent="saveAddress">
                <div class="input-box">
                    <InputComponent v-model="editedAddress.street" type="text" placeholder="Street" required class="input"/>
                </div>
                <div class="input-box">
                    <InputComponent v-model.number="editedAddress.number" type="number" placeholder="Number" required class="input"/>
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

const addresses = ref([]);

const editedAddress = ref({
    street: '',
    number: null,
    zip: '',
    city: '',
    state: '',
    country: ''
})

const isEditing = ref(false);

async function showUserAddresses() {
    const result =  await userStore.userAddresses();
    addresses.value = result;
}

async function saveAddress() {
    if(isEditing.value){
        await userStore.changeAddressData(editedAddress.value.id, editedAddress.value);
        window.alert('Endereço alterado com sucesso');
    } else {
        await userStore.postAddress(editedAddress.value);
    }
}

function editAddress(addr){
    editedAddress.value = { ...addr };
    isEditing.value = true;
}

// function resetForm() {
//     editedAddress.value = {
//         street: '',
//         number: null,
//         zip: '',
//         city: '',
//         state: '',
//         country: ''
//     };
//     isEditing.value = false;
// }

onMounted (showUserAddresses);
</script>