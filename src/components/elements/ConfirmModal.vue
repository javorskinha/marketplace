<template>
    <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="cancel"></button>
                </div>
                <div class="modal-body">
                    <p>{{ message }}</p>
                </div>
                <div class="modal-footer">
                    <button @click="confirm" class="btn btn-outline-primary">Sim, confirmar.</button>
                    <button @click="cancel" class="btn btn-outline-danger">Não, cancelar.</button>
                </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: Boolean,
    title: String,
    message: String
});

const emit = defineEmits(['confirm', 'cancel']);

function confirm(){
    emit('confirm');
};

function cancel(){
    emit('cancel');
};
</script>