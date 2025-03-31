<template>
    <div>
        <div v-if="userStore.user" class="user-all-data">
            <div class="user-data">
                <div class="data">
                    <p class="data-name">Nome: </p>
                    <p>{{ userStore.user.name }}</p>
                </div>
                <div class="data">
                    <p class="data-name">E-mail: </p>
                    <p>{{ userStore.user.email }}</p>
                </div>
                <div class="data">
                    <p class="data-name">Conta: </p>
                    <p>{{ userStore.user.role }}</p>
                </div>
            </div>
        </div>
        <div class="alter-form">
            <ButtonComponent @click="alterData" text="Alterar Dados" class="white"/>
            <div v-if="alter" class="form">
                <h3>Novos Dados:</h3>
                <form @submit.prevent="alterUserData">
                    <div class="input-box">
                        <InputComponent v-model="name" type="text" placeholder="Username" required class="input"/>
                        <i class="pi pi-pen-to-square"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent v-model="email" type="email" placeholder="Email" required class="input"/>
                        <i class="pi pi-pen-to-square"></i>
                    </div>
                    <ButtonComponent type="submit" text="ALTERAR" class="yellow"></ButtonComponent>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const name = ref('');
const email = ref('');
const alter = ref(false);

function alterData(){
    alter.value = !alter.value;
}

async function showUserData(){
    await userStore.userData(authStore.token);

    if(userStore.user){
        name.value = userStore.user.name;
        email.value = userStore.user.email;
    }

    console.log('dados carregados:',userStore.user);
}

async function alterUserData() {
    const updatedUser = {
        name: name.value,
        email: email.value,
    }

    await userStore.changeUserData(authStore.token, updatedUser);
    console.log('dados alterados',userStore.user)

    alter.value = false;
}

onMounted(showUserData);
</script>

<style scoped>
    .user-all-data{
        margin: 1em 0;
    }

    .user-data{
        font-size: 1.2em;
    }

    .data{
        display: flex;
        margin: 0.9em 2em 0.9em 0.2em;
        border-bottom: solid 1px var(--color-light-purple);
    }

    .data-name{
        width: 5em;
    }

    .alter-form{
        text-align: center;
    }

    .form{
        border: solid 1px var(--color-light-purple);
        border-radius: 5px;
        margin: 1em 0;
        padding: 1em ;
    }
    
    .form h3{
        text-align: left;
        margin-left: 0.7em;
    }

    .input-box{
        position: relative;
    }

    .input-box i{
        position: absolute;
        right: 20px;
        top: 25px;
        font-size: 1.2em;
    }

    .yellow{
        width: 94%;
        height: 30px;
    }
</style>