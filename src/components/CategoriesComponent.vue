<template>
    <div class="categories">
        <div class="text">
            <h2>Comprar por Categorias</h2>
            <p>Navegue por nossas categorias e encontre o que você precisa.</p>
        </div>
        <div class="cards">
            <div v-for="category in allCategories" :key="category.id" class="card">
                <p>{{ category.name }}</p>
                <img :src="getImageUrl(category.image_path)" alt="">
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
    .categories{
        background-color: var(--color-light-gray);
        border-radius: 10px;
        margin: 0.5em;
        text-align: center;
    }

    .text{ 
        padding: 1em;
    }

    .cards{
        display: grid;
        grid-template-columns: 50% 50%;
    }

    .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--color-white);
        border-radius: 8px;
        margin: 10px;
        height: 8em;
    }

    img{
        width: 5em;
        height: 5em;
    }
</style>