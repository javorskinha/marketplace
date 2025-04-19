<template>
    <div class="container-fluid w-75">
        <h3 class="ms-4 mt-4 fw-bold">Minha Sacola <i class="pi pi-shopping-bag"></i></h3>
        <div class="row min-vh-75">
            <div class="col-12 col-md-8 bg-white p-4 border m-4">
                <div class="border-bottom d-flex justify-content-between text-secondary">
                    <h4>Produto</h4>
                    <h4>Valor</h4>
                    <h4>Quantidade</h4>
                </div>
                <div v-for="item in intItem" :key="item.id" class="d-flex justify-content-between border-bottom align-items-center">
                    <img :src="getImageUrl(item.image_path)" alt="" class="custom-img-w rounded-circle shadow m-3">
                    <h4>{{ item.name }}</h4>
                    <p>R$ {{ item.unit_price }}</p>
                    <div class="d-flex w-25 justify-content-end align-items-center">
                        <i class="pi pi-minus text-primary bg-light p-1 rounded-circle me-3" @click="decreaseQty(item)"></i>
                        <input type="number" class="text-center" min="1" v-model.number="item.quantity" @change="alterQuantity(item)" style="width: 25px;">
                        <i class="pi pi-plus text-primary bg-light p-1 rounded-circle" @click="increaseQty(item)"></i>
                    </div>
                    <i class="pi pi-times-circle" @click="removeProduct(item)"></i>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-3 p-4 border m-4 ms-0">
                <div>
                    <h4 class="mb-4">Total</h4>
                    <div class="d-flex border-bottom justify-content-between">
                        <p class="m-0">Subtotal:</p>
                        <p class="m-0">R${{ totalAmount }}</p>
                    </div>
                    <div class="d-flex border-bottom justify-content-between">
                        <p class="m-0">Frete:</p>
                        <p class="m-0 text-primary">Grátis</p>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <h6>Total:</h6>
                        <h6>R${{ totalAmount }}</h6>
                    </div>
                    <div class="mt-5">
                        <h6>Selecione a forma de Pagamento:</h6>
                        <div class="border d-flex align-items-center p-2">
                            <i class="pi pi-circle"></i>
                            <div>
                                <img src="../../public/payments/visa-logo.png" alt="" class="custom-logo-h m-1 ms-3">
                                <img src="../../public/payments/elo-logo.png" alt="" class="custom-logo-h m-1">
                                <img src="../../public/payments/mastercard-logo.png" alt="" class="custom-logo-h m-1">
                                <img src="../../public/payments/hipercard-logo.png" alt="" class="custom-logo-h m-1">
                            </div>
                        </div>
                        <div class="border d-flex align-items-center p-2">
                            <i class="pi pi-circle"></i>
                            <div>
                                <img src="../../public/payments/pix-logo.png" alt="" class="custom-logo-h m-1 ms-3">
                            </div>
                        </div>
                        <div class="border d-flex align-items-center p-2">
                            <i class="pi pi-circle"></i>
                            <div>
                                <img src="../../public/payments/boleto-logo.png" alt="" class="custom-logo-h m-1 ms-3">
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 fs-5">
                        <h5>Entregar em:</h5> 
                        <p class="m-0 text-secondary">Rua: {{ sendAddress.street }}, {{ sendAddress.number }}</p>
                        <p class="m-0 text-secondary">CEP: {{ sendAddress.zip }}</p>
                        <p class="m-0 text-secondary">{{ sendAddress.city }} - {{ sendAddress.state }} / {{ sendAddress.country }}</p>
                        <p class="d-flex justify-content-end"><button class="btn text-info"><router-link to="/dashboard/enderecos">Trocar Endereço</router-link></button></p>
                        <ButtonComponent text="Enviar Pedido" class="btn btn-primary" icon="pi pi-arrow-right" @click="sendOrder(sendAddress.id)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

        
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import { useUserStore } from "@/stores/UserStore";
import ButtonComponent from './ButtonComponent.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { baseURL } from "@/services/HttpService";

const orderStore = useOrdersStore();
const userStore = useUserStore();
const intItem = ref([]);
const totalAmount = ref();
const sendAddress = computed(() => userStore.defaultAddress);

async function showCartItems() {
    console.log('itens do carrinho', intItem.value)
    await orderStore.fetchCart();
    intItem.value = orderStore.cart.items;
    totalAmount.value = orderStore.cart.total_amount;
    console.log('defaultAddress', sendAddress);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function alterQuantity(item) {
    await orderStore.updateCartItem({product_id: item.product_id}, false, item.quantity);
}

async function sendOrder(addressId) {
    const orderData = {
        "address_id": addressId,
        "coupon_id": null
    }

    try{
        await orderStore.newOrder(orderData);
        window.alert('Pedido enviado com sucesso!')
        await orderStore.updateCartItem(false);
    } catch (error){
        window.alert('erro ao enviar pedido');
        console.error(error);
    }

    showCartItems();
}

function decreaseQty(item) {
  if (item.quantity > 1) {
    item.quantity--;
    alterQuantity(item);
    showCartItems();
  }
}

function increaseQty(item) {
  item.quantity++;
  alterQuantity(item);
  showCartItems();
}

async function removeProduct(item) {
    await orderStore.updateCartItem(item);
    showCartItems();
}

onMounted(()=>{
    showCartItems();
})

</script>

<style>
    .custom-img-w{
        width: 100px;
        height: auto;
    }

    .custom-logo-h{
        width: auto;
        height: 20px;
    }
</style>
