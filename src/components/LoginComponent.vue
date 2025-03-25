<template>
    <div class="login-register">
        <div class="container">
            <div class="form-box login">
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
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
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
        min-height: 500px;
        background-color: var(--color-white);
        border-radius: 30px;
        box-shadow: 0 0 30px rgba(0, 0, 0, .2);
    }

    .form-box {
        position: absolute;
        right: 0;
        left: 0;
        width: 90%;
        height: 80%;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 30px;
    }

    form{
        width: 100%;
    }

    .input-box{
        width: 100%;
        position: relative;
        margin: 20px 0;
    }

    .input{
        width: 90%;
    }

    .input-box i{
        position: absolute;
        right: 25px;
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
</style>