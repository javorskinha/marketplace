<template>
    <button v-bind="$attrs" :type="type" class="btn fw-bold d-flex align-items-center justify-content-center gap-2 w-100 rounded-1">{{ text }}<i v-if="icon" :class="icon"></i></button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String,
    type: String, 
    icon: String
})
</script>