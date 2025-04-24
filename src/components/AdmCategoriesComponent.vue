<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <h3>Suas Categorias</h3>
            <div>
                <ButtonComponent class="btn btn-info" text="Criar nova categoria" icon="pi pi-plus" @click="openModal()"/>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
            <div v-for="category in userCategories" :key="category.id" class="col">
                <!--exibe as categorias que o usuário criou/possui-->
                <div class="card h-100 shadow border-0">
                    <div class="card-body position-relative">
                        <img :src="getImageUrl(category.image_path)" alt="" class="costum-image">
                        <h4>{{ category.name }}</h4>
                        <p class="mb-1"><span class="text-secondary">Descrição:</span> {{ category.description }}</p>
                        <router-link :to="{name: 'admProdutos', query: {category: category.name}}" class="w-100 d-flex justify-content-end nav-link mb-2 hover">
                            <strong>Ver Produtos <i class="pi pi-arrow-right"></i></strong>
                        </router-link>
                        <ButtonComponent text="Adicionar Produto" @click="openAddProdModal(category.id)"  class="btn btn-outline-info"/>
                        <div class="d-flex flex-column gap-1 position-absolute top-0 end-0">
                            <ButtonComponent icon="pi pi-pen-to-square text-info fs-4" class="btn" @click="openModal(category)"/>
                            <!--excluir categorias-->
                            <ButtonComponent icon="pi pi-trash text-danger fs-4" class="btn" @click="deleteCategory(category)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEditing ? 'Alterar Dados' : 'Nova Categoria' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <h6>{{ isEditing ? 'Edite os dados:' : 'Preencha os campos:' }}</h6>
                        <form @submit.prevent="saveCategory">
                            <InputComponent type="text" placeholder="Nome" v-model="editedCat.name" required/>
                            <InputComponent type="text" placeholder="Descrição" v-model="editedCat.description"/>
                            <InputComponent type="file" @change="handleImage"/>
                            <ButtonComponent type="submit" :text="isEditing? 'Alterar' :'Criar Categoria'" class="btn btn-primary rounded-1"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Categoria {{ nameCategory?.name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Novo Produto</h6>
                        <form @submit.prevent="submitNewProduct">
                            <InputComponent type="text" placeholder="Nome" v-model="newProd.name" required/>
                            <InputComponent type="number" placeholder="Preço" v-model="newProd.price"/>
                            <InputComponent type="int" placeholder="Estoque disponível" v-model="newProd.stock" required/>
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
import { useProductsStore } from '@/stores/ProductsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { baseURL } from "@/services/HttpService";
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
import { onMounted, reactive, ref } from 'vue';
import { Modal } from 'bootstrap';

let modalInstance;
let addProdModalInstance;

const productsStore = useProductsStore();
const authStore = useAuthStore();
const userCategories = ref([]);
const catProducts = reactive({});
const visibleCat = ref([]);
const nameCategory = ref(null);
const isEditing = ref(false);
const editedCat = reactive({
    name:'',
    description:'',
    image:null,
    id: ''
});
const catForProduct = ref(null)
const addProduct = (categoryId) => {
    newProd.id = categoryId;
    catForProduct.value = categoryId;
}
const newProd = reactive({
    name: '',
    description: '',
    price: null,
    stock: null,
    id: null,
    image: null
})

function handleImage(event){
    editedCat.image = event.target.files[0];
    newProd.image = event.target.files[0];
}

const openModal = (category = null) => {
    if (category) {
        isEditing.value = true;
        editedCat.name = category.name;
        editedCat.description = category.description;
        editedCat.image = null;
        editedCat.id = category.id;
    } else {
        isEditing.value = false;
        resetForm();
    }

    if (!modalInstance) {
        const modalEl = document.getElementById('categoryModal');
        modalInstance = new Modal(modalEl);
    }

    modalInstance.show();
};

const openAddProdModal = (categoryId) => {
    const category = userCategories.value.find(cat => cat.id === categoryId);
    nameCategory.value = category;
    newProd.id = categoryId;
    if(!addProdModalInstance){
        const modalEl = document.getElementById('addProductModal');
        addProdModalInstance = new Modal(modalEl);
    }
    addProdModalInstance.show();
}

const submitNewProduct = async () =>  {
    const formData = new FormData();
    formData.append('name', newProd.name);
    formData.append('description', newProd.description);
    formData.append('price', newProd.price);
    formData.append('stock', newProd.stock);
    formData.append('category_id', newProd.id);
    formData.append('image', newProd.image);

    await productsStore.updateProducts({
        action: 'create',
        productData: formData
    });

    addProdModalInstance.hide();
}

async function saveCategory() {
    const formData = new FormData();
    formData.append('name', editedCat.name);
    formData.append('description', editedCat.description);
    if (editedCat.image) {
        formData.append('image', editedCat.image);
    }

    if(isEditing.value){
        await productsStore.updateCategories({
            action: 'update',
            categoryData: editedCat,
            newCatData: editedCat
        });
    } else {
        await productsStore.updateCategories({
            action: 'create',
            categoryData: formData
        });
    }

    console.log('dados da categoria que estão sendo enviados:');
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    modalInstance.hide();
    resetForm();
    getUserCategories();
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function getUserCategories() {
    const response = await productsStore.fetchCategories(authStore.user.id);
    userCategories.value = response;
}

async function deleteCategory(catData) {
    const confirmation = window.confirm('Tem certeza que deseja excluir a categoria?');

    if(!confirmation){
        return;
    }

    await productsStore.updateCategories({action: 'delete', categoryData: catData})
    getUserCategories();
}

function resetForm(){
    editedCat.name = '';
    editedCat.description = '';
    editedCat.image = null;
    isEditing.value = false;
}

onMounted(()=>{
    getUserCategories();
})
</script>

<style>
    .costum-image{
        width: 170px;
        height: 170px;
        object-fit: cover;
    }
</style>