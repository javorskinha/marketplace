<template>
    <div>
        <div class="p-5 pb-3 d-flex w-50" style="margin-left: 170px;">
            <h2 class="text-black fs-3">{{ category?.name }}</h2>
            <button class="btn text-info hover d-flex align-items-center" @click.prevent="goToCategory(props.categoryId)">Ver Mais<i class="pi pi-arrow-right ms-2"></i></button>
        </div>
        <div class="row g-4 mx-5 d-flex justify-content-center">
            <div v-for="product in categoryProducts" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex">
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
import { defineProps, computed } from 'vue';
import CardComponent from './CardComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from "@/services/HttpService";
import { useRouter } from 'vue-router';

const props = defineProps({
    categoryId: Number
})

const productsStore = useProductsStore();
const router = useRouter();

const categoryProducts = computed(() => {
    return productsStore.products.filter(product => product.category_id === props.categoryId).slice(0,5);
});
const category = computed(() => {
    return productsStore.categories.find(cat => cat.id === props.categoryId);
});

const goToCategory = (categoryId) =>{
    router.push({ name: 'products', query: { categoryId } });
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};
</script>

<style scoped>
    .hover:hover{
        transform: scale(1.05);
        transition: 0.3s ease-in-out;
    }
</style>