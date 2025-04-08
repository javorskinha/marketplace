<template>
    <CartComponent />
    <EnphasisComponent 
    title="Você Também Pode Gostar"
    button="VER MAIS"
    />
    <UpdatedComponent />
</template>

<script setup>
import CartComponent from '@/components/CartComponent.vue';
import UpdatedComponent from '@/components/UpdatedComponent.vue';
import EnphasisComponent from '@/components/EnphasisComponent.vue';
</script>