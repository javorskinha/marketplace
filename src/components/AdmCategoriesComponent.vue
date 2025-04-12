<template>
    <div>
        <div>
            <div>
                <h4>Suas Categorias</h4>
                <!--criar novas categorias aqui-->
                <span @click="createCategory()">
                    Criar
                </span>
                <div v-for="category in userCategories" :key="category.id">
                    <!--exibe as categorias que o usuário criou/possui-->
                    <img :src="category.image_path" alt="">
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
import ButtonComponent from './ButtonComponent.vue';
import { ref } from 'vue';

const productsStore = useProductsStore();
const userCategories = ref([]);
</script>