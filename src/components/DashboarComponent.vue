<template>
    <div>
        <ButtonComponent @click="handleLogout" text="logout" class="white"></ButtonComponent>
        <UserDataComponent />
        <ButtonComponent @click="excludeAccount" text="Excluir conta" class="purple"></ButtonComponent>
        <AddressesComponent />
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
    await userStore.delUser(authStore.token);
    
    handleLogout();

    window.alert('Conta deletada');
}
</script>

<style>

</style>