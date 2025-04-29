<template>
    <div class="my-5 w-75 m-auto">
    <h3 class="mb-4 text-center">Cupons Disponíveis</h3>
    <div class="row g-3">
      <div v-for="(coupon, index) in allCoupons" :key="index" class="col-12 col-md-6 col-lg-4">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title text-primary">
                <i class="pi pi-ticket mr-2"></i> {{ coupon.code }}
              </h5>
              <p class="card-text mb-1">
                <strong>Desconto:</strong> {{ coupon.discount_percentage }}%
              </p>
              <p class="card-text mb-0">
                <strong>Válido até:</strong> {{ formatDate(coupon.end_date) }}
              </p>
            </div>
            <div class="mt-3">
              <ButtonComponent text="Copiar Código" icon="pi pi-copy" class="btn btn-outline-info" @click="copyCode(coupon.code)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import ButtonComponent from './elements/ButtonComponent.vue';

const productsStore = useProductsStore();
const allCoupons = computed(() => {
    return (productsStore.coupons || [])
});
const toast = useToast();

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

function copyCode(code) {
  navigator.clipboard.writeText(code);
  toast.success(`Código "${code}" copiado!`);
}

async function getAllCoupons() {
    await productsStore.updateCoupons({
        action: "show"
    });
};

onMounted(() => {
  getAllCoupons();
})
</script>