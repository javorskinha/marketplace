<template>
    <div class="header">
        <div class="header-section">
            <div class="section section-one">
                <div id="hamburguer-menu" @click="openClose">
                    <i class="pi pi-bars"></i>
                </div>
                <a href="/">
                    <h2>S+mart</h2>
                </a>
            </div>
            <nav class="section section-two">
                <a href="#favoritos">
                    <i class="pi pi-heart-fill"></i>
                </a>
                <a href="/cart">
                    <i class="pi pi-cart-plus"></i>
                </a>
                <a class="account" href="/account">Account</a>
            </nav>
        </div>
        <div class="header-section-menu" :class="menuOpened ? 'menu-open' : 'menu-close'">
            <div>
                <div class="header-search">
                    <div class="section-menu">
                        <a href="/">
                            <h2>S+mart</h2>
                        </a>
                        <i id="x" class="pi pi-times" @click="openClose"></i>
                    </div>
                    <div class="search-box">
                        <InputComponent type="text" placeholder="Buscar" />
                        <i class="pi pi-search"></i>
                    </div>
                </div>
                <ul class="options">
                    <li>Categorias <i class="pi pi-chevron-right"></i></li>
                    <li>Cupons <i class="pi pi-chevron-right"></i></li>
                    <li>Ofertas <i class="pi pi-chevron-right"></i></li>
                    <li>Minhas Compras <i class="pi pi-chevron-right"></i></li>
                    <li>Minha Conta <i class="pi pi-chevron-right"></i></li>
                </ul>
            </div>
            <div class="section-menu-log">
                <a href="/account">
                    <ButtonComponent text="Entrar" class="gray button"/>
                    <ButtonComponent text="Criar Conta" class="white button"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';

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

    #hamburguer-menu{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-light-gray);
        width: 3em;
        height: 3em;
        border-radius: 3px;
        cursor: pointer;
    }

    .header-section-menu{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--color-light-gray);
        position: absolute;
        left: 0;
        top: 0;
        width: 70vw;
        height: 100vh;
        z-index: 4;
    }

    .menu-close{
        transform: translateX(-100%);
        transition: transform 0.5s ease-in-out;
    }

    .menu-open{
        transform: translateX(0);
        transition: transform 0.5s ease-in-out;
    }

    .header-search{
        width: 95%;
    }

    .section-menu{
        display: flex;
        margin: 1.5em 0.5em;
        justify-content: space-between;
        align-items: center;
    }

    .section-menu a{
        display: flex;
        width: 8em;
        justify-content: space-around;
    }

    .search-box{
        position: relative;
    }

    .pi-search{
        position: absolute;
        right: 15px;
        top: 25px;
    }

    li {
        display: flex;
        justify-content: space-between;
        padding: 1em;
        font-family: var(--font-main);
        border-bottom: solid 1px var(--color-light-gray);
        cursor: pointer;
    }

    li:hover{
        color: var(--color-light-beige);
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
            color: var(--color-dark-blue);
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
            border-color: var(--color-light-gray);
        }
        }
</style>