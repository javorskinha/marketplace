<template>
    <div class="card shadow-sm" :id="id" @click="productsDetails">
        <div class="position-relative">
            <img :src="src" class="card-img-top" :alt="alt">
            <span class="position-absolute top-0 start-0 m-3 fs-3"><i class="pi pi-heart text-info"></i></span>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title card-text-limit">{{ name }}</h5>
            </div>
            <div>
                <p class="card-text fw-bold fs-5 text-primary">R$ {{ price }}</p>
                <div class="d-flex flex-column gap-2">
                    <ButtonComponent
                    :text="isInCart ? 'Na sacola' : 'Adicionar a sacola'"
                    :class="isInCart ? 'btn btn-success' : 'btn btn-info'"
                    icon="pi pi-shopping-bag"
                    @click.stop="toggleCart()"
                    />
                </div>
            </div>
        </div>
    </div>
    <ConfirmModal 
        :show="showConfirmModal" 
        title="Faça login" 
        message="É necessário fazer login para adicionar itens á sacola." 
        @confirm="onConfirm" 
        @cancel="onCancel"
    />
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
import ConfirmModal from "./ConfirmModal.vue";
import { defineProps, computed, ref, onMounted } from 'vue';
import { useOrdersStore } from '@/stores/OrdersStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const orderStore = useOrdersStore();
const authStore = useAuthStore();
const showConfirmModal = ref(false);
const router = useRouter();

const props = defineProps({
    id: Number,
    src: String,
    alt: String,
    name: String,
    description: String,
    price: String, 
})

const isInCart = computed (()=>
    Array.isArray(orderStore.cart.items) &&
    orderStore.cart.items.some(item => Number(item.product_id) === Number(props.id))
)

function onConfirm(){
    showConfirmModal.value = false;
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
}

function onCancel(){
    showConfirmModal.value = false;
}

async function toggleCart() {
    if(!authStore.isAuthenticated){
        showConfirmModal.value = true;
        return;
    }

    const itemData = {
        "product_id": Number(props.id),
        "quantity": 1,
        "unit_price": Number(props.price)
    };

    if(isInCart.value){
        const itemToRemove = orderStore.cart.items.find(item => item.product_id === props.id);
        await orderStore.updateCartItem(itemToRemove, false);
    } else {
        await orderStore.updateCartItem(itemData, true);
    }
}

function productsDetails(){
    router.push({ name: 'product-details', params: { id: props.id } });
}

onMounted(() => {
    orderStore.fetchCart();
})
</script>

<style scoped>
    .card{
        width: 18rem;
        height: auto;
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