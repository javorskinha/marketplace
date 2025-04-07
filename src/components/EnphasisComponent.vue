<template>
    <div>
        <div class="p-5 text-center">
            <h2>Produtos em destaque</h2>
            <p>Descubra nossa seleção de produtos premium.</p>
        </div>
        <div v-for="product in randomProducts" :key="product.id">
                <CardComponent
                :src="getImageUrl(product.image_path)"
                :name="product.name"
                :description="product.description"
                :price="product.price"
                @addtocart="addItem(product)"
                />
            </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from "@/services/HttpService";

const productsStore = useProductsStore();

const randomProducts = computed (()=> getRandomProducts(productsStore.products));

function getRandomProducts(products, quantity = 4){
    const result = [...products].sort(()=> 0.5 - Math.random());
    return result.slice(0,quantity);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};
</script>