<template>
    <div>
        <div class="container my-4">
            <div class="row g-4">
                <div v-for="item in intItem" :key="item.id" class="col-12 col-sm-6 col-lg-3">
                    <CardComponent
                    :id="item.id"
                    :src="getImageUrl(item.image_path)"
                    :name="item.name"
                    :description="item.description"
                    :price="item.unit_price"
                    />
                    <input type="number" min="1"
                    v-model.number="item.quantity"
                    @change="alterQuantity(item)"/>
                </div>
            </div>
        </div>
        <div>
            <p>Total: R${{ totalAmount }}</p>
            <p>Endereço de entrega {{ sendAddress.street }}, id {{ sendAddress.id }}</p>
            <ButtonComponent text="Realizar Pedido" class="btn btn-outline-primary" icon="pi pi-arrow-right" @click="sendOrder(sendAddress.id)"/>
        </div>
    </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import { useUserStore } from "@/stores/UserStore";
import CardComponent from './CardComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { baseURL } from "@/services/HttpService";

const orderStore = useOrdersStore();
const userStore = useUserStore();
const intItem = ref([]);
const totalAmount = ref();
const sendAddress = computed(() => userStore.defaultAddress);

async function showCartItems() {
    await orderStore.fetchCart();
    intItem.value = orderStore.cart.items;
    totalAmount.value = orderStore.cart.total_amount;
    console.log('defaultAddress', sendAddress);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function alterQuantity(item) {
    await orderStore.updateCartItem({product_id: item.product_id}, false, item.quantity);
    await showCartItems();
}

async function sendOrder(addressId) {
    const orderData = {
        address_id: addressId,
        coupon_id: 0
    }

    try{
        console.log("Enviando pedido com:", orderData);
        await orderStore.newOrder(orderData);
        window.alert('Pedido enviado com sucesso!')
        await orderStore.updateCartItem(false);
    } catch (error){
        window.alert('erro ao enviar pedido');
        console.error(error)
    }
}

onMounted(()=>{
    showCartItems();
})

watch(
    () => orderStore.cart.items,
    async () => {
        await showCartItems();
    },
    { deep: true }
);
</script>
