<template>
    <div class="d-flex flex-column justify-content-center">
        <div class="d-flex">
            <div v-if="userStore.user" class="w-50 d-flex flex-column align-items-center">
                <div class="perfil-image d-flex align-items-center justify-content-center rounded-circle border border-success">
                    <img :src="getImageUrl(userStore.user.image_path)" alt="" class="w-100 h-100">
                </div>
                <div>
                    <h3>{{ userStore.user.name }}</h3>
                </div>
                <div class="fs-5">
                    <div class="d-flex">
                        <p class="me-3">E-mail: </p>
                        <p>{{ userStore.user.email }}</p>
                    </div>
                    <div class="d-flex">
                        <p class="me-3">Tipo de Conta: </p>
                        <p>{{ userStore.user.role }}</p>
                    </div>
                </div>
            </div>
            <div class="w-50 m-auto">
                <h4>Alterar Dados:</h4>
                <form @submit.prevent="alterUserData" class="w-75">
                    <label for="InputComponent">Nova foto de perfil:</label>
                    <div class="d-flex align-items-center">
                        <InputComponent type="file" @change="handleImage"/>
                        <ButtonComponent type="submit" text="Enviar" class="bg-primary h-50 rounded-1 ms-2 d-flex text-black" @click="updateImage"></ButtonComponent>
                    </div>
                    <div class="position-relative">
                        <InputComponent v-model="name" type="text" placeholder="Username" required class="input"/>
                        <i class="pi pi-pen-to-square position-absolute end-0 top-50 translate-middle"></i>
                    </div>
                    <div class="position-relative">
                        <InputComponent v-model="email" type="email" placeholder="Email" required class="input"/>
                        <i class="pi pi-pen-to-square position-absolute end-0 top-50 translate-middle"></i>
                    </div>
                    <ButtonComponent type="submit" text="ALTERAR" class=""></ButtonComponent>
                </form>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="excludeAccount" class="btn"><small>Exculir Conta</small><i class="pi pi-trash text-danger ms-1"></i></button>
        </div>
    </div>
</template>

<script setup>
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";
import { baseURL } from "@/services/HttpService";

const authStore = useAuthStore();
const userStore = useUserStore();
const name = ref('');
const email = ref('');

async function showUserData(){
    await userStore.userData(authStore.token);

    if(userStore.user){
        name.value = userStore.user.name;
        email.value = userStore.user.email;
    }

    console.log('dados carregados:',userStore.user);
}

async function alterUserData() {
    const updatedUser = {
        name: name.value,
        email: email.value,
    }

    await userStore.changeUserData(updatedUser);
    console.log('dados alterados',userStore.user)

    alter.value = false;
}

const userImage = ref('')

function handleImage(event){
    userImage.value = event.target.files[0];
}

async function updateImage() {
    const formData = new FormData();
    formData.append('image', userImage.value);

    await userStore.userPic(formData);

    await showUserData();
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function excludeAccount(){
    const confirmation = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');

    if(!confirmation){
        return;
    }

    await userStore.delUser();
    handleLogout();

    window.alert('Conta deletada');
}

onMounted(showUserData);
</script>

<style>
    .perfil-image{
        width: 250px;
        height: 250px;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .perfil-image img{
        object-fit: cover;
    }
</style>