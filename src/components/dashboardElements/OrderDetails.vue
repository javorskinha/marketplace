<template>
    <div v-if="orderDetails" class="container">
        <div class="mb-3">
          <h5>Produtos:</h5>
          <div v-for="(product, index) in orderDetails.products" :key="index" class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="getImageUrl(product.image_path)" class="img-fluid rounded-start" alt="Produto">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">{{ product.description }}</p>
                  <p class="card-text"><strong>Preço:</strong> R${{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3" v-if="address">
          <h5>Endereço de Entrega:</h5>
          <p class="fs-6"><strong>Rua:</strong> {{ address.street }}, {{ address.number }}</p>
          <p class="fs-6"><strong>Cidade:</strong> {{ address.city }} / {{ address.state }} - {{ address.country }}</p>
          <p class="fs-6"><strong>CEP:</strong> {{ address.zip }}</p>
        </div>
        <div class="mb-3">
          <h5>Cupom:</h5>
          <p v-if="coupon"><strong>Código:</strong><span class="text-primary">{{ coupon.code }}</span></p>
          <p v-else>Nenhum cupom aplicado</p>
        </div>
    </div>
</template>
  
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useOrdersStore } from '@/stores/OrdersStore';
import { useUserStore } from '@/stores/UserStore';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from '@/services/HttpService';
import { useRoute } from 'vue-router';

const props = defineProps({
  orderId: Number
});

const orderStore = useOrdersStore();
const userStore = useUserStore();
const productsStore = useProductsStore();
const route = useRoute();
const orderDetails = ref(null);
const address = computed(() => userStore.addresses.find(addr => addr.id === orderDetails.value.address_id));
const coupon = computed(() => productsStore.coupons.find(c => c.id === orderDetails.value.coupon_id));

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(async () => {
    const orderId = route.params.id;
    await orderStore.fetchOrder(orderId);
    orderDetails.value = orderStore.selectedOrder;
});
</script>