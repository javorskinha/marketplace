<template>
    <div v-if="orderDetails" class="container">
        <div class="mb-3">
          <div class="mb-3" v-if="address">
            <h5>Endereço de Entrega:</h5>
            <p class="fs-5"><strong>Rua:</strong> {{ address.street }} </p>
            <p class="fs-5"><strong>Número:</strong> {{ address.number }}</p>
            <p class="fs-5"><strong>Cidade:</strong> {{ address.city }} </p>
            <p class="fs-5"><strong>País:</strong> {{ address.country }}</p>
            <p class="fs-5"><strong>CEP:</strong> {{ address.zip }}</p>
          </div>
          <div class="mb-3">
            <h5>Cupom:</h5>
            <p v-if="coupon"><strong>Código:</strong><span class="text-primary">{{ coupon.code }}</span></p>
            <p v-else>Nenhum cupom aplicado</p>
          </div>
          <h5>Produtos:</h5>
          <div class="row row-cols-1 row-cols-md-2 g-3">
            <div v-for="(product, index) in orderDetails.products" :key="index" class="col">
              <div class="card h-100">
                <div class="row g-0 d-flex flex-column">
                  <div class="col-4">
                    <img :src="getImageUrl(product.image_path)" class="img-fluid" alt="Produto">
                  </div>
                  <div class="col-md-8 w-100">
                    <div class="card-body">
                      <h5 class="card-title">{{ product.name }}</h5>
                      <p class="card-text card-text-limit">{{ product.description }}</p>
                      <p class="card-text fs-6"><strong>Preço:</strong> R${{ product.price }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
  
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useOrdersStore } from '@/stores/OrdersStore';
import { useUserStore } from '@/stores/UserStore';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from '@/services/HttpService';

const props = defineProps({
  orderId: Number
});

const orderStore = useOrdersStore();
const userStore = useUserStore();
const productsStore = useProductsStore();
const orderDetails = ref(null);
const address = ref(null)
const coupon = computed(() => productsStore.coupons.find(c => c.id === orderDetails.value.coupon_id));

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(async () => {
    await orderStore.fetchOrder(props.orderId);
    orderDetails.value = orderStore.selectedOrder;

    if (orderDetails.value?.address_id) {
    try {
      address.value = await userStore.userAddresses(orderDetails.value.address_id);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  }
});
</script>

<style scoped>
  .card-text-limit {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
</style>