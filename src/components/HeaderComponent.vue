<template>
    <div class="header">
        <div class="header-section">
            <div class="section section-one">
                <div id="hamburguer-menu" @click="openClose">
                    <i class="pi pi-bars"></i>
                </div>
                <h2>S+mart</h2>
            </div>
            <nav class="section section-two">
                <a href="#favoritos">
                    <i class="pi pi-heart-fill"></i>
                </a>
                <a href="#favoritos">
                    <i class="pi pi-cart-plus"></i>
                </a>
                <a class="account" href="#">Account</a>
            </nav>
        </div>
        <div class="header-section-menu" :class="menuOpened ? 'menu-open' : 'menu-close'">
            <div>
                <div class="header-search">
                    <div class="section-menu">
                        <img src="../../public/images/logo.png" alt="" class="logo">
                        <h2>S+mart</h2>
                        <img id="x" src="../../public/images/exit.png" alt="" @click="openClose">
                    </div>
                    <input type="text" placeholder="Search">
                </div>
                <ul class="options">
                    <li>Shop <i class="pi pi-chevron-right"></i></li>
                    <li>Categories <i class="pi pi-chevron-right"></i></li>
                    <li>Account <i class="pi pi-chevron-right"></i></li>
                    <li>About <i class="pi pi-chevron-right"></i></li>
                </ul>
            </div>
            <div class="section-menu-log">
                <ButtonComponent text="Sign In" class="purple button"/>
                <ButtonComponent text="Create Account" class="white button"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const menuOpened = ref(false);

function openClose(){
    menuOpened.value = !menuOpened.value;
}
</script>

<style scoped>
    .header{
        position: relative;
    }

    .header-section{
        display: flex;
        padding: 1em;
        justify-content: space-between;
        align-items: center;
    }

    .section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .section-one{
        width: 10em;
    }

    .section-two{
        width: 3em;
    }

    .account{
        display: none;
    }

    .header img {
        width: 2em;
        height: 2em;
    }

    #hamburguer-menu{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-super-light-purple);
        width: 3em;
        height: 3em;
        border-radius: 5px;
        cursor: pointer;
    }

    #hamburguer-menu img{
        width: 1.7em;
    }

    .header-section-menu{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--color-super-light-purple);
        position: absolute;
        left: 0;
        top: 0;
        width: 70vw;
        height: 100vh;
    }

    .menu-close{
        transform: translateX(-100%);
        transition: transform 0.5s ease-in-out;
    }

    .menu-open{
        transform: translateX(0);
        transition: transform 0.5s ease-in-out;
    }

    .section-menu{
        display: flex;
        margin: 1.5em;
        width: 13em;
        justify-content: space-around;
        align-items: center;
    }

    #x{
        width: 15px;
        height: 15px;
    }

    .header-section-menu input {
        width: 85%;
        height: 3em;
        font-family: var(--font-secondary);
        font-size: 1em;
        border: solid 2px var(--color-super-light-purple);
        border-radius: 5px;
        margin: 10px;
    }

    .header-section-menu input::placeholder{
        padding: 0 15px 0 15px;
        background-image: url('../../public/images/lupa.png');
        background-repeat: no-repeat;
        background-position: 95% ;
    }

    li {
        display: flex;
        justify-content: space-between;
        padding: 1em;
        font-family: var(--font-main);
        border-bottom: solid 1px var(--color-super-light-purple);
        cursor: pointer;
    }

    li:hover{
        color: var(--color-light-purple);
    }

    .options img{
        width: 15px;
        height: 15px;
    }

    .section-menu-log{
        display: block;
    }

    .button{
        display: block;
        place-self: center;
        margin: 5px;
    }

    @media screen and (min-width: 600px) {
        .section-one, .section-menu-log, #x, .options{
            display: none;
        }

        .header{
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-around;
        }

        .section-two i{
            font-size: 1.3em;
        }

        .section-two{
            width: 100%;
            margin: 1em;
        }

        .account{
            display: block;
            color: var(--color-purple);
        }

        .header-section{
            width: 25%;
            padding: 0;
        }

        .header-section-menu{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: var(--color-white);
            position: relative;
            left: 0;
            top: 0;
            width: 80vw;
            height: 15vh;
        }

        .menu-open, .menu-close{transform: translateX(0);}

        .header-search{
            display: flex;
            align-items: center;
        }

        .header-section-menu input{
            height: 2em;
        }
        }
</style>