<template>
    <div class="card shadow-sm" :id="id">
        <div class="position-relative">
            <img :src="src" class="card-img-top" :alt="alt">
            <span class="badge bg-danger position-absolute top-0 start-0 m-2">novo{{ marker }}</span>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title">{{ name }}</h5>
                <p class="card-text text-muted small card-text-limit">{{ description }}</p>
            </div>
            <div>
                <p class="card-text fw-bold fs-5 text-primary">R$ {{ price }}</p>
                <div class="d-flex flex-column gap-2">
                    <ButtonComponent
                    :text="isInCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'"
                    class="btn btn-info"
                    @click="toggleCart()"
                    icon="pi pi-shopping-cart"
                    />
                    <ButtonComponent text="Lista de Desejos" class="btn btn-outline-secondary" icon="pi pi-heart"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import { defineProps, computed, toRef } from 'vue';
import { useOrdersStore } from '@/stores/OrdersStore';

const orderStore = useOrdersStore();

const props = defineProps({
    id: Number,
    src: String,
    alt: String,
    name: String,
    description: String,
    price: String, 
    marker: String
})

console.log(orderStore.cart.items);

const isInCart = computed (()=>
    Array.isArray(orderStore.cart.items) &&
    orderStore.cart.items.some(item => Number(item.product_id) === Number(props.id))
)

async function toggleCart() {
    console.log("isInCart:", isInCart.value);

    const itemData = {
        "product_id": Number(props.id),
        "quantity": 1,
        "unit_price": Number(props.price)
    };

    if(isInCart.value){
        const itemToRemove = orderStore.cart.items.find(item => item.product_id === props.id);
        console.log('estrutura item to remove', itemToRemove)
        await orderStore.updateCartItem(itemToRemove, false);
    } else {
        await orderStore.updateCartItem(itemData, true);
    }
}

</script>

<style scoped>
    .card{
        width: 18rem;;
    }

    .card-text-limit {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card:hover {
        transform: translateY(-4px);
        transition: all 0.4s ease-in-out;
    }
</style>