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

    .purple{
        color: var(--color-white);
        background-color: var(--color-medium-purple);
    }

    .white{
        color: var(--color-medium-purple);
        border: solid 2px var(--color-light-purple);
        background-color: var(--color-white);
    }

    .yellow{
        color: var(--color-purple);
        background-color: var(--color-yellow);
    }
</style>