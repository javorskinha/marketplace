<template>
    <div class="card">
        <img :src="src" :alt="alt">
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ price }}</p>
        <ButtonComponent 
        text="Adicionar ao Carrinho" 
        class="gray button"
        @click="$emit('addtocart')"
        />
        <ButtonComponent text="Comprar Agora" class="white button"/>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    src: String,
    alt: String,
    name: String,
    description: String,
    price: String
})

const emit = defineEmits (['addtocart'])
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