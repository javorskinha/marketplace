<template>
    <div>
        <input :type="type" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form-control border-success my-2 shadow-sm">
    </div>
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
