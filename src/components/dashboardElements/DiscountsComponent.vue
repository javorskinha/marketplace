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
            <div class="border rounded-1 p-3 h-100">
                <form @submit.prevent="saveNewData(newDiscount)">
                    <h5>Criar Novo Desconto</h5>
                    <div class="mb-2">
                        <label for="form-label">Descrição</label>
                        <input v-model="newDiscount.description" class="form-control"/>
                    </div>
                    <div class="mb-2 d-flex">
                        <label for="form-label">Porcentagem</label>
                        <input v-model="newDiscount.discount_percentage" class="form-control w-25 mx-3"/>
                    </div>
                    <div class="w-100 d-flex">
                        <div class="mb-2 d-flex align-items-baseline">
                            <label for="form-label">Início</label>
                            <input type="date" v-model="newDiscount.start_date" class="form-control mx-3 h-75"/>
                        </div>
                        <div class="mb-2 d-flex align-items-baseline">
                            <label for="form-label">Término</label>
                            <input type="date" v-model="newDiscount.end_date" class="form-control mx-3 h-75"/>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label for="select">Produto</label>
                        <select v-model="newDiscount.product_id" required class="w-75 ms-2 border border-success rounded-2">
                            <option value="" selected>Selecionar produto</option>
                            <option v-for="product in products" :value="product.id">{{product.name}}</option>
                        </select>
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
const products = computed(() => productsStore.products)
const allDiscounts = computed (()=> productsStore.discounts || []);
const newDiscount = reactive({
    description: '',
    discount_percentage: null,
    start_date: '',
    end_date: '',
    product_id: null
});

const getProductNameById = (id) => {
    const product = products.value.find(p => p.id === id);
    return product ? product.name : 'Produto não encontrado';
};

async function getAllDiscounts() {
    await productsStore.updateDiscounts({
        action: "show"
    });
};

const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString();
};

async function saveNewData(newDiscount) {
    try {
        const payload = {
            description: newDiscount.description,
            discount_percentage: newDiscount.discount_percentage,
            start_date: formatDate(newDiscount.start_date),
            end_date: formatDate(newDiscount.end_date),
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