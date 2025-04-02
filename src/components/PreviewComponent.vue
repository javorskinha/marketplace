<template>
    <div class="preview">
        <CardComponent />
        <ButtonComponent text="View All Products >" class="blue button"/>
    </div>
</template>

<script setup>
import CardComponent from './CardComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
</script>

<style scoped>
    .preview{
        display: grid;
    }

    .button{
        width: 40%;
    }
</style>