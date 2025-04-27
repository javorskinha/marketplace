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
                    <div class="d-flex">
                        <p><span class="border rounded-1 p-1 pt-0 bg-success">Em estoque</span></p>
                    </div>
                    <!--avaliações-->
                    <h5>R${{ product.price }}</h5>
                </div>
                <p>{{ product.description }}</p>
                <div class="d-flex w-25">
                    <i class="pi pi-minus text-primary bg-light p-1 rounded-circle me-md-3" @click="decreaseQty"></i>
                    <input type="number" v-model="quantity" class="text-center" min="1" style="width: 35px;">
                    <i class="pi pi-plus text-primary bg-light p-1 rounded-circle" @click="increaseQty"></i>
                </div>
                <div>
                    <p>Faça sua assinatura para receber decontos especiais e receitas exclusivas. Para ativar sua assinatura, escolha a frequência semanal, quinzenal ou mensal e tenha 10% de desconto em todos os produtos extras do mercado.</p>
                    <ButtonComponent 
                    :text="isInCart ? 'Na sacola' : 'Adicionar à sacola'"
                    :class="isInCart ? 'btn btn-success' : 'btn btn-info'"
                    icon="pi pi-shopping-bag"  
                    @click="toggleCart"/>
                </div>
            </div>
        </div>
        <ConfirmModal 
            :show="showConfirmModal" 
            title="Faça login" 
            message="É necessário fazer login para adicionar itens á sacola." 
            @confirm="onConfirm" 
            @cancel="onCancel"
        />
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import ButtonComponent from './elements/ButtonComponent.vue';
import ConfirmModal from './elements/ConfirmModal.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { useOrdersStore } from '@/stores/OrdersStore';
import { useAuthStore } from '@/stores/AuthStore';
import { baseURL } from "@/services/HttpService";
import { useRoute, useRouter } from 'vue-router';

const productsStore = useProductsStore();
const orderStore = useOrdersStore();
const authStore = useAuthStore();
const showConfirmModal = ref(false);
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const quantity = ref(1);

const product = computed(() => {
    return productsStore.products.find(prod => prod.id == id) || {};
});

const getImageUrl = (path) => {
    if (!path) return '';
    return `${baseURL}${path.replace(/^\/+/, '')}`;
};

function onConfirm(){
    showConfirmModal.value = false;
    router.push({ name: 'login', query: { redirect: route.fullPath } });
}

function onCancel(){
    showConfirmModal.value = false;
}

const isInCart = computed (()=>
    Array.isArray(orderStore.cart.items) &&
    orderStore.cart.items.some(item => Number(item.product_id) === Number(product.value.id))
)

function increaseQty() {
    quantity.value++;
}

function decreaseQty() {
    if (quantity.value > 1) {
        quantity.value--;
    }
}

async function toggleCart() {
    if(!authStore.isAuthenticated){
        showConfirmModal.value = true;
        return;
    }

    const itemData = {
        "product_id": Number(product.value.id),
        "quantity": quantity.value,
        "unit_price": Number(product.value.price)
    };

    if(isInCart.value){
        const itemToRemove = orderStore.cart.items.find(item => item.product_id === product.value.id);
        console.log('estrutura item to remove', itemToRemove)
        await orderStore.updateCartItem(itemToRemove, false);
    } else {
        await orderStore.updateCartItem(itemData, true);
    }
}

onMounted(async () => {
    await productsStore.fetchProducts();
    console.log('produto no componente', product.value)
    orderStore.fetchCart();
});
</script>

<style scoped>
    img{
        width: 80%;
        height: auto;
    }
</style>