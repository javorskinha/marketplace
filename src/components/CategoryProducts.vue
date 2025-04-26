<template>
    <div class="container my-4">
        <div class="row g-4 m-auto">
            <div v-for="product in categoryProducts" :key="product.id" class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center" >
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
import { onMounted, ref, watch } from 'vue';
import { baseURL } from "@/services/HttpService";
import { useRoute } from 'vue-router';

const productsStore = useProductsStore();
const categoryProducts = ref([]);
const route = useRoute();

const getCategoryProducts = async (categoryId) => {
    const result = await productsStore.fetchProducts(null, categoryId);
    categoryProducts.value = result;
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(() => {
    getCategoryProducts(route.params.categoryId);
});

watch(
    () => route.params.categoryId,
    (newCategoryId) => {
    getCategoryProducts(newCategoryId);
    }
);
</script>