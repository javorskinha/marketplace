<template>
    <div class="categories w-75 m-auto">
        <div class="text-center my-5">
            <h2 class="fw-bold color-black">Compre por Categorias</h2>
            <p class="text-secondary">Navegue por nossas categorias e encontre o que você precisa.</p>
        </div>
        <div class="container">
            <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                <div v-for="category in allCategories" :key="category.id" class="col">
                    <router-link :to="{name: 'categoryProducts', params: {categoryId: category.id}}" class="col text-decoration-none">
                        <div class="card text-center border shadow-sm p-3">
                            <img :src="getImageUrl(category.image_path)" alt="" class="mb-3 mx-auto">
                            <h6 class="fw-semibold mb-0 text-black">{{ category.name }}</h6>
                        </div>
                    </router-link>
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
    await productsStore.fetchCategories(17);
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
        width: auto;
        height: 5em;
    }

    .col:hover{
        transform: scale(1.05);
        transition: 0.3s ease-in-out;
    }
</style>