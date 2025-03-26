<template>
    <button @click="handleLogout">logout</button>
    <BannerComponent />
    <CategoriesComponent />
    <EnphasisComponent />
    <PreviewComponent />
    <UpdatedComponent />
</template>

<script setup>
import BannerComponent from '../components/BannerComponent.vue';
import CategoriesComponent from '@/components/CategoriesComponent.vue';
import EnphasisComponent from '@/components/EnphasisComponent.vue';
import PreviewComponent from '@/components/PreviewComponent.vue';
import UpdatedComponent from '@/components/UpdatedComponent.vue';
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const handleLogout = ()=>{
    authStore.logout();
    router.push('/login');
}
</script>
