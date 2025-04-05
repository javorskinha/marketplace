<template>
    <div class="container my-4">
        <div class="row g-4">
            <div v-for="item in intItem" :key="item.id" class="col-12 col-sm-6 col-lg-3">
                <CardComponent
                :src="getImageUrl(item.image_path)"
                :name="item.name"
                :description="item.description"
                :price="item.price"
                @addtocart="removeItem(item.id)"
                />
                <input type="number" min="1"
                v-model.number="item.quantity"
                @change="alterQuantity(item)"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import CardComponent from './CardComponent.vue';
import InputComponent from './InputComponent.vue';
import { onMounted, ref } from 'vue';
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

async function alterQuantity(item) {
    await orderStore.updateCartItem({product_id: item.product_id}, false, item.quantity);
    await showCartItems();
}

async function removeItem(itemId) {
    await orderStore.updateCartItem({ id: itemId});
    intItem.value = intItem.value.filter(item => item.id !== itemId);
    await showCartItems();
}

onMounted(()=>{
    showCartItems();
})
</script>
