<template>
    <div>
        <label :for="id" class="form-label">{{ label }}</label>
        <input type="file" name="" :id="id" class="form-control" @change="handleFileChange">
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps ({
    id: String,
    label: String,
    modelValue: File
});

const emit = defineEmits(['update:modelValue']);

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
    emit('update:modelValue', file);
    }
}
</script>