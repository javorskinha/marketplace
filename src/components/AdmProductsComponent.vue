<template>
    <div class="container">
        <div class="w-100 d-flex justify-content-between">
            <h4>Produtos Cadastrados</h4>
            <div class="mb-3 d-flex align-items-center">
                <label class="d-flex align-items-center">
                    <i class="pi pi-filter"></i>
                    <span class="d-none d-md-flex"> Categoria:</span>
                </label>
                <select v-model="filteredCategory" class="ms-2 border rounded-1 w-auto d-inline-block">
                    <option value="">Todas</option>
                    <option v-for="cat in allCategories" :key="cat.id" :value="cat.name">
                        {{ cat.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
            <div v-for="product in filteredProducts" :key="product.id" class="col">
                <div class="card h-100 shadow border-0">
                    <div class="card-body position-relative">
                        <div class="d-flex justify-content-center mb-3">
                            <img :src="getImageUrl(product.image_path)" alt="" class="img-fluid rounded" style="width: 170px; height: 170px; object-fit: cover;">
                        </div>
                        <div v-if="isEditing[product.id]">
                            <form @submit.prevent="saveNewData(product)">
                                <div class="mb-2">
                                    <label for="form-label">Nome</label>
                                    <input v-model="product.name" class="form-control"/>
                                </div>
                                <div class="mb-2">
                                    <label for="form-label">Preço</label>
                                    <input v-model="product.price" class="form-control"/>
                                </div>
                                <div class="mb-2">
                                    <label for="form-label">Estoque</label>
                                    <input v-model="product.stock" class="form-control"/>
                                </div>
                                <div class="mb-2">
                                    <label for="form-label">Categoria</label>
                                    <input v-model="product.category_id" class="form-control"/>
                                </div>
                                <button type="submit" class="btn btn-info w-100 mt-2 h-25">
                                    Salvar
                                </button>
                            </form>
                        </div>
                        <div v-else>
                            <h5 class="card-title mb-2">{{ product.name }}</h5>
                            <p class="mb-1"><strong>Preço:</strong> {{ product.price }}</p>
                            <p class="mb-1"><strong>Estoque:</strong> {{ product.stock }}</p>
                            <p class="mb-3"><strong>Categoria:</strong> {{ product.category_id }}</p>
                            <div class="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
                                <button @click="toggleEdit(product.id)" class="btn btn-outline-primary btn-sm h-25"><i class="pi pi-pen-to-square"></i></button>
                                <div v-if="userAdm"><button @click="delProd(product)" class="btn btn-outline-danger btn-sm h-25"><i class="pi pi-trash"></i></button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted, ref } from 'vue';
import { baseURL } from "@/services/HttpService";
import { useRoute } from 'vue-router';

const route = useRoute();

const productsStore = useProductsStore();
const authStore = useAuthStore();
const isEditing = ref({});
const userAdm = computed(()=> authStore.user.role === 'ADMIN');
const allProducts = computed (()=> productsStore.products);
const allCategories = computed(() => productsStore.categories);
const filteredCategory = ref(route.query.category || '');
const filteredProducts = computed(() => {
    if(!filteredCategory.value) return allProducts.value;

    const selectedCategory = allCategories.value.find(cat => cat.name === filteredCategory.value);

    if(!selectedCategory) return []

    return allProducts.value.filter(p => p.category_id === selectedCategory.id)
})

function toggleEdit(productId){
    isEditing.value[productId] = !isEditing.value[productId];
};

async function getAllProducts() {
    await productsStore.fetchProducts(17);
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function saveNewData(product) {
    try {
        const productData = {
        price: product.price,
        name: product.name,
        category_id: product.category_id
    };

    const stockData = {
        stock: product.stock
    };

    await productsStore.updateProducts({
        action: "update",
        productData: { id: product.id },
        newProData: productData
    });

    await productsStore.updateProducts({
        action: "update",
        productData: { id: product.id },
        newProData: stockData
    });


    isEditing.value[product.id] = false;

    } catch (error) {
        console.error("Erro ao salvar produto:", error);
    }
}

onMounted(()=>{
    getAllProducts();
})
</script>

<style>
    .costum-image{
        width: 170px;
        height: 170px;
        object-fit: cover;
    }
</style>