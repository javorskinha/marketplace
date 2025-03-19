<template>
    <div class="banner">
        <div>
            <div v-for="categorie in allCategories" :key="categorie.id">
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