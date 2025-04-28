<template>
    <div class="mb-2 d-flex align-items-baseline">
        <label :for="id" class="form-control mx-3 h-75 border border-white">{{ label }}</label>
        <input
        :id="id"
        type="date"
        :value="modelValue"
        @input="onInput"
        class="form-control mx-3 h-75"
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: String,
    label: String,
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>