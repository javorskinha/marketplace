<template>
    <div>
        <div v-for="item in intItem" :key="item.id">
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
import { computed, onMounted, ref } from 'vue';
import { baseURL, getProducts } from "@/services/HttpService";

const orderStore = useOrdersStore();
const intItem = ref([]);

async function showCartItems() {
    await orderStore.fetchCart();
    console.log("Itens do carrinho:", orderStore.cart);
    
    const products = await Promise.all(orderStore.cart.items.map(async (item) => {
        try{
            const product = await getProducts(null, null, item.product_id);
            return{...item, ...product};
        } catch (error){
            console.error(`erro ao buscar produto ID ${item.product_id}`)
        }
    }))

    intItem.value = products;
    console.log("Itens detalhados:", intItem.value);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(()=>{
    showCartItems();
})
</script>

const items = computed (()=> orderStore.cart);