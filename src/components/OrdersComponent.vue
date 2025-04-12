<template>
    <div class="orders">
        <div v-for="order in orders" :key="order.id">
            <p>Data do pedido:{{ order.order_date }}</p>
            <p>Status do pedido:{{ order.status }}</p>
        </div>
    </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import { onMounted, computed } from 'vue';

const orderStore = useOrdersStore();
const orders = computed(() => orderStore.order);

async function getAllOrders() {
    console.log('os dados de orderStore.order', orderStore.order)
    await orderStore.fetchOrder();
}

onMounted(()=> {
    getAllOrders();
})
</script>