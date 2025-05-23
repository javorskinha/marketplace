<template>
    <div class="d-flex flex-column justify-content-center m-3">
        <div class="d-flex flex-column flex-md-row">
            <div v-if="authStore?.user" class="w-100 w-md-50 d-flex flex-column align-items-center">
                <div class="perfil-image d-flex align-items-center justify-content-center rounded-circle border border-success">
                    <img :src="getImageUrl(authStore.user.image_path)" alt="" class="w-100 h-100">
                </div>
                <div>
                    <h3>{{ authStore.user.name }}</h3>
                </div>
                <div class="fs-5">
                    <div class="d-flex">
                        <p class="me-3">E-mail: </p>
                        <p>{{ authStore.user.email }}</p>
                    </div>
                    <div class="d-flex">
                        <p class="me-3">Tipo de Conta: </p>
                        <p>{{ getRoleName(authStore.user.role) }}</p>
                    </div>
                </div>
            </div>
            <div class="w-100 w-md-50 m-auto">
                <h4>Alterar Dados:</h4>
                <form @submit.prevent="alterUserData" class="">
                    <label for="InputComponent">Nova foto de perfil:</label>
                    <div class="d-flex align-items-center">
                        <InputComponent type="file" @change="handleImage" class="w-100"/>
                        <div>
                            <ButtonComponent type="submit" text="Enviar" class="btn btn-primary h-50 rounded-1 ms-2 d-flex text-black" @click="updateImage"></ButtonComponent>
                        </div>
                    </div>
                    <label for="InputComponent">Editar Dados do Perfil:</label>
                    <div class="position-relative">
                        <InputComponent v-model="name" type="text" placeholder="Username" required class="input"/>
                        <i class="pi pi-pen-to-square position-absolute end-0 top-50 translate-middle"></i>
                    </div>
                    <div class="position-relative">
                        <InputComponent v-model="email" type="email" placeholder="Email" required class="input"/>
                        <i class="pi pi-pen-to-square position-absolute end-0 top-50 translate-middle"></i>
                    </div>
                    <ButtonComponent type="submit" text="ALTERAR" class="btn btn-outline-info"></ButtonComponent>
                </form>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="confirmExclusion" class="btn"><small>Excluir Conta</small><i class="pi pi-trash text-danger ms-1"></i></button>
        </div>
        <ConfirmModal :show="showConfirmModal" title="Confirmar Exclusão" message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita." 
        @confirm="onConfirm" 
        @cancel="onCancel" />
    </div>
</template>

<script setup>
import InputComponent from "../elements/InputComponent.vue";
import ButtonComponent from "../elements/ButtonComponent.vue";
import ConfirmModal from "../elements/ConfirmModal.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { ref, onMounted } from "vue";
import { baseURL } from "@/services/HttpService";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
const showConfirmModal = ref(false);
const toast = useToast();
const name = ref('');
const email = ref('');

async function alterUserData() {
    const updatedUser = {
        name: name.value,
        email: email.value,
    }

    await userStore.changeUserData(updatedUser);
    authStore.user.name = updatedUser.name;
    authStore.user.email = updatedUser.email;
}

const userImage = ref('')

function handleImage(event){
    userImage.value = event.target.files[0];
}

async function updateImage() {
    if (!userImage.value) return;

    const formData = new FormData();
    formData.append('image', userImage.value);

    try {
        const updatedUser = await userStore.userPic(formData);

        authStore.user.image_path = updatedUser.image_path;

        toast.success('Imagem atualizada com sucesso!');
    } catch (error) {
        toast.error('Erro ao atualizar imagem');
        console.error('Erro ao enviar imagem', error);
    }
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

function getRoleName(role) {
    const roles = {
        CLIENT: "Cliente",
        ADMIN: "Administrador",
        MODERATOR: "Moderador"
    };
    return roles[role] || role;
}

async function confirmExclusion(){
    showConfirmModal.value = true;
}

function onConfirm(){
    showConfirmModal.value = false;
    excludeAccount();
}

function onCancel(){
    showConfirmModal.value = false;
}

async function excludeAccount(){
    await userStore.delUser();
    authStore.logout();
    router.push('/')
    toast('Conta deletada');
}

onMounted(() => {
    if (authStore.user) {
        name.value = authStore.user.name;
        email.value = authStore.user.email;
    }
});
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