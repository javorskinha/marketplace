<template>
    <div class="card shadow-sm">
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
import { defineProps, computed } from 'vue';
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

const isInCart = computed (()=>
    orderStore.cart.items.some(item => item.product_id === props.id)
)

async function toggleCart() {
    const itemData = {
        "product_id": props.id,
        "quantity": 1,
        "unit_price": props.price
    };

    if(isInCart.value){
        const itemToRemove = orderStore.cart.find(item => item.product_id === props.id);
        if (!itemToRemove) console.log('NÃO ENCONTRADO NO CARRINHO');
        await orderStore.updateCartItem({ id: itemToRemove.id }, false);
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