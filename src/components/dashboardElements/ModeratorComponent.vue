<template>
    <div class="h-100 d-flex flex-column align-items-center justify-content-center">
        <div class="m-2">
            <h5 class="text-danger">*Atenção</h5>
            <p>Usuários moderadores tem permissão para criar, atualizar e excluir tags, criar e atualizar produtos, gerir estoque e atualizar produtos.</p>
        </div>
        <form @submit.prevent="newModerator" class="w-md-50 my-2 mx-2 border border-success rounded-1 p-4 h-100 d-flex flex-column justify-content-between">
            <div>
                <h3 class="text-center">Criar Usuário Moderador</h3>
                <div class="position-relative my-3">
                    <InputComponent v-model="modData.name" type="text" placeholder="Nome" required class="input"/>
                    <i class="pi pi-user position-absolute end-0 top-50 translate-middle"></i>
                </div>
                <div class="position-relative my-3">
                    <InputComponent v-model="modData.email" type="email" placeholder="Email" required class="input"/>
                    <i class="pi pi-envelope position-absolute end-0 top-50 translate-middle"></i>
                </div>
                <div class="position-relative my-3">
                    <InputComponent v-model="modData.password" type="password" placeholder="Senha" required class="input"/>
                    <i class="pi pi-lock position-absolute end-0 top-50 translate-middle"></i>
                </div>
            </div>
            <div class="d-flex text-secondary m-auto">
                <input type="checkbox" name="confirm" class="me-1" v-model="checked">
                <label for="confirm"><small>Estou ciente e de acordo com os termos e permissões.</small></label>
            </div>
            <ButtonComponent text="Criar" type="submit" class="btn btn-primary"/>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import InputComponent from '../elements/InputComponent.vue';
import { useUserStore } from '@/stores/UserStore';
import ButtonComponent from '../elements/ButtonComponent.vue';
import { useToast } from 'vue-toastification';

const userStore = useUserStore();
const checked = ref(false);
const toast = useToast();

const modData = ref({
    'name': '',
    'email': '',
    'password': '',
    'role': 'MODERATOR'
})

async function newModerator() {
    if (!checked.value) {
        toast.warning('É necessário concordar com os termos.');
        return;
    }
    await userStore.createModerator(modData.value);
}
</script>