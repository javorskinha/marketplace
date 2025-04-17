<template>
    <div class="h-100">
        <div v-if="authStore.isAuthenticated">
            <DashboarComponent />
            <UpdatedComponent />
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
import UpdatedComponent from "@/components/UpdatedComponent.vue";

const authStore = useAuthStore();
</script>