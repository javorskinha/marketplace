<template>
    <div>
        <div v-if="authStore.isAuthenticated">
            <DashboarComponent />
        </div>
        <div v-else>
            <LoginComponent />
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import LoginComponent from '@/components/LoginComponent.vue';
import DashboarComponent from "@/components/DashboarComponent.vue";

const authStore = useAuthStore();
</script>