<template>
    <div class="container h-100">
        <div class="w-100 d-flex justify-content-between">
            <h4>Descontos</h4>
        </div>
        <div class="h-75 d-flex align-items-center justify-content-around">
            <div class="">
                <div v-if="allDiscounts.length > 0">
                    <div v-for="discount in allDiscounts" :key="discount.id">
                        <p class="mb-1"><strong>Descrição:</strong> {{ discount.description }}</p>
                        <p class="mb-1"><strong>Porcentagem:</strong> {{ discount.discount_percentage }}</p>
                        <p class="mb-3"><strong>Data de inicio:</strong> {{ discount.start_date }}</p>
                        <p class="mb-3"><strong>Data de fim:</strong> {{ discount.end_date }}</p>
                        <p class="mb-3"><strong>Produto:</strong> {{ getProductNameById(discount.product_id) }}</p>
                    </div>
                </div>
                <div class="h-100 d-flex">
                    <p class="fs-5 text-center fw-light">Não existem descontos cadastrados no momento  <i class="pi pi-percentage fs-6 text-info"></i>
                    </p>
                </div>
            </div>
            <div class="border rounded-1">
                <DefaultForm
                title="Criar Novo Desconto"
                :fields="fields"
                :formData="formData"
                @submit="handleFormSubmit"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted, reactive } from 'vue';
import DefaultForm from '../elements/DefaultForm.vue';

const productsStore = useProductsStore();
const products = computed(() => productsStore.products)
const allDiscounts = computed (()=> productsStore.discounts || []);

const formData = reactive({
    description: '',
    discount_percentage: null,
    start_date: '',
    end_date: '',
    product_id: null
});

const fields = [
    { type: 'text', label: 'Descrição', model: 'description', placeholder: 'Digite a descrição' },
    { type: 'number', label: 'Porcentagem', model: 'discount_percentage', placeholder: 'Digite a porcentagem' },
    { type: 'date', label: 'Data de Início', model: 'start_date' },
    { type: 'date', label: 'Data de Término', model: 'end_date' },
    { type: 'select', label: 'Produto', model: 'product_id', options: products.value }
];

const handleFormSubmit = (formData) => {
    console.log('Form data:', formData);
    saveNewData(formData);
};

const getProductNameById = (id) => {
    const product = products.value.find(p => p.id === id);
    return product ? product.name : 'Produto não encontrado';
};

async function getAllDiscounts() {
    await productsStore.updateDiscounts({
        action: "show"
    });
};

async function saveNewData(newDiscount) {
    try {
        const payload = {
            description: newDiscount.description,
            discount_percentage: newDiscount.discount_percentage,
            start_date: newDiscount.start_date,
            end_date: newDiscount.end_date,
            product_id: newDiscount.product_id
        };

        await productsStore.updateDiscounts({
            action: "create",
            discountData: payload
    });
    
    getAllDiscounts();

    } catch (error) {
        console.error("Erro ao salvar desconto", error);
    }
}

onMounted(()=>{
    getAllDiscounts();
})
</script>