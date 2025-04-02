<template>
    <div>
        <div v-for="product in allProducts" :key="product.id">
            <CardComponent 
            :src="getImageUrl(product.image_path)"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            />
        </div>
    </div>
</template>

<script setup>
import CardComponent from './CardComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted } from 'vue';
import { baseURL } from "@/services/HttpService";

const productsStore = useProductsStore();
const allProducts = computed (()=> productsStore.products);

async function getAllProducts() {
    await productsStore.fetchProducts();
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(getAllProducts)
</script>