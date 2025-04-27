<template>
    <div>
        <div class="p-5 pb-3 text-center">
            <h2 class="text-black">{{ title }}</h2>
        </div>
        <div class="row g-4 mx-5 d-flex justify-content-center">
            <div v-for="product in randomProducts" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex">
                <CardComponent
                :id="product.id"
                :src="getImageUrl(product.image_path)"
                :name="product.name"
                :description="product.description"
                :price="product.price"
                />
            </div>
        </div>
        <a href="/products" class="nav-link mt-3">
            <ButtonComponent :text="button" class="btn btn-info" icon="pi pi-chevron-right"/>
        </a>
    </div>
</template>

<script setup>
import { computed, onMounted, defineProps } from 'vue';
import CardComponent from './CardComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from "@/services/HttpService";

const props = defineProps({
    title: String,
    paragraph: String,
    button: String
})

const productsStore = useProductsStore();

console.log('Produtos da store:', productsStore.products);

const randomProducts = computed (()=> getRandomProducts(productsStore.products))

function getRandomProducts(products, quantity = 5){
    const result = [...products].sort(()=> 0.4 - Math.random());
    return result.slice(0,quantity);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(async ()=>{
    await productsStore.fetchProducts(17);
})
</script>