<template>
    <button :class="style">{{ text }}</button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String,
    style: String
})
</script>