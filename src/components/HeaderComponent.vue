<template>
    <div>
        <nav class="navbar navbar-expand-md bg-light px-3">
            <div class="container-fluid">
                <div class="d-flex align-items-center gap-3">
                    <button class="navbar-toggler d-md-none h-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                        <span class="pi pi-bars"></span>
                    </button>
                    <h1><a class="navbar-brand fw-bold fs-3" href="/">S+mart</a></h1>
                </div>
        
                <div class="d-none d-md-flex align-items-center gap-4 justify-content-between w-100">
                    <div class="w-50 position-relative ps-4">
                        <InputComponent type="text" placeholder="Buscar"></InputComponent>
                        <i class="pi pi-search position-absolute end-0 top-50 translate-middle"></i>
                    </div>
                    <div class="d-flex align-items-center">
                        <ul class="navbar-nav flex-row gap-3 hover fs-5">
                            <li class="nav-item"><a class="nav-link" href="#">Categorias</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Ofertas</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Cupons</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Frete Grátis</a></li>
                        </ul>
                        <a href="/account" class="nav-link ps-5">
                            <ButtonComponent text="Entrar" class="hover"/>
                            <ButtonComponent text="Cadastrar" class="hover"/>
                        </a>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3 hover">
                    <a href="#favoritos">
                        <i class="pi pi-heart-fill fs-5"></i>
                    </a>
                    <a href="/cart">
                        <i class="pi pi-cart-plus fs-5"></i>
                    </a>
                </div>
            </div>
        </nav>
        <div class="offcanvas vh-100 offcanvas-start w-75 transition" tabindex="-1" id="offcanvasNavbar">
            <div class="offcanvas-header pb-0">
                <h3 class="offcanvas-title fw-bold">S+mart</h3>
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
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Ofertas</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Cupons</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Frete Grátis</a><i class="pi pi-chevron-right"></i></li>
                </ul>
            </div>
                <a href="/account" class="d-flex flex-column gap-2 mt-3 nav-link">
                <ButtonComponent text="Entrar" class="btn btn-outline-primary"/>
                <ButtonComponent text="Criar Conta" class="btn btn-outline-secondary bg-info"/>
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
</style>