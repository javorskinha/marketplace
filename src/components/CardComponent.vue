<template>
    <div class="card">
        <img :src="src" :alt="alt">
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ price }}</p>
        <ButtonComponent text="Add to Cart" class="gray button"/>
        <ButtonComponent text="Buy Now" class="white button"/>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import { defineProps } from 'vue';

const props = defineProps({
    src: String,
    alt: String,
    name: String,
    description: String,
    price: String
})
</script>

<style scoped>
    .card{
        width: 25em;
        height: 45em;

    }

    .button{
        margin: 5px 10px;
    }

    img{
        width: 100%;
    }
</style>