<template>
    <div class="container my-4">
        <div class="row g-4 m-auto">
            <div v-for="product in allProducts" :key="product.id" class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center" >
                <CardComponent
                :id="product.id"
                :src="getImageUrl(product.image_path)"
                :name="product.name"
                :description="product.description"
                :price="product.price"
                />
            </div>
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
    await productsStore.fetchProducts(17);
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(getAllProducts)
</script>