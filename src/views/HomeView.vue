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
import BannerComponent from '../components/elements/BannerComponent.vue';
import CategoriesComponent from '@/components/elements/CategoriesComponent.vue';
import EnphasisComponent from '@/components/elements/EnphasisComponent.vue';
import UpdatedComponent from '@/components/elements/UpdatedComponent.vue';
</script>
