<template>
    <div class="container-fluid">
        <div class="d-md-none p-2 pt-4 border-bottom bg-white border-top mt-3">
            <div class="d-flex align-items-top justify-content-between">
                <h4 class="m-0">Olá, {{ firstName }}</h4>
                <button @click="handleLogout" class="btn btn-sm text-danger m-0 d-block w-25">
                Logout <i class="pi pi-sign-out ms-1"></i>
                </button>
            </div>
            <nav class="nav gap-3 justify-content-between pt-4">
                    <router-link to="/dashboard/perfil" class="p-1"><i class="pi pi-user text-black fs-3"></i></router-link>
                    <router-link to="/dashboard/enderecos" class="p-1"><i class="pi pi-map-marker text-black fs-3"></i></router-link>
                    <router-link to="/dashboard/carrinho" class="p-1"><i class="pi pi-shopping-cart text-black fs-3"></i></router-link>
                    <router-link to="/dashboard/pedidos" class="p-1"><i class="pi pi-truck text-black fs-3"></i></router-link>
                    <router-link v-if="userModerator || userAdm" to="/dashboard/produtos" class="p-1"><i class="pi pi-box text-black fs-3"></i></router-link>
                    <router-link v-if="userAdm" to="/dashboard/categorias" class="p-1"><i class="pi pi-tags text-black fs-3"></i></router-link>
                    <router-link v-if="userAdm" to="/dashboard/moderator" class="p-1"><i class="pi pi-user-plus text-black fs-3"></i></router-link>
            </nav>
        </div>
        <div class="row min-vh-75">
            <div class="d-none d-md-flex justify-content-end my-1">
                <ButtonComponent @click="handleLogout" class="d-flex justify-content-end w-25 btn text-danger align-items-center">Logout<i class="pi pi-sign-out ms-2"></i></ButtonComponent>
            </div>
            <aside class="d-none d-md-block col-12 col-md-3 col-lg-2 p-4 border m-4 mt-0">
                <h3 class="mb-4">Olá, {{ firstName }}</h3>
                <nav class="nav flex-column gap-2">
                    <router-link to="/dashboard/perfil" class="nav-link"><i class="pi pi-user me-2"></i>Meu Perfil</router-link>
                    <router-link to="/dashboard/enderecos" class="nav-link"><i class="pi pi-map-marker"></i> Endereços</router-link>
                    <router-link to="/dashboard/carrinho" class="nav-link"><i class="pi pi-shopping-bag me-2"></i>Sacola</router-link>
                    <!--<router-link to="/dashboard/favoritos" class="nav-link"><i class="pi pi-heart me-2"></i>Favoritos</router-link>-->
                    <router-link to="/dashboard/pedidos" class="nav-link"><i class="pi pi-truck me-2"></i>Pedidos</router-link>
                    <div v-if="userAdm || userModerator" class="mt-4">
                        <h6 class="text-muted">Administrar</h6>
                        <router-link to="/dashboard/produtos" class="nav-link"><i class="pi pi-box me-2"></i>Produtos</router-link>
                        <router-link to="/dashboard/descontos" class="nav-link"><i class="pi pi-percentage me-2"></i>Descontos</router-link>
                        <router-link to="/dashboard/cupons" class="nav-link"><i class="pi pi-gift me-2"></i>Cupons</router-link>
                    </div>
                    <div v-if="userAdm">
                        <router-link to="/dashboard/categorias" class="nav-link"><i class="pi pi-tags me-2"></i>Categorias</router-link>
                        <router-link to="/dashboard/moderator" class="nav-link"><i class="pi pi-user-plus me-2"></i>Criar Moderador</router-link>
                    </div>
                </nav>
            </aside>
            <main class="col bg-white p-0 p-md-4 border m-1 m-md-4 ms-md-0 mt-md-0">
                <Router-View />
            </main>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { useAuthStore } from "@/stores/AuthStore";
import { computed } from "vue";

const authStore = useAuthStore();
const userAdm = computed(()=> authStore.user.role === 'ADMIN');
const userModerator = computed(()=> authStore.user.role === 'MODERATOR');

const firstName = computed(()=>{
    return authStore.user?.name?.split(' ')[0] ?? 'Usuário';
})

const handleLogout = ()=>{
    authStore.logout();
    router.push('/')
}
</script>
