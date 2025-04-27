<template>
    <div class="container mx-auto mt-5">
        <div class="row g-4 justify-content-center border rounded-1">
            <div class="col-12 col-md-6">
                <img :src="getImageUrl(product.image_path)" alt="">
            </div>
            <div class="col-12 col-md-6 d-flex flex-column justify-content-between my-5">
                <div>
                    <div class="d-flex justify-content-between">
                        <h3>{{ product.name }}</h3>
                        <i class="pi pi-heart me-5 fs-3 text-info"></i>
                    </div>
                    <!--avaliações-->
                    <h5>R${{ product.price }}</h5>
                </div>
                <p>{{ product.description }}</p>
                <p><span class="border rounded-1 p-1 pt-0 bg-success">Em estoque</span></p>
                <div class="d-flex w-25">
                    <i class="pi pi-minus text-primary bg-light p-1 rounded-circle me-md-3" @click="decreaseQty(item)"></i>
                    <input type="number" class="text-center" min="1" @change="alterQuantity(item)" style="width: 35px;">
                    <i class="pi pi-plus text-primary bg-light p-1 rounded-circle" @click="increaseQty(item)"></i>
                </div>
                <div>
                    <p>Faça sua assinatura para receber decontos especiais e receitas exclusivas. Para ativar sua assinatura, escolha a frequência semanal, quinzenal ou mensal e tenha 10% de desconto em todos os produtos extras do mercado.</p>
                    <ButtonComponent text="Adicionar a sacola" icon="pi pi-shopping-bag" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import ButtonComponent from './elements/ButtonComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { baseURL } from "@/services/HttpService";
import { useRoute } from 'vue-router';

const productsStore = useProductsStore();
const route = useRoute();
const id = route.params.id;

const product = computed(() => {
    return productsStore.products.find(prod => prod.id == id) || {};
});

const getImageUrl = (path) => {
    if (!path) return '';
    return `${baseURL}${path.replace(/^\/+/, '')}`;
};

function decreaseQty() {
    if (item.quantity > 1) {
        item.quantity--;
        alterQuantity();
    }
}

function increaseQty() {
    item.quantity++;
    alterQuantity();
}

onMounted(async () => {
    await productsStore.fetchProducts();
    console.log('produto no componente', product.value)
});
</script>

<style scoped>
    img{
        width: 80%;
        height: auto;
    }
</style>