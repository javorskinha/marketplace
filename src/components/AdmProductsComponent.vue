<template>
    <div class="container">
        <h4>Produtos Cadastrados</h4>
        <div class="row row-cols-sm-2 row-cols-md-3 gap-3 d-flex justify-content-center mt-5">
            <div v-for="product in allProducts" :key="product.id" class="border rounded-1 border-success w-25">
                <div v-if="isEditing[product.id]" class="position-relative">
                    <div class="d-flex justify-content-center"><img :src="getImageUrl(product.image_path)" alt="" class="costum-image"></div>
                    <form action="">
                        <div class="d-flex">
                            <h5 class="me-2">Nome:</h5>
                            <input v-model="product.name" class="border rounded-1 ps-1 w-100 h-50"/>
                        </div>
                        <div class="d-flex">
                            <h5 class="me-2">Preço:</h5>
                            <input v-model="product.price" class="border rounded-1 ps-1 w-100 h-50"/>
                        </div>
                        <div class="d-flex">
                            <h5 class="me-2">Estoque:</h5>
                            <input v-model="product.stock" class="border rounded-1 ps-1 w-100 h-50"/>
                        </div>
                        <div class="d-flex">
                            <h5 class="me-2">Categoria:</h5>
                            <input v-model="product.category_id" class="border rounded-1 ps-1 w-100 h-50"/>
                        </div>
                    </form>
                    <button @click="saveNewData(product)"><i class="pi pi-check-square text-info position-absolute top-0 end-0 m-3 fs-3"></i></button>
                </div>
                <div v-else class="position-relative">
                    <div class="d-flex justify-content-center"><img :src="getImageUrl(product.image_path)" alt="" class="costum-image"></div>
                    <h5>Nome: {{ product.name }}</h5>
                    <h5>Preço: {{ product.price }}</h5>
                    <h5>Estoque: {{ product.stock }}</h5>
                    <h5>Categoria: {{ product.category_id }}</h5>
                    <button @click="toggleEdit(product.id)"><i class="pi pi-pen-to-square text-info position-absolute top-0 end-0 m-3 fs-3"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, onMounted, ref } from 'vue';
import { baseURL } from "@/services/HttpService";

const productsStore = useProductsStore();
const allProducts = computed (()=> productsStore.products);
const isEditing = ref({})

function toggleEdit(productId){
    isEditing.value[productId] = !isEditing.value[productId];
}

async function getAllProducts() {
    await productsStore.fetchProducts(17);
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function saveNewData(product) {
    try {
        const productData = {
      name: product.name,
      price: product.price,
      category_id: product.category_id
    };

    const stockData = {
      stock: product.stock
    };

    await productsStore.updateProducts({
      action: "update",
      productData: { id: product.id },
      newProData: productData
    });

    await productsStore.updateProducts({
      action: "update",
      productData: { id: product.id },
      newProData: stockData
    });


    isEditing.value[product.id] = false;

  } catch (error) {
    console.error("Erro ao salvar produto:", error);
  }
}

onMounted(getAllProducts)
</script>

<style>
    .costum-image{
        width: 170px;
        height: 170px;
        object-fit: cover;
    }
</style>