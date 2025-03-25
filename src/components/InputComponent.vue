<template>
    <input :type="type" :placeholder="placeholder">
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    type: String,
    placeholder: String
})
</script>

<style scoped>
    input {
        width: 85%;
        height: 2em;
        font-family: var(--font-secondary);
        font-size: 1em;
        border: solid 2px var(--color-light-purple);
        border-radius: 5px;
        margin: 10px;
        padding: 5px 15px 5px 10px;
    }

</style>