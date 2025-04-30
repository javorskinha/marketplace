<template>
    <div class="container">
        <div class="w-100 mb-3 d-flex justify-content-between">
            <h4>Cupons</h4>
            <button class="btn btn-info" @click="openModal()">Novo Cupom <i class="pi pi-plus"></i></button>
        </div>
        <div class="d-flex align-items-center justify-content-around">
            <div>
                <div v-if="allCoupons.length > 0" class="row g-3">
                    <div v-for="(coupon, index) in allCoupons" :key="index" class="col-12 col-md-6 col-lg-4 position-relative">
                        <div class="card h-100 shadow-sm p-3 border-success">
                            <h5 class="card-title mb-2"><strong>Código:</strong> {{ coupon.code }}</h5>
                            <p class="mb-1"><strong>Porcentagem:</strong> {{ coupon.discount_percentage }}</p>
                            <p class="mb-1"><strong>Data de inicio:</strong> {{ coupon.start_date }}</p>
                            <p class="mb-1"><strong>Data de fim:</strong> {{ coupon.end_date }}</p>
                        </div>
                        <div class="position-absolute top-0 end-0 mt-2 m-3 d-flex flex-column gap-2">
                            <button @click="openModal(coupon.id)" class="btn btn-outline-primary btn-sm h-25"><i class="pi pi-pen-to-square"></i></button>
                            <button @click="delCoupon(coupon)" class="btn btn-outline-danger btn-sm h-25"><i class="pi pi-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div v-else class="h-100 d-flex">
                    <p class="fs-5 text-center fw-light">Não existem cupons cadastrados no momento  <i class="pi pi-percentage fs-6 text-info"></i>
                    </p>
                </div>
            </div>
            <DefaultModal :isVisible="isModalOpen" :title="isEditing ? 'Editar Cupom' : 'Criar Novo Cupom'" @close="closeModal">
                <div class="border rounded-1">
                    <DefaultForm
                    :title="isEditing ? 'Edite os Dados' : 'Preencha os Dados'"
                    :fields="fields"
                    :formData="formData"
                    @submit="handleFormSubmit"
                    />
                </div>
            </DefaultModal>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted, reactive, ref } from 'vue';
import DefaultForm from '../elements/DefaultForm.vue';
import DefaultModal from '../elements/DefaultModal.vue';
import { useToast } from 'vue-toastification';

const productsStore = useProductsStore();
const toast = useToast();
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentCouponId = ref(null);
const allCoupons = computed(() => {
    return (productsStore.coupons || [])
});

const formData = reactive({
    code: '',
    discount_percentage: null,
    start_date: '',
    end_date: '',
});

const openModal = (couponId = null) => {
    if (couponId) {
        isEditing.value = true;
        const coupon = allCoupons.value.find(c => c.id === couponId);
        if (coupon) {
            formData.code = coupon.code;
            formData.discount_percentage = coupon.discount_percentage;
            formData.start_date = coupon.start_date;
            formData.end_date = coupon.end_date;
            currentCouponId.value = couponId;
        }
    } else {
        isEditing.value = false;
        resetForm();
    }
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    resetForm();
};

const fields = [
    { type: 'text', label: 'Código', model: 'code', placeholder: 'Digite o código' },
    { type: 'number', label: 'Porcentagem', model: 'discount_percentage', placeholder: 'Digite a porcentagem' },
    { type: 'date', label: 'Data de Início', model: 'start_date' },
    { type: 'date', label: 'Data de Término', model: 'end_date' },
];

function resetForm() {
    formData.code = '';
    formData.discount_percentage = null;
    formData.start_date = '';
    formData.end_date = '';
    currentCouponId.value = null;
}

const handleFormSubmit = async (formData) => {
    try {
        const payload = {
            code: formData.code,
            discount_percentage: Number(formData.discount_percentage),
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString(),
        };

        if (isEditing.value) {
            await productsStore.updateCoupons({
                action: "update",
                couponData: { id: currentCouponId.value},
                newCouponData: payload
            });
        } else {
            await productsStore.updateCoupons({
                action: "create",
                couponData: payload
            });
        }
        
        closeModal();

    } catch (error) {
        console.error("Erro ao salvar cupom", error);
    }
};

async function getAllCoupons() {
    await productsStore.updateCoupons({
        action: "show"
    });
};

async function delCoupon(coupon) {
    await productsStore.updateCoupons({
        action: "delete",
        couponData: { id: coupon.id },
    });

    const index = allCoupons.value.findIndex(c => c.id === coupon.id);
    if (index !== -1) {
        allCoupons.value.splice(index, 1);
    }
    toast.success("Cupom deletado com sucesso!");
}

onMounted(()=>{
    getAllCoupons();
})
</script>