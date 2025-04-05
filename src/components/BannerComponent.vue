<template>
    <div class="bg-image-custom bg-white d-flex flex-column justify-content-between px-3 py-3 text-dark shadow-lg">
        <div class="content-box">
            <h3 class="fw-bold display-6 text-shadow">Smartphone Motorola Razr 50</h3>
            <p class="lead text-shadow">Tela dobrável 6,9" pOLED e externa 3,6” Moto AI camera IPX8</p>
        </div>
        <div class="d-flex gap-3">
            <ButtonComponent text="Shop Now" class="btn shadow"/>
            <ButtonComponent text="See Category" class="btn shadow"/>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";
</script>

<style scoped>
    .bg-image-custom{
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(226, 231, 235, 0) 50%),url('/images/1.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 80%;
        height: 55vh;
    }

    .content-box{
        width: 50%;
    }
</style>
