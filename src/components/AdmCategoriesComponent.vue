<template>
    <div>
        <section>
            <h4>Suas Categorias</h4>
                <div v-for="category in userCategories" :key="category.id">
                    <!--exibe as categorias que o usuário criou/possui-->
                    <img :src="getImageUrl(category.image_path)" alt="" class="w-25">
                    <p>{{ category.name }}</p>
                    <p>{{ category.description }}</p>
                    <ButtonComponent text="Adicionar Produto" @click="addProduct(category.id)"/>
                    <div v-if="catForProduct === category.id">
                        <form @submit.prevent="newProduct">
                            <InputComponent type="text" placeholder="Nome" v-model="newProd.name" required/>
                            <InputComponent type="number" placeholder="Preço" v-model="newProd.price"/>
                            <InputComponent type="int" placeholder="Estoque disponível" v-model="newProd.stock" required/>
                            <InputComponent type="file" @change="handleImage"/>
                            <ButtonComponent type="submit" text="Adicionar Produto"/>
                        </form>
                    </div>
                    <ButtonComponent text="Mostrar produtos da categoria" @click="showProducts(category.id)" />
                    <div v-if="visibleCat.includes(category.id)">
                        <div v-for="product in catProducts[category.id]" :key="product.id">
                            <img :src="getImageUrl(product.image_path)" alt="" class="w-25">
                            <p>Nome: {{ product.name }}</p>
                            <p>{{ product.description }}</p>
                            <p>Preço: {{ product.price }}Kg</p>
                            <p>Estoque: {{ product.stock }}Kg</p>
                        </div>
                    </div>
                    <ButtonComponent text="Editar Categoria" class="btn btn-outline-primary" @click="editCategory(category)"/>
                    <!--excluir categorias-->
                    <ButtonComponent text="DELETAR" class="btn btn-primary" @click="deleteCategory(category)"/>
                </div>
                <div >
                    <!--criar ou editar categorias aqui-->
                    <h3>{{ isEditing ? 'Alterar Dados' : 'Criar Categoria' }}</h3>
                    <form @submit.prevent="saveCategory">
                        <InputComponent type="text" placeholder="Nome" v-model="editedCat.name" required/>
                        <InputComponent type="text" placeholder="Descrição" v-model="editedCat.description"/>
                        <InputComponent type="file" @change="handleImage"/>
                        <ButtonComponent type="submit" :text="isEditing? 'Alterar' :'Criar Categoria'"/>
                    </form>
                </div>
        </section>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { useUserStore } from '@/stores/UserStore';
import { baseURL } from "@/services/HttpService";
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
import { onMounted, reactive, ref } from 'vue';

const productsStore = useProductsStore();
const userStore = useUserStore();
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

function editCategory(category){
    isEditing.value = true;
    editedCat.name = category.name;
    editedCat.description = category.description;
    editedCat.image = null;
    editedCat.id = category.id;
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

    resetForm();
    getUserCategories();
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function getUserCategories() {
    console.log('dados do user na userStore', userStore.user);
    console.log('id do user na userStore', userStore.user.id);
    const response = await productsStore.fetchCategories(userStore.user.id);
    console.log('retorno do fetchCategories para o componente', response);
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