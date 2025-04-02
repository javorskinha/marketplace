<template>
    <input :type="type" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    modelValue: String,
    type: String,
    placeholder: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
    input {
        width: 85%;
        height: 2em;
        font-family: var(--font-secondary);
        font-size: 1em;
        border: solid 2px var(--color-light-beige);
        margin: 10px;
        padding: 5px 15px 5px 10px;
        box-shadow: 1px 1px 1px rgb(158, 151, 151);
    }

</style>