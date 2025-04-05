<template>
    <nav class="navbar navbar-expand-md bg-light px-3">
        <div class="container-fluid">
            <div class="d-flex align-items-center gap-3">
                <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                    <span class="pi pi-bars "></span>
                </button>
                <a class="navbar-brand" href="/">S+mart</a>
            </div>
            
            <div class="d-none d-md-flex align-items-center gap-4">
                <div class="d-flex">
                    <InputComponent type="text" placeholder="Buscar"></InputComponent>
                </div>
                <ul class="navbar-nav flex-row gap-3">
                    <li class="nav-item"><a class="nav-link" href="#">Categorias</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Ofertas</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Conta</a></li>
                </ul>
                <a href="/account" class="d-flex gap-2">
                    <ButtonComponent text="Entrar"/>
                    <ButtonComponent text="Criar Conta"/>
                </a>
            </div>
            <div class="d-flex align-items-center gap-3">
                <a href="#favoritos">
                    <i class="pi pi-heart-fill fs-5"></i>
                </a>
                <a href="/cart">
                    <i class="pi pi-cart-plus fs-5"></i>
                </a>
            </div>
        </div>
    </nav>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">S+mart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <InputComponent type="text" placeholder="Buscar" />
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="#">Categorias</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Ofertas</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Conta</a></li>
        </ul>
        <a href="/account" class="d-flex gap-2 mt-3">
          <ButtonComponent text="Entrar" />
          <ButtonComponent text="Criar Conta" />
        </a>
      </div>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
</script>