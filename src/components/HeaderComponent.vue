<template>
    <div>
        <nav class="navbar navbar-expand-md bg-white p-0">
            <div class="container-fluid d-flex flex-column p-0">
                <section class="d-flex justify-content-between w-100 p-1 p-md-3 w-md-75 max-width-desktop">
                    <div class="d-flex align-items-center gap-3">
                        <button class="navbar-toggler d-md-none h-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                            <span class="pi pi-bars"></span>
                        </button>
                        <h1 class="d-flex align-items-center"><img src="../../public/images/logo.png" class="w-25 h-25 me-2"><a class="navbar-brand fw-bold fs-3" href="/">Ecobuy</a></h1>
                    </div>
                    <div class="d-none d-md-flex w-50 position-relative ps-4">
                        <InputComponent type="text" placeholder="Buscar" class="w-100"></InputComponent>
                        <i class="pi pi-search position-absolute end-0 top-50 translate-middle"></i>
                    </div>
                    <div class="d-flex align-items-center gap-4 hover">
                        <a href="#favoritos">
                            <i class="pi pi-heart-fill fs-4"></i>
                        </a>
                        <a href="/cart">
                            <i class="pi pi-shopping-bag fs-4"></i>
                        </a>
                        <a href="/account">
                            <i class="pi pi-user fs-4"></i>
                        </a>
                    </div>
                </section>
                <div class="d-none d-md-flex align-items-center bg-dark w-100">
                    <ul class="navbar-nav flex-row gap-3 hover fs-5 max-width-desktop">
                        <li class="nav-item"><a class="nav-link text-white" href="#">Categorias</a></li>
                        <li class="nav-item"><a class="nav-link text-white" href="#">Produtos</a></li>
                        <li class="nav-item"><a class="nav-link text-white" href="#">Ofertas</a></li>
                        <li class="nav-item"><a class="nav-link text-white" href="#">Cupons</a></li>
                        <li class="nav-item"><a class="nav-link text-white" href="#">Frete Grátis</a></li>
                        <li class="nav-item"><a class="nav-link text-white" href="#">Sobre</a></li>
                        <li class="nav-item"><a class="nav-link text-white" href="#">Contato</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="offcanvas vh-100 offcanvas-start w-75 transition" tabindex="-1" id="offcanvasNavbar">
            <div class="offcanvas-header pb-0">
                <h3 class="offcanvas-title fw-bold"><img src="../../public/images/logo.png" class="w-25 h-25 me-2">Ecobuy</h3>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column justify-content-between">
            <div>
                <div  class="position-relative">
                    <InputComponent type="text" placeholder="Buscar"/>
                    <i class="pi pi-search position-absolute end-0 top-50 translate-middle"></i>
                </div>
                <ul class="navbar-nav d-flex flex-column justify-content-around fs-5">
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Categorias</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Produtos</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Ofertas</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Cupons</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Frete Grátis</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Sobre</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Contato</a><i class="pi pi-chevron-right"></i></li>
                </ul>
            </div>
                <a href="/account" class="d-flex flex-column gap-2 mt-3 nav-link">
                <ButtonComponent text="Conta" class="btn btn-outline-secondary bg-info"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
</script>

<style>
    .transition{
        transition: transform 0.7s ease-in-out;
    }

    @media (min-width: 768px) {
        .max-width-desktop {
            max-width: 1500px; /* ou o valor que preferir */
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>