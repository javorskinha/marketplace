<template>
    <BannerComponent />
    <CategoriesComponent />
    <EnphasisComponent 
    title="Produtos em destaque"
    paragraph="Descubra nossa seleção de produtos premium."
    button="VEJA TODOS OS PRODUTOS"
    />
    <UpdatedComponent />
</template>

<script setup>
import BannerComponent from '../components/BannerComponent.vue';
import CategoriesComponent from '@/components/CategoriesComponent.vue';
import EnphasisComponent from '@/components/EnphasisComponent.vue';
import UpdatedComponent from '@/components/UpdatedComponent.vue';
</script>
