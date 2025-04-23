<template>
    <div class="container w-100 m-auto">
        <h3>Suas Categorias</h3>
        <ButtonComponent class="btn btn-info" text="Criar nova categoria" @click="openModal()" />
        <section class="row row-cols-sm-2 row-cols-md-3">
                <div v-for="category in userCategories" :key="category.id" class="position-relative border m-2 p-2">
                    <!--exibe as categorias que o usuário criou/possui-->
                    <img :src="getImageUrl(category.image_path)" alt="" class="costum-image">
                    <h4>{{ category.name }}</h4>
                    <p><span class="text-secondary">Descrição:</span> {{ category.description }}</p>
                    <ButtonComponent text="Adicionar produto a categoria" @click="addProduct(category.id)"  class="btn"/>
                    <div v-if="catForProduct === category.id">
                        <form @submit.prevent="newProduct">
                            <InputComponent type="text" placeholder="Nome" v-model="newProd.name" required/>
                            <InputComponent type="number" placeholder="Preço" v-model="newProd.price"/>
                            <InputComponent type="int" placeholder="Estoque disponível" v-model="newProd.stock" required/>
                            <InputComponent type="file" @change="handleImage"/>
                            <ButtonComponent type="submit" text="Adicionar Produto"/>
                        </form>
                    </div>
                    <ButtonComponent text="Exibir produtos da categoria" @click="showProducts(category.id)" class="btn btn-secondary" />
                    <div v-if="visibleCat.includes(category.id)">
                        <div v-for="product in catProducts[category.id]" :key="product.id">
                            <img :src="getImageUrl(product.image_path)" alt="" class="w-25">
                            <p>Nome: {{ product.name }}</p>
                            <p>Preço: {{ product.price }}Kg</p>
                            <p>Estoque: {{ product.stock }}Kg</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column gap-1 position-absolute top-0 end-0">
                        <ButtonComponent icon="pi pi-pen-to-square text-info fs-4" class="btn" @click="openModal(category)"/>
                        <!--excluir categorias-->
                        <ButtonComponent icon="pi pi-trash text-danger fs-4" class="btn" @click="deleteCategory(category)"/>
                    </div>
                </div>
        </section>
        <div class="model fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEditing ? 'Alterar Dados' : 'Criar Nova Categoria' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
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

const productsStore = useProductsStore();
const authStore = useAuthStore();
const userCategories = ref([]);
const catProducts = reactive({});
const visibleCat = ref([]);
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

async function showProducts(categoryId){
    const visible = visibleCat.value.includes(categoryId);

    if(visible){
        visibleCat.value = visibleCat.value.filter(id => id !== categoryId)
    } else {
        if(!catProducts[categoryId]){
            const result = await productsStore.fetchProducts(null, categoryId, null);
        console.log('RESULTADO', result)
        catProducts[categoryId] = result;
        };
        visibleCat.value.push(categoryId)
    };
}

async function newProduct() {
    const formData = new FormData();
    formData.append('name', newProd.name);
    formData.append('description', newProd.description);
    formData.append('price', newProd.price);
    formData.append('stock', newProd.stock);
    formData.append('category_id', newProd.id);
    formData.append('image', newProd.image);


    console.log('DADOS DO PRODUTO');
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    await productsStore.updateProducts({
            action: 'create',
            productData: formData
        });
}

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