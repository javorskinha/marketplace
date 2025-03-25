<template>
    <div class="login-register">
        <div :class="{'active' : active}" class="container">
            <div class="form-box login" :class="{hidden: active}">
                <form action="">
                    <h1>Login</h1>
                    <div class="input-box">
                        <InputComponent type="text" placeholder="Username" required class="input"/>
                        <i class="pi pi-user"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent type="password" placeholder="Password" required class="input"/>
                        <i class="pi pi-lock"></i>
                    </div>
                    <div class="forgot-link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <ButtonComponent text="Login" class="yellow" type="submit"/>
                    <p>Or login with social platforms</p>
                    <div class="social-icons">
                        <a href=""><i class="pi pi-google"></i></a>
                        <a href=""><i class="pi pi-facebook"></i></a>
                        <a href=""><i class="pi pi-instagram"></i></a>
                    </div>
                </form>
            </div>
            <div class="form-box register" :class="{hidden: !active}">
                <form action="">
                    <h1>Registration</h1>
                    <div class="input-box">
                        <InputComponent type="text" placeholder="Username" required class="input"/>
                        <i class="pi pi-user"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent type="email" placeholder="Email" required class="input"/>
                        <i class="pi pi-envelope"></i>
                    </div>
                    <div class="input-box">
                        <InputComponent type="password" placeholder="Password" required class="input"/>
                        <i class="pi pi-lock"></i>
                    </div>
                    <ButtonComponent text="Register" class="yellow" type="submit"/>
                    <p>Or register with social platforms</p>
                    <div class="social-icons">
                        <a href=""><i class="pi pi-google"></i></a>
                        <a href=""><i class="pi pi-facebook"></i></a>
                        <a href=""><i class="pi pi-instagram"></i></a>
                    </div>
                </form>
            </div>
            <div class="toggle-box" :class="{'active' : active}">
                <div class="toggle-panel toggle-top" :class="{'active' : active}">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    <ButtonComponent text="Register" class="purple btn" @click="changeActive()"/>
                </div>
                <div class="toggle-panel toggle-bottom" :class="{'active' : active}">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <ButtonComponent text="Login" class="purple btn" @click="changeActive()"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';

const active = ref(false);

function changeActive(){
    active.value = !active.value;
}
</script>

<style scoped>
    .login-register{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 85vh;
        background: linear-gradient(90deg, var(--color-super-light-purple), var(--color-light-purple));
    }

    .container{
        position: relative;
        width: 90%;
        height: auto;
        min-height: 600px;
        max-width: 500px;
        background-color: var(--color-white);
        border-radius: 30px;
        box-shadow: 0 0 30px rgba(0, 0, 0, .2);
        margin: 1.5em 0;
        overflow: hidden;
    }

    .form-box {
        position: absolute;
        top: 25%;
        left: 1;
        width: 90%;
        height: 70%;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 0.5em;
        z-index: 1;
    }

    .register{
        top: 0;
    }

    form{
        width: 100%;
    }

    .input-box{
        width: 100%;
        position: relative;
        margin: 10px 0;
    }

    .input{
        width: 90%;
    }

    .input-box i{
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
    }

    .forgot-link{
        margin: -15px 0 15px;
    }

    .forgot-link a{
        color: var(--color-purple);
    }

    form p{
        margin: 15px 0;
    }

    .social-icons a{
        display: inline-flex;
        padding: 5px;
        font-size: 1.5em;
        border: 2px solid var(--color-light-purple);
        border-radius: 8px;
        margin: 0 8px;
    }

    .toggle-box{
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .toggle-box::before{
        content: '';
        position: absolute;
        top: -275%;
        width: 100%;
        height: 300%;
        background-color: var(--color-light-purple);
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

    .btn{
        width: 40%;
    }

    .hidden{
        display: none;
        }
</style>