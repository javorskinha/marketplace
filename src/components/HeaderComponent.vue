<template>
    <div class="header">
        <div class="header-section">
            <div class="section section-one">
                <div id="hamburguer-menu">
                    <img src="../../public/images/hamburguer-menu.png" alt="">
                </div>
                <p>S+mark</p>
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
        <!--<div class="header-section">
            <img src="../../public/images/logo.png" alt="" class="logo">
            <h2>S+mark</h2>
        </div>
        -->
    </div>
</template>

<script setup>

</script>

<style scoped>
    .header-section{
        display: flex;
        margin: 1em;
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

    .section p{
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
    }

    #hamburguer-menu img{
        width: 1.7em;
    }

    .name{
        display: flex;
        margin: 1em;
        width: 10em;
        justify-content: space-around;
    }

    nav a{
        display: flex;
        align-items: baseline;
    }

    nav img{
        width: 1.3em;
    }
</style>