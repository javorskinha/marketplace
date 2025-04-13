<template>
    <div>
        <div>
            <div>
                <h4>Suas Categorias</h4>
                <!--criar novas categorias aqui-->
                <form  @submit.prevent="createCategory">
                    <InputComponent type="text" placeholder="Nome" v-model="name"/>
                    <InputComponent type="text" placeholder="Descrição" v-model="description"/>
                    <InputComponent type="file" @change="handleImage"/>
                    <ButtonComponent type="submit" text="Criar Categoria"/>
                </form>
                <div v-for="category in userCategories" :key="category.id">
                    <!--exibe as categorias que o usuário criou/possui-->
                    <img :src="getImageUrl(category.image_path)" alt="" class="w-25">
                    <p>{{ category.name }}</p>
                    <p>{{ category.description }}</p>

                    <!--editar categorias existentes-->
                    <ButtonComponent text="Editar Categoria" class="btn btn-outline-primary" @click="editCategory()"/>

                    <!--excluir categorias-->
                    <ButtonComponent text="DELETAR" class="btn btn-primary" @click="deleteCategory()"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { useUserStore } from '@/stores/UserStore';
import { baseURL } from "@/services/HttpService";
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
import { onMounted, ref } from 'vue';

const productsStore = useProductsStore();
const userStore = useUserStore();
const userCategories = ref([]);
const name = ref('');
const description = ref('');
const image = ref(null);
const isEditing = ref(false);

function handleImage(event){
    image.value = event.target.files[0];
}

async function createCategory() {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('image', image.value);

    console.log('dados da categoria que estão sendo enviados:');
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    await productsStore.updateCategories({
            action: 'create', 
            categoryData: formData
        });
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

async function editCategory() {

    await productsStore.updateCategories({
        action: 'update',
        categoryData: category,
        newCatData: formData
    })
}

onMounted(()=>{
    getUserCategories();
})
</script>