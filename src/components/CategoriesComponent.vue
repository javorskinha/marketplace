<template>
    <div class="categories">
        <div class="text">
            <h2>Comprar por Categorias</h2>
            <p>Navegue por nossas categorias e encontre o que você precisa.</p>
        </div>
        <div class="cards">
            <div v-for="category in allCategories" :key="category.id" class="card">
                <p>{{ category.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/ProductsStore";
import { onMounted, ref } from "vue";

const productsStore = useProductsStore();
const allCategories = ref([]);

async function getAllCategories() {
    const result = productsStore.categories;
    console.log(result)

    allCategories.value = result;
}

onMounted(getAllCategories)
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
        align-items: center;
        justify-content: center;
        background-color: var(--color-white);
        border-radius: 8px;
        margin: 10px;
        height: 3em;
    }
</style>