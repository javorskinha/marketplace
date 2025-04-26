<template>
    <div class="container my-4">
        <div class="row g-4 m-auto">
            <h3>Todos os Produtos</h3>
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
import CardComponent from './elements/CardComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted, ref } from 'vue';
import { baseURL } from "@/services/HttpService";

const productsStore = useProductsStore();
const allProducts = computed (()=> productsStore.products);
const categoryProducts = ref([]);

async function getAllProducts() {
    await productsStore.fetchProducts(17);
};

async function getCategoryProducts(categoryId) {
    const result = await productsStore.fetchProducts(null, categoryId);
    categoryProducts.value = result;
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(getAllProducts)
</script>