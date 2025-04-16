<template>
    <div class="container">
        <div class="row bg-white m-3 w-100 justify-content-center">
            <div class="col-md-8 content-box bg-image-1 rounded-3 d-flex align-items-center">
                <div class="d-flex flex-column w-50 p-5 text-white">
                    <h3 class="fw-bold display-6">Organicos Saudáveis e Frescos</h3>
                    <div class="border-start border-2 ps-1 mb-4">
                        <p class="lead text-shadow">Ofertas com <span class="bg-warning p-1 rounded-2">30%off</span></p>
                        <p><small>Entrega grátis a partir de R$150,00</small></p>
                    </div>
                    <div class="me-4">
                        <ButtonComponent text="Comprar Agora"  class="btn bg-white rounded-5 text-primary p-2" icon="pi pi-chevron-right"/>
                    </div>
                </div>
            </div>
            <div class="col-md-4 d-flex flex-column justify-content-between">
                <div class="bg-image-2 custom-height rounded-2 d-flex justify-content-between">
                    <div class="d-flex flex-column w-50 justify-content-center h-75 align-items-start p-3">
                        <p class="mb-1"><small>Super Outono</small></p>
                        <h3 class="fw-bold">75%OFF</h3>
                        <p class="text-secondary">Frutas e Vegetais</p>
                        <ButtonComponent text="Ver Mais" icon="pi pi-chevron-right" class="text-primary"/>
                    </div>
                </div>
                <div class="bg-image-3 custom-height rounded-2 text-white">
                    <div class="d-flex flex-column w-75 align-items-center m-auto justify-content-center h-100">
                        <p><small>SUPER PROMO</small></p>
                        <h3 class="fw-bold">Produtos Especiais</h3>
                        <h3 class="fw-bold">Ofertas do mês</h3>
                        <ButtonComponent text="Ver Mais" icon="pi pi-chevron-right" class="text-primary"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";
</script>

<style scoped>
    .bg-image-1{
        background-image: url('/images/1.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 60%;
        height: 55vh;
    }

    .bg-image-2{
        background-image: url('/images/2.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 60%;
    }

    .bg-image-3{
        background-image: url('/images/3.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 60%;
    }

    .custom-height{
        height: 48%;
    }

    .content-box{
        width: 50%;
    }
</style>
