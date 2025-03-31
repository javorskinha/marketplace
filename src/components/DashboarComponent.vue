<template>
    <div class="dashboard">
        <div class="dashboard-content">
            <div class="dashboard-header">
                <h2>Perfil de Usuário</h2>
                <div @click="handleLogout"><i class="pi pi-sign-out"></i></div>
            </div>
            <UserDataComponent />
            <AddressesComponent />
            <ButtonComponent @click="excludeAccount" text="EXCLUIR CONTA" class="red"></ButtonComponent>
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
    await userStore.delUser(authStore.token);
    
    handleLogout();

    window.alert('Conta deletada');
}
</script>

<style scoped>
    .dashboard{
        background-color: var(--color-super-light-purple);
        padding: 1em 1em;
    }

    .dashboard-content{
        background-color: var(--color-white);
        border-radius: 15px;
        padding: 1em;
    }

    .dashboard-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .pi-sign-out{
        font-size: 1.5em;
    }

    .red{
        width: 90px;
        height: 20px;
        font-size: 10px;
        border-radius: 2px;
        background-color: red;
    }
</style>