<template>
    <div class="container">
        <div class="d-flex justify-content-between mt-3">
            <h3 class="w-75">Suas Categorias</h3>
            <div>
                <ButtonComponent class="btn btn-info" text="Criar nova categoria" icon="pi pi-plus" @click="openModal()"/>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
            <div v-for="category in userCategories" :key="category.id" class="col">
                <div class="card h-100 shadow border-0">
                    <div class="card-body position-relative">
                        <img :src="getImageUrl(category.image_path)" alt="" class="custom-image">
                        <h4>{{ category.name }}</h4>
                        <p class="mb-1"><span class="text-secondary">Descrição:</span> {{ category.description }}</p>
                        <router-link :to="{name: 'admProdutos', query: {category: category.name}}" class="w-100 d-flex justify-content-end nav-link mb-2 hover">
                            <strong>Ver Produtos <i class="pi pi-arrow-right"></i></strong>
                        </router-link>
                        <ButtonComponent text="Adicionar Produto" @click="openAddProdModal(category.id)"  class="btn btn-outline-info"/>
                        <div class="d-flex flex-column gap-1 position-absolute top-0 end-0">
                            <ButtonComponent icon="pi pi-pen-to-square text-info fs-4" class="btn" @click="openModal(category)"/>
                            <!--excluir categorias-->
                            <ButtonComponent icon="pi pi-trash text-danger fs-4" class="btn" @click="confirmExclusion(category)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmModal
        :show="showConfirmModal" title="Confirmar Exclusão" 
        message="Tem certeza que deseja excluir a categoria? Esta ação não pode ser desfeita." 
        @confirm="onConfirm" 
        @cancel="onCancel"
        />
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
import { useProductsStore } from '@/stores/ProductsStore';
import { useAuthStore } from '@/stores/AuthStore';
import { baseURL } from "@/services/HttpService";
import ButtonComponent from '../elements/ButtonComponent.vue';
import InputComponent from '../elements/InputComponent.vue';
import ConfirmModal from "../elements/ConfirmModal.vue";
import { onMounted, reactive, ref, computed } from 'vue';
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';

let modalInstance;
let addProdModalInstance;

const productsStore = useProductsStore();
const authStore = useAuthStore();
const showConfirmModal = ref(false);
const toast = useToast();
const userCategories = computed(() => productsStore.categories)
const nameCategory = ref(null);
const isEditing = ref(false);
const categoryToDelete = ref(null);
const editedCat = reactive({
    name:'',
    description:'',
    image:null,
    id: ''
});
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

    if(isEditing.value && !editedCat.image){
        await productsStore.updateCategories({
            action: 'update',
            categoryData: editedCat,
            newCatData: editedCat
        });
    } else if (isEditing.value && editedCat.image){
        await productsStore.updateCategories({
            action: 'update',
            categoryData: { id: editedCat.id },
            newCatData: formData
        });
    } else {
        await productsStore.updateCategories({
            action: 'create',
            categoryData: formData
        });
    }

    modalInstance.hide();
    getUserCategories();
    resetForm();
    toast.success('Os dados foram atualizados');
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function getUserCategories() {
    await productsStore.fetchCategories(authStore.user.id);
}

async function confirmExclusion(category){
    categoryToDelete.value = category
    showConfirmModal.value = true;
}

function onConfirm(){
    showConfirmModal.value = false;
    if(categoryToDelete.value) {
        deleteCategory(categoryToDelete.value);
    }
}

function onCancel(){
    showConfirmModal.value = false;
    categoryToDelete.value = null;
}

async function deleteCategory(catData) {
    await productsStore.updateCategories({action: 'delete', categoryData: catData})
    getUserCategories();
    categoryToDelete.value = null;
    toast.success('Categoria Deletada')
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
    .custom-image{
        width: 170px;
        height: 170px;
        object-fit: cover;
    }
</style>