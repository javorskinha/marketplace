<template>
    <div class="p-3">
        <h5>{{ title }}</h5>
        <form @submit.prevent="handleSubmit">
            <div v-for="(field, index) in fields" :key="index">
                <InputComponent 
                v-if="field.type === 'text' || field.type === 'number'"
                v-model="formData[field.model]"
                :id="field.model"
                :label="field.label"
                :type="field.type"
                :placeholder="field.placeholder"
                />
                <DatePicker 
                v-if="field.type === 'date'"
                v-model="formData[field.model]"
                :id="field.model"
                :label="field.label"
                />
                <SelectComponent
                v-if="field.type === 'select'" 
                v-model="formData[field.model]"
                :id="field.model"
                :label="field.label"
                :options="field.options"
                valueField="id" 
                labelField="name" 
                defaultOption="Selecione"
                />
            </div>
            <ButtonComponent text="Salvar" type="submit" icon="pi pi-save" class="btn btn-primary"/>
        </form>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import DatePicker from './DatePicker.vue';
import InputComponent from './InputComponent.vue';
import SelectComponent from './SelectComponent.vue';
import { defineProps, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  title: String,
  fields: Array,
  formData: Object,
});

const emit = defineEmits();

const handleSubmit = () => {
  const hasEmptyField = Object.values(props.formData).some(value => {
    return value === '' || value === null || value === undefined;
  });

  if (hasEmptyField) {
    toast.error('Por favor, preencha todos os campos.');
    return;
  }
  
  emit('submit', props.formData);
};
</script>