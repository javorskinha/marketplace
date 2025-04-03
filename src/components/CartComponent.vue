<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <CardComponent
            :src="getImageUrl(item.image_path)"
            :name="item.name"
            :description="item.description"
            :price="item.price"
            />
        </div>
    </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import CardComponent from './CardComponent.vue';
import { computed, onMounted } from 'vue';
import { baseURL } from "@/services/HttpService";

const orderStore = useOrdersStore();
const items = computed (()=> orderStore.cart);

async function showCartItems() {
    await orderStore.fetchCart();
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(()=>{
    showCartItems();
})
</script>

{
	"user_id": 17,
	"id": 7,
	"created_at": "2025-04-03T17:25:02.885616"
}