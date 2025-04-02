<template>
    <div class="categories">
        <div class="text">
            <h2>Shop By Categories</h2>
            <p>Explore our wide range of categories to find exactly what you're looking for.</p>
        </div>
        <div class="cards">
            <div v-for="categorie in allCategories" :key="categorie.id" class="card">
                <p>{{ categorie.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCategories } from "@/services/HttpService.js";
import { onMounted, ref } from "vue";

const allCategories = ref([]);

async function getAllCategories() {
    const result = await getCategories()
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