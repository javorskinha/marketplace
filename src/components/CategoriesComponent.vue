<template>
    <div class="categories">
        <div class="text-center my-5">
            <h2 class="fw-bold">Comprar por Categorias</h2>
            <p class="text-muted">Navegue por nossas categorias e encontre o que você precisa.</p>
        </div>
        <div class="container">
            <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                <div v-for="category in allCategories" :key="category.id" class="col">
                    <div class="card text-center border-0 shadow-sm p-3">
                        <img :src="getImageUrl(category.image_path)" alt="" class="mb-3 mx-auto">
                        <h6 class="fw-semibold mb-0">{{ category.name }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/ProductsStore";
import { onMounted, computed } from "vue";
import { baseURL } from "@/services/HttpService";

const productsStore = useProductsStore();
const allCategories = computed (()=> productsStore.categories);

async function getAllCategories() {
    await productsStore.fetchCategories();
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(() =>{
    getAllCategories();
})
</script>

<style scoped>
    img{
        width: 5em;
        height: 5em;
    }
</style>