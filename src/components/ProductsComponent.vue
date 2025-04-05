<template>
    <div class="container my-4">
        <div class="row g-4">
            <div v-for="product in allProducts" :key="product.id" class="col-12 col-sm-6 col-lg-3" >
                <CardComponent
                :src="getImageUrl(product.image_path)"
                :name="product.name"
                :description="product.description"
                :price="product.price"
                @addtocart="addItem(product)"
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
import { useOrdersStore } from '@/stores/OrdersStore';

const productsStore = useProductsStore();
const orderStore = useOrdersStore();
const allProducts = computed (()=> productsStore.products);

async function getAllProducts() {
    await productsStore.fetchProducts();
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function addItem(product) {
    const itemData = {
        "product_id": product.id,
        "quantity": 1,
        "unit_price": product.price
    };

    await orderStore.updateCartItem(itemData, true);
}

onMounted(getAllProducts)
</script>