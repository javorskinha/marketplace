<template>
    <button :type="type" :class="style">{{ text }}</button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String,
    style: String,
    type: String
})
</script>

<style scoped>
    button{
        font-family: var(--font-main);
        font-weight: 600;
        box-shadow: 1px 1px 1px rgb(158, 151, 151);
        width: 91%;
        height: 40px;
    }

    .gray{
        color: var(--color-white);
        background-color: var(--color-gray);
    }

    .white{
        color: var(--color-gray);
        border: solid 2px var(--color-light-beige);
        background-color: var(--color-white);
    }

    .blue{
        color: var(--color-dark-blue);
        background-color: var(--color-blue);
    }
</style>