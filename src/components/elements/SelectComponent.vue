<template>
    <div>
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        <select :id="id" :value="modelValue" :required="required" @input="onInput" class="w-75 ms-2 border border-success rounded-2">
            <option :value="defaultOption">{{ defaultOption }}</option>
            <option v-for="option in options" :key="option[valueField]" :value="option[valueField]">{{ option[labelField] }}</option>
        </select>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: String, Number,
    options: Array,
    valueField: String,
    labelField: String,
    label: String,
    id: String,
    required: Boolean,
    defaultOption: String
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>