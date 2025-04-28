<template>
    <div class="container h-100">
        <div class="w-100 d-flex justify-content-between">
            <h4>Cupons</h4>
        </div>
        <div class="h-75 d-flex align-items-center justify-content-around">
            <div>
                <div v-if="allCoupons.length > 0">
                    <div v-for="coupon in allCoupons" :key="coupon.id">
                        <p class="mb-1"><strong>Código:</strong> {{ coupon.code }}</p>
                        <p class="mb-1"><strong>Porcentagem:</strong> {{ coupon.discount_percentage }}</p>
                        <p class="mb-3"><strong>Data de inicio:</strong> {{ coupon.start_date }}</p>
                        <p class="mb-3"><strong>Data de fim:</strong> {{ coupon.end_date }}</p>
                    </div>
                </div>
                <div class="h-100 d-flex">
                    <p class="fs-5 text-center fw-light">Não existem cupons cadastrados no momento  <i class="pi pi-gift fs-6 text-info"></i>
                    </p>
                </div>
            </div>
            <div class="border rounded-1 p-3 h-100">
                <form @submit.prevent="saveNewData(newCoupon)">
                    <h5>Criar Novo Cupom</h5>
                    <div class="mb-2">
                        <label for="form-label">Código</label>
                        <input v-model="newCoupon.code" class="form-control"/>
                    </div>
                    <div class="mb-2 d-flex">
                        <label for="form-label">Porcentagem</label>
                        <input v-model="newCoupon.discount_percentage" class="form-control w-25 mx-3"/>
                    </div>
                    <div class="w-100 d-flex">
                        <div class="mb-2 d-flex align-items-baseline">
                            <label for="form-label">Início</label>
                            <input type="date" v-model="newCoupon.start_date" class="form-control mx-3 h-75"/>
                        </div>
                        <div class="mb-2 d-flex align-items-baseline">
                            <label for="form-label">Término</label>
                            <input type="date" v-model="newCoupon.end_date" class="form-control mx-3 h-75"/>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-info w-100 mt-2 h-25">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted, reactive } from 'vue';

const productsStore = useProductsStore();
const allCoupons = computed (()=> productsStore.coupons || []);
const newCoupon = reactive({
    code: '',
    discount_percentage: null,
    start_date: '',
    end_date: ''
});

async function getAllCoupons() {
    await productsStore.updateCoupons({
        action: "show"
    });
};

const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString();
};

async function saveNewData(newCoupon) {
    try {
        const payload = {
            code: newCoupon.code,
            discount_percentage: newCoupon.discount_percentage,
            start_date: formatDate(newCoupon.start_date),
            end_date: formatDate(newCoupon.end_date),
        };

        await productsStore.updateCoupons({
            action: "create",
            couponData: payload
    });
    
    getAllCoupons();

    } catch (error) {
        console.error("Erro ao salvar cupom", error);
    }
}

onMounted(()=>{
    getAllCoupons();
})
</script>