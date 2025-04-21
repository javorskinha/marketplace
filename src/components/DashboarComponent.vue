<template>
    <div class="container-fluid">
        <div class="row min-vh-75">
            <aside class="col-12 col-md-3 col-lg-2 p-4 border m-4">
                <h3 class="mb-4">Olá, {{ userStore.user.name.split(' ')[0] }}</h3>
                <nav class="nav flex-column gap-2">
                    <router-link to="/dashboard/perfil" class="nav-link"><i class="pi pi-user me-2"></i>Meu Perfil</router-link>
                    <router-link to="/dashboard/enderecos" class="nav-link"><i class="pi pi-map-marker"></i>Endereços</router-link>
                    <router-link to="/dashboard/carrinho" class="nav-link"><i class="pi pi-shopping-cart me-2"></i>Carrinho</router-link>
                    <!--<router-link to="/dashboard/favoritos" class="nav-link"><i class="pi pi-heart me-2"></i>Favoritos</router-link>-->
                    <router-link to="/dashboard/pedidos" class="nav-link"><i class="pi pi-truck me-2"></i>Pedidos</router-link>
                    <div v-if="userAdm || userModerator" class="mt-4">
                        <h6 class="text-muted">Administrar</h6>
                        <router-link to="/dashboard/produtos" class="nav-link"><i class="pi pi-box me-2"></i>Produtos</router-link>
                    </div>
                    <div v-if="userAdm">
                        <router-link to="/dashboard/categorias" class="nav-link"><i class="pi pi-tags me-2"></i>Categorias</router-link>
                        <router-link to="/dashboard/moderator" class="nav-link"><i class="pi pi-user-plus me-2"></i>Criar Moderador</router-link>
                    </div>
                    <button @click="handleLogout" class="btn text-danger m-0 mt-3 d-flex justify-content-end align-items-center">Logout<i class="pi pi-sign-out ms-2"></i></button>
                </nav>
            </aside>
            <main class="col bg-white p-0 p-md-4 border m-1 m-md-4 ms-md-0">
                <Router-View />
            </main>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { ref } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const userAdm = ref(true);
const userModerator = ref(true);

const handleLogout = ()=>{
    authStore.logout();
}
</script>
