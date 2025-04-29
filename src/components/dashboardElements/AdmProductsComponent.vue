<template>
    <div class="container">
        <div class="w-100 d-flex justify-content-between">
            <div class="d-flex">
                <h4>Produtos Cadastrados</h4>
                <div class="ms-3">
                    <ButtonComponent text="Produto" icon="pi pi-plus" @click="openModal" class="btn btn-outline-info"/>
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
                        <div v-if="isEditing === product.id">
                            <DefaultForm 
                            title="Editar:"
                            :fields="fields"
                            :formData="editedProd"
                            @submit="saveNewData"
                            />
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
        <DefaultModal :isVisible="isModalOpen" title="Adicionar Novo Produto" @close="closeModal">
            <DefaultForm 
            title="Cadastrar:"
            :fields="fields"
            :formData="newProd"
            @submit="addNewProduct"
            />
        </DefaultModal>
    </div>
</template>

<script setup>
import ButtonComponent from '../elements/ButtonComponent.vue';
import DefaultForm from '../elements/DefaultForm.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted, ref, reactive } from 'vue';
import { baseURL } from "@/services/HttpService";
import DefaultModal from '../elements/DefaultModal.vue'
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const productsStore = useProductsStore();
const authStore = useAuthStore();
const toast = useToast();
const isModalOpen = ref(false);
const openModal = () => isModalOpen.value = true;
const closeModal = () => isModalOpen.value = false;

const isEditing = ref(null);
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
    image: null,
});

const editedProd = reactive({
    name: '',
    description: '',
    price: null,
    stock: null,
    category_id: null,
    image: null
});

const filteredProducts = computed(() => {
    if(!filteredCategory.value) return allProducts.value;

    const selectedCategory = allCategories.value.find(cat => cat.name === filteredCategory.value);

    if(!selectedCategory) return []

    return allProducts.value.filter(p => p.category_id === selectedCategory.id)
});

const fields = [
    { type: 'text', model: 'name', label: 'Nome', placeholder: 'Nome do produto' },
    { type: 'text', model: 'description', label: 'Descrição', placeholder: 'Descrição do produto' },
    { type: 'number', model: 'price', label: 'Preço', placeholder: 'Preço' },
    { type: 'number', model: 'stock', label: 'Estoque', placeholder: 'Estoque disponível' },
    { type: 'select', model: 'category_id', label: 'Categoria', options: allCategories.value },
    { type: 'image', model: 'image', label: 'Imagem'}
];

function toggleEdit(productId){
    if (isEditing.value === productId) {
        isEditing.value = null;
    } else {
        const product = allProducts.value.find(p => p.id === productId);
        editedProd.name = product.name;
        editedProd.description = product.description;
        editedProd.price = product.price;
        editedProd.stock = product.stock;
        editedProd.category_id = product.category_id;
        editedProd.image = null;
        editedProd.id = product.id;
        
        isEditing.value = productId;
    }
};

async function getAllProducts() {
    await productsStore.fetchProducts();
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

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

    closeModal();
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

    editedProd.name = '';
    editedProd.description = '';
    editedProd.price = null;
    editedProd.stock = null;
    editedProd.category_id = null;
    editedProd.image = null;
    editedProd.id = '';
}

async function saveNewData() {
    try {
        const productData = {
        price: editedProd.price,
        name: editedProd.name,
        description: editedProd.description,
        category_id: editedProd.category_id
    };

    const stockData = {
        stock: editedProd.stock
    };

    await productsStore.updateProducts({
        action: "update",
        productData: { id: editedProd.id },
        newProData: productData
    });

    await productsStore.updateProducts({
        action: "update",
        productData: { id: editedProd.id },
        newProData: stockData
    });

    if (editedProd.image) {
    const formData = new FormData();
    formData.append('image', editedProd.image);

    await productsStore.updateProducts({
        action: "update",
        productData: { id: editedProd.id },
        newProData: formData
    });
}

    isEditing.value = false;
    toast.success('Dados Atualizados');
    resetForm();

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