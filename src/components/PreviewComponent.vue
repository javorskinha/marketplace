<template>
    <div class="preview">
        <CardComponent />
        <a href="/categories">
            <ButtonComponent text="Ver Todos os Produtos >" class="blue button"/>
        </a>
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