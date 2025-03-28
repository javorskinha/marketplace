<template>
    <div>
        <div v-if="userStore.user">
            <p>{{ userStore.user.name }}</p>
            <p>{{ userStore.user.id }}</p>
            <p>{{ userStore.user.email }}</p>
            <p>{{ userStore.user.role }}</p>
        </div>
        <ButtonComponent @click="handleLogout" text="logout" class="white"></ButtonComponent>
        <div>
            <form @submit.prevent="alterUserData">
                <div class="input-box">
                        <InputComponent v-model="name" type="text" placeholder="Username" required class="input"/>
                        <i class="pi pi-user"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent v-model="email" type="email" placeholder="Email" required class="input"/>
                        <i class="pi pi-envelope"></i>
                    </div>
                <ButtonComponent type="submit" text="Alterar" class="yellow"></ButtonComponent>
            </form>
        </div>
        <ButtonComponent @click="excludeAccount" text="Excluir conta" class="purple"></ButtonComponent>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import ButtonComponent from "./ButtonComponent.vue";
import InputComponent from "./InputComponent.vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const name = ref('');
const email = ref('');

const handleLogout = ()=>{
    authStore.logout();
}

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

    await userStore.changeUserData(authStore.token, updatedUser);
    console.log('dados alterados',userStore.user)
}

async function excludeAccount(){
    await userStore.delUser(authStore.token);
    
    handleLogout();

    window.alert('Conta deletada');
}

onMounted(showUserData);
</script>

<style>

</style>