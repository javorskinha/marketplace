<template>
    <div class="d-flex justify-content-center success">
        <div :class="{'active' : active}" class="container">
            <div class="form-box login">
                <form @submit.prevent="hadleLogin" class="w-100">
                    <h1 class="mb-3 text-black">Login</h1>
                    <div class="input-box">
                        <InputComponent v-model="email" type="email" placeholder="E-mail" required class="input"/>
                        <i class="pi pi-envelope"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent v-model="password" type="password" placeholder="Senha" required class="input"/>
                        <i class="pi pi-lock"></i>
                    </div>
                    <div class="m-2">
                        <a href="#" class="nav-link"><small>Esqueceu a senha?</small></a>
                    </div>
                    <ButtonComponent text="Login" class="btn btn-primary rounded-1" type="submit"/>
                    <p class="mt-3">Ou faça login com suas redes sociais</p>
                    <div class="fs-3">
                        <a class="m-3" href=""><i class="pi pi-google"></i></a>
                        <a class="m-3" href=""><i class="pi pi-facebook"></i></a>
                        <a class="m-3" href=""><i class="pi pi-instagram"></i></a>
                    </div>
                </form>
            </div>
            <div class="form-box register">
                <form @submit.prevent="hadleRegister" class="w-100">
                    <h1 class="mb-3 text-black">Cadastrar</h1>
                    <div class="input-box">
                        <InputComponent v-model="name" type="text" placeholder="Nome" required class="input"/>
                        <i class="pi pi-user"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent v-model="email" type="email" placeholder="E-mail" required class="input"/>
                        <i class="pi pi-envelope"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent v-model="password" type="password" placeholder="Senha" required class="input"/>
                        <i class="pi pi-lock"></i>
                    </div>
                    <ButtonComponent text="Cadastrar" class="btn btn-primary rounded-1" type="submit"/>
                    <p class="mt-3">Ou cadastre-se com suas redes sociais</p>
                    <div class="fs-3">
                        <a class="m-3" href=""><i class="pi pi-google"></i></a>
                        <a class="m-3" href=""><i class="pi pi-facebook"></i></a>
                        <a class="m-3" href=""><i class="pi pi-instagram"></i></a>
                    </div>
                </form>
            </div>
            <div class="toggle-box" :class="{'active' : active}">
                <div class="toggle-panel toggle-top text-white" :class="{'active' : active}">
                    <h1 class="mb-0">Bem Vindo!</h1>
                    <p class="mt-0">Ainda não possui uma conta?</p>
                    <span @click="changeActive()">
                        <ButtonComponent text="Cadastrar-se" class="btn btn-primary rounded-3"/>
                    </span>
                </div>
                <div class="toggle-panel toggle-bottom text-white" :class="{'active' : active}">
                    <h1>Bem Vindo!</h1>
                    <p>Já possui uma conta?</p>
                    <span @click="changeActive()">
                        <ButtonComponent text="Fazer Login" class="btn btn-primary rounded-3"/>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from 'vue-router';

const active = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

function changeActive(){
    active.value = !active.value;
}

async function hadleLogin() {
    try{
        await authStore.login({ email: email.value, password: password.value});

        window.alert('Login realizado com sucesso');

        router.push('/');

    } catch (error){

        errorMessage.value = 'Não foi possível fazer login. Verifique os dados inseridos.'

        window.alert('Não foi possível fazer login. Verifique os dados inseridos.')
    }
}

async function hadleRegister() {
    try{
        await authStore.register({ name: name.value, email: email.value, password: password.value});

        window.alert('Registro realizado com sucesso');

        router.push('/');

    } catch (error){
        console.error("Erro no registro:", error.response ? error.response.data : error);

        errorMessage.value = 'Não foi possível fazer cadastro. Verifique os dados inseridos.'

        window.alert('Não foi possível fazer cadastro. Verifique os dados inseridos.')
    }
}

</script>

<style scoped>
    .container{
        position: relative;
        width: 90%;
        height: auto;
        min-height: 600px;
        max-width: 500px;
        background-color: #F5F5F5;
        border-radius: 30px;
        box-shadow: 0 0 30px rgba(0, 0, 0, .2);
        margin: 1.5em 0;
        overflow: hidden;
    }

    .form-box {
        position: absolute;
        top: 25%;
        left:5%;
        width: 90%;
        height: 70%;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 0.5em;
        z-index: 1;
        transition: opacity 2s ease, transform 3s ease;
    }

    .login{
        opacity: 1;
        transform: translateX(0);
    }

    .register{
        top: 0;
        opacity: 0;
        transform: translateX(100%);
    }

    .active .login {
        opacity: 0;
        transform: translateX(-100%);
    }

    .active .register {
        opacity: 1;
        transform: translateX(0);
    }

    .input-box{
        position: relative;
        margin: 10px 0;
    }

    .input-box i{
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
    }

    .toggle-box{
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
    }

    .toggle-box::before{
        content: '';
        position: absolute;
        top: -275%;
        width: 100%;
        height: 300%;
        background-color: #1A1A1A;
        border-radius: 70px;
        z-index: 2;
        transition: 1.5s ease-in-out;
    }

    .toggle-box.active::before{
        top:75%;
    }
    
    .toggle-top{
        top: 0;
        transition: 1.3s ease-in-out;
    }

    .toggle-top.active{
        top: -25%;
        transition: 1.3s ease-in-out;
    }

    .toggle-bottom{
        bottom: -25%;
        transition: 1.3s ease-in-out;
    }

    .toggle-bottom.active{
        bottom: 0;
        transition: 1.3s ease-in-out;
    }

    .toggle-panel{
        position: absolute;
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 3;
    }

    .toggle-panel p{
        margin: 10px;
    }

</style>