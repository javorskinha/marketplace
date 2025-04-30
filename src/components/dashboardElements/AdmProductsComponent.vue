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
                        <div>
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
        <DefaultModal :isVisible="isModalOpen" :title="isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'" @close="closeModal">
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
const isEditing = ref(false);
const userAdm = computed(()=> authStore.user.role === 'ADMIN');
const allProducts = computed (()=> productsStore.products);
const allCategories = computed(() => productsStore.categories);
const filteredCategory = ref(route.query.category || '');
const formData = reactive({
    name: '',
    description: '',
    price: null,
    stock: null,
    category_id: null,
    image: null,
    id: null
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

function openModal() {
    resetForm();
    isEditing.value = false;
    isModalOpen.value = true;
}

const closeModal = () => isModalOpen.value = false;

function toggleEdit(productId){
    const product = allProducts.value.find(p => p.id === productId);
    if (!product) return;

    formData.name = product.name;
    formData.description = product.description;
    formData.price = product.price;
    formData.stock = product.stock;
    formData.category_id = product.category_id;
    formData.image = null;
    formData.id = product.id;

    isEditing.value = true;
    openModal();
};

async function getAllProducts() {
    await productsStore.fetchProducts();
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function addNewProduct(){
    try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('category_id', formData.category_id);
        data.append('image', formData.image);
    
        await productsStore.updateProducts({
          action: 'create',
          productData: data
        });
    
        closeModal();
        toast.success('Produto adicionado com sucesso');
        resetForm();
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        toast.error('Erro ao adicionar produto');
    }
}

function resetForm(){
    formData.name = '';
    formData.description = '';
    formData.price = null;
    formData.stock = null;
    formData.category_id = null;
    formData.image = null;
    formData.id = null;
}

async function saveNewData() {
    try {
        const productData = {
            price: formData.price,
            name: formData.name,
            description: formData.description,
            category_id: formData.category_id
        };

        const stockData = { stock: formData.stock };

        await productsStore.updateProducts({
            action: "update",
            productData: { id: formData.id },
        newProData: productData
        });

        await productsStore.updateProducts({
            action: "update",
            productData: { id: formData.id },
            newProData: stockData
        });

        if (formData.image) {
            const imgData = new FormData();
            imgData.append('image', formData.image);

            await productsStore.updateProducts({
            action: "update",
            productData: { id: formData.id },
            newProData: imgData
        });
    }

    toast.success('Produto atualizado com sucesso');
    resetForm();
    closeModal();
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    toast.error('Erro ao editar produto');
  }
}

function handleFormSubmit() {
    if (isEditing.value) {
      saveNewData();
    } else {
      addNewProduct();
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