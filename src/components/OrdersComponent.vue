<template>
    <div>
        <div v-for="order in orders" :key="order.id">
            <p>{{ order.order_date }}</p>
            <p>{{ order.status }}</p>
        </div>
    </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import { onMounted, ref } from 'vue';

const orderStore = useOrdersStore();
const orders = ref([]);

async function getAllOrders() {
    const result = await orderStore.fetchOrder();
    console.log('getOrders data', result)
    orders.value = result;
}

onMounted(getAllOrders)
</script>