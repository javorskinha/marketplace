<template>
    <div class="container">
        <div class="w-100 d-flex justify-content-between">
            <div class="d-flex">
                <h4>Produtos Cadastrados</h4>
                <div class="ms-3">
                    <ButtonComponent text="Produto" icon="pi pi-plus" @click="openAddProdModal()" class="btn btn-outline-info"/>
                </div>
            </div>
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
        <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Novo Produto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Cadastro:</h6>
                        <form @submit.prevent="addNewProduct">
                            <div class="d-flex">
                                <InputComponent class="w-75" type="text" placeholder="Nome" v-model="newProd.name" required/>
                                <select v-model="newProd.category_id" required class="w-25 ms-3 border border-success rounded-2 my-2">
                                    <option value="" selected>Selecionar categoria</option>
                                    <option v-for="category in allCategories" :value="category.id">{{category.name}}</option>
                                </select>
                            </div>
                            <InputComponent type="number" placeholder="Preço" v-model="newProd.price"/>
                            <InputComponent type="text" placeholder="Descrição" v-model="newProd.description" required/>
                            <InputComponent type="number" placeholder="Estoque disponível" v-model="newProd.stock" required/>
                            <InputComponent type="file" @change="handleImage"/>
                            <ButtonComponent type="submit" text="Adicionar Produto" class="btn btn-primary"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputComponent from '../elements/InputComponent.vue';
import ButtonComponent from '../elements/ButtonComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted, ref, reactive } from 'vue';
import { baseURL } from "@/services/HttpService";
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const productsStore = useProductsStore();
const authStore = useAuthStore();
const toast = useToast();

let addProdModalInstance;

const isEditing = ref({});
const userAdm = computed(()=> authStore.user.role === 'ADMIN');
const allProducts = computed (()=> productsStore.products);
const allCategories = computed(() => productsStore.categories);
const filteredCategory = ref(route.query.category || '');
const newProd = reactive({
    name: '',
    description: '',
    price: null,
    stock: null,
    category_id: null,
    image: null
})

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
    await productsStore.fetchProducts();
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

function handleImage(event){
    newProd.image = event.target.files[0];
}

const openAddProdModal = () => {
    if(!addProdModalInstance){
        const modalEl = document.getElementById('addProductModal');
        addProdModalInstance = new Modal(modalEl);
    }
    addProdModalInstance.show();
}

async function addNewProduct(){
    const formData = new FormData();
    formData.append('name', newProd.name);
    formData.append('description', newProd.description);
    formData.append('price', newProd.price);
    formData.append('stock', newProd.stock);
    formData.append('category_id', newProd.category_id);
    formData.append('image', newProd.image);

    await productsStore.updateProducts({
        action: 'create',
        productData: formData
    });

    addProdModalInstance.hide();
    toast.success('Produto adicionado')
    resetForm();
}

function resetForm(){
    newProd.name = '',
    newProd.description = '',
    newProd.price = null,
    newProd.stock = null,
    newProd.category_id = null,
    newProd.image = null
}

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
    toast.success('Dados Atualizados')

    } catch (error) {
        console.error("Erro ao salvar produto:", error);
    }
}

async function delProd(product) {
    await productsStore.updateProducts({
        action: "delete",
        productData: { id: product.id },
    });
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