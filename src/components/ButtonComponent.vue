<template>
    <div class="d-grid rounded-0" v-bind="$attrs">
        <button :type="type" class="btn fw-bold d-flex align-items-center justify-content-center gap-2">{{ text }}<i :class="icon"></i></button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String,
    type: String, 
    icon: String
})
</script>

<style>
    button{
        height: 20px;
    }
</style>