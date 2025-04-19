<template>
    <div class="card shadow-sm" :id="id">
        <div class="position-relative">
            <img :src="src" class="card-img-top" :alt="alt">
            <span class="position-absolute top-0 start-0 m-3 fs-3"><i class="pi pi-heart text-info"></i></span>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title">{{ name }}</h5>
                <p class="card-text text-muted small card-text-limit">{{ description }}</p>
            </div>
            <div>
                <p class="card-text fw-bold fs-5 text-primary">R$ {{ price }}</p>
                <div class="d-flex flex-column gap-2" @click="toggleCart()">
                    <ButtonComponent
                    :text="isInCart ? 'Na sacola' : 'Adicionar a sacola'"
                    :class="isInCart ? 'btn btn-success' : 'btn btn-info'"
                    icon="pi pi-shopping-bag"
                    />
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
})

console.log(orderStore.cart.items);

const isInCart = computed (()=>
    Array.isArray(orderStore.cart.items) &&
    orderStore.cart.items.some(item => Number(item.product_id) === Number(props.id))
)

async function toggleCart() {
    console.log("ToggleCart chamado")

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