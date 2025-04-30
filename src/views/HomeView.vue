<template>
    <BannerComponent />
    <CategoriesComponent :categoryId="202"/>
    <CategoriesComponent :categoryId="201"/>
    <EnphasisComponent 
    title="Produtos em destaque"
    button="VEJA TODOS OS PRODUTOS"
    />
    <UpdatedComponent />
</template>

<script setup>
import BannerComponent from '../components/elements/BannerComponent.vue';
import CategoriesComponent from '@/components/elements/CategoriesComponent.vue';
import EnphasisComponent from '@/components/elements/EnphasisComponent.vue';
import UpdatedComponent from '@/components/elements/UpdatedComponent.vue';
</script>
