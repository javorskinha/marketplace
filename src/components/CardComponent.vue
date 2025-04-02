<template>
    <div class="card">
        <img :src="src" :alt="alt">
        <h3>{{ title }}</h3>
        <!--avaliação-->
        <p>{{ description }}</p>
        <p>{{ costs }}</p>
        <ButtonComponent text="Add to Cart" class="gray button"/>
        <ButtonComponent text="Buy Now" class="white button"/>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
</script>

<style scoped>
    .card{
        display: grid;
    }

    .button{
        margin: 5px 10px;
    }
</style>