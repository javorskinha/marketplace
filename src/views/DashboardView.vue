<template>
    <DashboardComponent/>
    <EnphasisComponent 
    title="Produtos em destaque"
    button="VEJA TODOS OS PRODUTOS"
    />
    <UpdatedComponent />
</template>

<script setup>
import DashboardComponent from '@/components/DashboardComponent.vue';
import EnphasisComponent from '@/components/elements/EnphasisComponent.vue';
import UpdatedComponent from '@/components/elements/UpdatedComponent.vue';
</script>
