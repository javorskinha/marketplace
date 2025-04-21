<template>
    <div class="h-100 d-flex align-items-center justify-content-center">
        <form @submit.prevent="newModerator">
            <h3>Criar Usuário Moderador</h3>
            <div class="position-relative">
                <InputComponent v-model="modData.name" type="text" placeholder="Nome" required class="input"/>
                <i class="pi pi-user position-absolute end-0 top-50 translate-middle"></i>
            </div>
            <div class="position-relative">
                <InputComponent v-model="modData.email" type="email" placeholder="Email" required class="input"/>
                <i class="pi pi-envelope position-absolute end-0 top-50 translate-middle"></i>
            </div>
            <div class="position-relative">
                <InputComponent v-model="modData.password" type="password" placeholder="Senha" required class="input"/>
                <i class="pi pi-lock position-absolute end-0 top-50 translate-middle"></i>
            </div>
            <ButtonComponent text="Criar" type="submit" class="btn btn-primary"/>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import InputComponent from './InputComponent.vue';
import { useUserStore } from '@/stores/UserStore';
import ButtonComponent from './ButtonComponent.vue';

const userStore = useUserStore();

const modData = ref({
    'name': '',
    'email': '',
    'password': '',
    'role': 'MODERATOR'
})

async function newModerator() {
    await userStore.createModerator(modData.value);
}
</script>