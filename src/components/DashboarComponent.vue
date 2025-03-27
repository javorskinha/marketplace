<template>
    <div>
        <div v-if="userStore.user">
            <p>{{ userStore.user.name }}</p>
            <p>{{ userStore.user.id }}</p>
            <p>{{ userStore.user.email }}</p>
            <p>{{ userStore.user.role }}</p>
        </div>
        <button @click="handleLogout">logout</button>
        <button @click="showUserData">user</button>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";

const authStore = useAuthStore();
const userStore = useUserStore();

const handleLogout = ()=>{
    authStore.logout();
}

async function showUserData(){
    await userStore.userData(authStore.token);

    console.log('dados carregados:',userStore.user);
}

onMounted(showUserData);
</script>