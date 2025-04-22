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
                    <div class="d-flex align-items-center gap-4">
                        <a href="#favoritos" class="nav-link text-black hover">
                            <i class="pi pi-heart-fill fs-4"></i>
                        </a>
                        <a href="/cart" class="nav-link text-black hover">
                            <i class="pi pi-shopping-bag fs-4"></i>
                        </a>
                        <a href="/account" class="nav-link text-black hover">
                            <i class="pi pi-user fs-4"></i>
                        </a>
                    </div>
                </section>
                <div class="d-none d-md-flex align-items-center bg-dark w-100">
                    <ul class="navbar-nav flex-row gap-3 fs-5 max-width-desktop">
                        <li class="nav-item dropdown position-relative">
                            <a class="nav-link costum-color dropdown-toggle" href="#">Categorias</a>
                            <ul class="dropdown-menu hover">
                                <li v-for="category in allCategories" :key="category.id"><a href="#" class="nav-link dropdown-item" @click.prevent="goToCategory(category.id)">{{ category.name }}</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link costum-color" href="/products">Produtos</a></li>
                        <li class="nav-item"><a class="nav-link costum-color" href="#">Ofertas</a></li>
                        <li class="nav-item"><a class="nav-link costum-color" href="#">Cupons</a></li>
                        <li class="nav-item"><a class="nav-link costum-color" href="#">Frete Grátis</a></li>
                        <li class="nav-item"><a class="nav-link costum-color" href="#">Sobre</a></li>
                        <li class="nav-item"><a class="nav-link costum-color" href="#">Contato</a></li>
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
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2" @click="toggleDropdown">
                        <a class="nav-link pb-0" href="#">Categorias</a><i class="pi" :class="isOpen? 'pi-chevron-up' : 'pi-chevron-down'"></i>
                    </li>
                    <transition name="dropdown">
                        <li v-if="isOpen">
                            <ul>
                                <li v-for="category in allCategories" :key="category.id">
                                    <a href="#" class="nav-link" @click.prevent="goToCategory(category.id)">{{ category.name }}</a>
                                </li>
                            </ul>
                        </li>
                    </transition>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="/products">Produtos</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Ofertas</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Cupons</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Frete Grátis</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Sobre</a><i class="pi pi-chevron-right"></i></li>
                    <li class="d-flex align-items-center justify-content-between border-bottom mb-2"><a class="nav-link pb-0" href="#">Contato</a><i class="pi pi-chevron-right"></i></li>
                </ul>
            </div>
                <a href="/account" class="d-flex flex-column gap-2 mt-3 nav-link">
                <ButtonComponent text="Acessar" class="btn btn-primary"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { useRouter } from 'vue-router';
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';

const isOpen = ref(false);
const router = useRouter();
const productsStore = useProductsStore();
const allCategories = computed(()=> productsStore.categories);

const goToCategory = (categoryId) =>{
    router.push({ name: 'categoryProducts', params: { categoryId } });
}

function toggleDropdown(){
    isOpen.value = !isOpen.value;
}

onMounted (() => {
    productsStore.fetchCategories(17);
})
</script>

<style>
    .transition{
        transition: transform 0.7s ease-in-out;
    }

    @media (min-width: 768px) {
        .max-width-desktop {
            max-width: 1500px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .dropdown:hover .dropdown-menu{
        display: block;
        margin-top: 0;
    }

    .dropdown-menu{
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #1A1A1A;
    }

    .dropdown-item{
        color: white;
    }

    .costum-color{
        color: white;
    }

    .costum-color:hover{
        color: #00b207;
    }

    .dropdown-enter-active,
    .dropdown-leave-active {
        transition: all 1s ease;
        overflow: hidden;
    }

    .dropdown-enter-from,
    .dropdown-leave-to {
        opacity: 0;
        transform: translateY(-5px);
        max-height: 0;
    }

    .dropdown-enter-to,
    .dropdown-leave-from {
        opacity: 1;
        transform: translateY(0);
        max-height: 500px;
    }
</style>