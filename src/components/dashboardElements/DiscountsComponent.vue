<template>
    <div class="container">
        <div class="w-100 mb-3 d-flex justify-content-between">
            <h4>Descontos</h4>
            <button class="btn btn-info" @click="openModal()">Novo Desconto <i class="pi pi-plus"></i></button>
        </div>
        <div class="d-flex align-items-center justify-content-around">
            <div>
                <div v-if="allDiscounts.length > 0" class="row g-3">
                    <div v-for="(discount, index) in allDiscounts" :key="index" class="col-12 col-md-6 col-lg-4 position-relative">
                        <div class="card h-100 shadow-sm p-3 border-success">
                            <h5 class="card-title mb-2"><strong>Descrição:</strong> {{ discount.description }}</h5>
                            <p class="mb-1"><strong>Porcentagem:</strong> {{ discount.discount_percentage }}</p>
                            <p class="mb-1"><strong>Data de inicio:</strong> {{ discount.start_date }}</p>
                            <p class="mb-1"><strong>Data de fim:</strong> {{ discount.end_date }}</p>
                            <p class="mb-0"><strong>Produto:</strong> {{ getProductNameById(discount.product_id) }}</p>
                            <p class="mb-0"><strong>Código do Produto:</strong> {{ discount.product_id }}</p>
                        </div>
                        <div class="position-absolute top-0 end-0 mt-2 m-3 d-flex flex-column gap-2">
                            <button @click="openModal(discount.id)" class="btn btn-outline-primary btn-sm h-25"><i class="pi pi-pen-to-square"></i></button>
                            <button @click="delDiscount(discount)" class="btn btn-outline-danger btn-sm h-25"><i class="pi pi-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div v-else class="h-100 d-flex">
                    <p class="fs-5 text-center fw-light">Não existem descontos cadastrados no momento  <i class="pi pi-percentage fs-6 text-info"></i>
                    </p>
                </div>
            </div>
            <DefaultModal :isVisible="isModalOpen" :title="isEditing ? 'Editar Desconto' : 'Criar Novo Desconto'" @close="closeModal">
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

const productsStore = useProductsStore();
const products = computed(() => productsStore.products);
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentDiscountId = ref(null);
const allDiscounts = computed(() => {
    return (productsStore.discounts || []).filter(discount => {
        return products.value.some(product => product.id === discount.product_id);
    });
});

const getProductNameById = (id) => {
    const product = products.value.find(p => p.id === id);
    return product ? product.name : 'Produto não encontrado';
};

const formData = reactive({
    description: '',
    discount_percentage: null,
    start_date: '',
    end_date: '',
    product_id: null
});

const openModal = (discountId = null) => {
    if (discountId) {
        isEditing.value = true;
        const discount = allDiscounts.value.find(d => d.id === discountId);
        if (discount) {
            formData.description = discount.description;
            formData.discount_percentage = discount.discount_percentage;
            formData.start_date = discount.start_date;
            formData.end_date = discount.end_date;
            formData.product_id = discount.product_id;
            currentDiscountId.value = discountId;
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
    { type: 'text', label: 'Descrição', model: 'description', placeholder: 'Digite a descrição' },
    { type: 'number', label: 'Porcentagem', model: 'discount_percentage', placeholder: 'Digite a porcentagem' },
    { type: 'date', label: 'Data de Início', model: 'start_date' },
    { type: 'date', label: 'Data de Término', model: 'end_date' },
    { type: 'select', label: 'Produto', model: 'product_id', options: products.value }
];

function resetForm() {
    formData.description = '';
    formData.discount_percentage = null;
    formData.start_date = '';
    formData.end_date = '';
    formData.product_id = null;
    currentDiscountId.value = null;
}

const handleFormSubmit = async (formData) => {
    try {
        const payload = {
            description: formData.description,
            discount_percentage: Number(formData.discount_percentage),
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString(),
            product_id: Number(formData.product_id)
        };

        if (isEditing.value) {
            await productsStore.updateDiscounts({
                action: "update",
                discountData: { id: currentDiscountId.value},
                newDiscountData: payload
            });
        } else {
            await productsStore.updateDiscounts({
                action: "create",
                discountData: payload
            });
        }

        await getAllDiscounts();
        closeModal();

    } catch (error) {
        console.error("Erro ao salvar desconto", error);
    }
};

async function getAllDiscounts() {
    await productsStore.updateDiscounts({
        action: "show"
    });
};

async function delDiscount(discount) {
    await productsStore.updateDiscounts({
        action: "delete",
        discountData: { id: discount.id },
    });

    getAllDiscounts();
}

onMounted(()=>{
    getAllDiscounts();
})
</script>