<template>
    <div class="header">
        <div class="header-section">
            <div class="section section-one">
                <div id="hamburguer-menu">
                    <img src="../../public/images/hamburguer-menu.png" alt="">
                </div>
                <h2>S+mart</h2>
            </div>
            <nav class="section section-two">
                <a href="#favoritos">
                    <img src="../../public/images/favorites.png" alt="">
                </a>
                <a href="#favoritos">
                    <img src="../../public/images/cart.png" alt="">
                </a>
            </nav>
        </div>
        <div class="header-section-menu">
            <div>
                <div class="section-menu">
                    <img src="../../public/images/logo.png" alt="" class="logo">
                    <h2>S+mark</h2>
                </div>
                <input type="text" placeholder="Search">
                <ul class="options">
                    <li>Shop<img src="../../public/images/right.png" alt=""></li>
                    <li>Categories<img src="../../public/images/right.png" alt=""></li>
                    <li>Account<img src="../../public/images/right.png" alt=""></li>
                    <li>About<img src="../../public/images/right.png" alt=""></li>
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
import ButtonComponent from './ButtonComponent.vue';
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
        width: 5em;
    }

    h2{
        font-family: var(--font-main);
        font-weight: 600;
        font-size: 1.5em;
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
        width: 55%;
        height: 100vh;
    }

    .section-menu{
        display: flex;
        margin: 1.5em;
        width: 10em;
        justify-content: space-around;
    }

    .header-section-menu input {
        width: 85%;
        height: 3em;
        font-family: var(--font-secondary);
        font-size: 1em;
        border: solid 2px var(--color-light-purple);
        border-radius: 15px;
        margin-left: 30px;
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
</style>