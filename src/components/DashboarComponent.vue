<template>
    <div>
        <h1>aqui está a dashboard</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium illum at in numquam dolorum deleniti ex rerum, deserunt laudantium doloremque placeat facilis incidunt debitis tempore, nihil ipsa, cupiditate quis asperiores</p>
        <button @click="handleLogout">logout</button>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();

const handleLogout = ()=>{
    authStore.logout();
}
</script>