<template>
    <div>
        <div class="p-5 text-center">
            <h2>Produtos em destaque</h2>
            <p>Descubra nossa seleção de produtos premium.</p>
        </div>
        <div class="d-flex flex-wrap justify-content-around ms-md-5 me-md-5">
            <div v-for="product in randomProducts" :key="product.id" class="m-2">
                <CardComponent
                :src="getImageUrl(product.image_path)"
                :name="product.name"
                :description="product.description"
                :price="product.price"
                @addtocart="addItem(product)"
                />
            </div>
        </div>
        <a href="/categories" class="nav-link">
            <ButtonComponent text="VEJA TODOS OS PRODUTOS" class="btn btn-info" icon="pi pi-chevron-right"/>
        </a>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from "@/services/HttpService";

const productsStore = useProductsStore();

console.log('Produtos da store:', productsStore.products);

const randomProducts = computed (()=> getRandomProducts(productsStore.products))

function getRandomProducts(products, quantity = 4){
    const result = [...products].sort(()=> 0.4 - Math.random());
    return result.slice(0,quantity);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

onMounted(async ()=>{
    await productsStore.fetchProducts();
})
</script>