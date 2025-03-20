<template>
    <div class="banner">
        <div class="banner-content">
            <div>
                <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam laudantium vel.</p>
            </div>
            <img src="../../public/images/image-example.jpeg" alt="">
            <div class="buttons">
                <ButtonComponent text="Shop Now >" class="yellow button"/>
                <ButtonComponent text="See Category" class="white button"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";
</script>

<style scoped>
    .banner{
        background-color: var(--color-purple);
    }

    .banner-content{
        padding: 3em 1em;
        color: var(--color-white);
    }

    .banner-content img{
        display: block;
        place-self: center;
        border-radius: 50%;
        margin: 15px 0 15px 0;
    }

    .buttons{
        display: block;
        place-self: center;
        width: 90%;
    }

    .button{
        margin: 3px;
    }
</style>