<template>
    <div class="p-3 bg-light">
        <div class="bg-white p-3  rounded-2">
            <div class="d-flex align-items-center justify-content-between">
                <h2>Perfil de Usuário</h2>
                <div @click="handleLogout"><i class="pi pi-sign-out fs-2"></i></div>
            </div>
            <UserDataComponent />
            <AddressesComponent />
            <div class="d-flex justify-content-end mt-4">
                <ButtonComponent @click="excludeAccount" text="excluir conta" class="bg-danger rounded-2" icon="pi pi-trash"></ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import ButtonComponent from "./ButtonComponent.vue";
import UserDataComponent from "./UserDataComponent.vue";
import AddressesComponent from "./AddressesComponent.vue";

const authStore = useAuthStore();
const userStore = useUserStore();

const handleLogout = ()=>{
    authStore.logout();
}

async function excludeAccount(){
    const confirmation = window.confirm('Tem certesa que deseja excluir sua conta? Esta ação não pode ser desfeita.');

    if(!confirmation){
        return;
    }

    await userStore.delUser();
    handleLogout();

    window.alert('Conta deletada');
}
</script>
