<template>
    <div class="container-fluid w-100">
        <h3 class="ms-md-4 mt-4 fw-bold">Minha Sacola <i class="pi pi-shopping-bag"></i></h3>
        <div class="row min-vh-75">
            <div class="col-12 col-md-8 bg-white p-1 p-md-4 border m-md-4">
                <div class="border-bottom d-none d-md-flex justify-content-between text-secondary">
                    <h4 class="custom-w-1">Produto</h4>
                    <h4 class="custom-w-2">Preço</h4>
                    <h4 class="custom-w-2 text-end">Quantidade</h4>
                </div>
                <div v-for="item in intItem" :key="item.id" class="d-flex align-items-center">
                    <div class="d-flex align-items-center custom-w-1">
                        <img :src="getImageUrl(item.image_path)" alt="" class="custom-img-w rounded-circle shadow m-3">
                        <h6>{{ item.name }}</h6>
                    </div>
                    <p class="custom-w-2 d-flex justify-content-start m-0">R$ {{ item.unit_price }}</p>
                    <div class="custom-w-2 d-flex align-items-center justify-content-end">
                        <div class="d-flex w-25 justify-content-end align-items-center">
                            <i class="pi pi-minus text-primary bg-light p-1 rounded-circle me-md-3" @click="decreaseQty(item)"></i>
                            <input type="number" class="text-center" min="1" v-model.number="item.quantity" @change="alterQuantity(item)" style="width: 35px;">
                            <i class="pi pi-plus text-primary bg-light p-1 rounded-circle" @click="increaseQty(item)"></i>
                        </div>
                        <i class="pi pi-times-circle ms-1 ms-md-3" @click="removeProduct(item)"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-3 p-4 border m-4 ms-0">
                <div>
                    <h4 class="mb-4">Total</h4>
                    <div class="d-flex border-bottom justify-content-between">
                        <p class="m-0">Subtotal:</p>
                        <p class="m-0">R${{ totalAmount?.toFixed(2) }}</p>
                    </div>
                    <div class="d-flex border-bottom justify-content-between">
                        <p class="m-0">Frete:</p>
                        <p class="m-0" :class="frete === 0 ? 'text-primary' : 'text-black'">{{ frete === 0 ? 'Grátis' : `R$ ${frete?.toFixed(2)}` }}</p>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <h6>Total:</h6>
                        <h6>R${{ totalFinal?.toFixed(2) }}</h6>
                    </div>
                    <div class="d-flex align-items-baseline justify-content-between">
                        <p>CUPOM:</p>
                        <div class="ms-2 w-100">
                            <InputComponent v-model="couponCode"/>
                            <p v-if="isCouponValid" class="text-success"><small>cupom "{{ couponCode }}" aplicado com sucesso!</small></p>
                            <p v-else-if="couponCode" class="text-danger"><small>cupom inválido.</small></p>
                        </div>
                    </div>
                    <div class="mt-5">
                        <h6>Selecione a forma de Pagamento:</h6>
                        <div class="border d-flex align-items-center p-2">
                            <i @click="selectPayment('cartao')" :class="payment === 'cartao' ? 'pi pi-circle-fill' : 'pi pi-circle'"></i>
                            <div>
                                <img src="../../public/payments/visa-logo.png" alt="" class="custom-logo-h m-1 ms-3">
                                <img src="../../public/payments/elo-logo.png" alt="" class="custom-logo-h m-1">
                                <img src="../../public/payments/mastercard-logo.png" alt="" class="custom-logo-h m-1">
                                <img src="../../public/payments/hipercard-logo.png" alt="" class="custom-logo-h m-1">
                            </div>
                        </div>
                        <div class="border d-flex align-items-center p-2" id="002">
                            <i @click="selectPayment('pix')" :class="payment === 'pix' ? 'pi pi-circle-fill' : 'pi pi-circle'"></i>
                            <div>
                                <img src="../../public/payments/pix-logo.png" alt="" class="custom-logo-h m-1 ms-3">
                            </div>
                        </div>
                        <div class="border d-flex align-items-center p-2" id="003">
                            <i @click="selectPayment('boleto')" :class="payment === 'boleto' ? 'pi pi-circle-fill' : 'pi pi-circle'"></i>
                            <div>
                                <img src="../../public/payments/boleto-logo.png" alt="" class="custom-logo-h m-1 ms-3">
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 fs-5">
                        <h5>Entregar em:</h5> 
                        <div v-if="sendAddress?.id">
                            <p class="m-0 text-secondary">Rua: {{ sendAddress.street }}, {{ sendAddress.number }}</p>
                            <p class="m-0 text-secondary">CEP: {{ sendAddress.zip }}</p>
                            <p class="m-0 text-secondary">{{ sendAddress.city }} - {{ sendAddress.state }} / {{ sendAddress.country }}</p>
                        </div>
                        <div v-else>
                            <p class="text-danger">Por favor, defina um endereço padrão.</p>
                        </div>
                        <p class="d-flex justify-content-end"><button class="btn text-info"><router-link to="/dashboard/enderecos">{{ sendAddress.id? 'Trocar Endereço' : 'Definir Endereço'}}</router-link></button></p>
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
import { useProductsStore } from '@/stores/ProductsStore';
import ButtonComponent from './elements/ButtonComponent.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { baseURL } from "@/services/HttpService";
import { useToast } from 'vue-toastification';
import InputComponent from './elements/InputComponent.vue';

const orderStore = useOrdersStore();
const userStore = useUserStore();
const productsStore = useProductsStore();
const toast = useToast();
const intItem = ref([]);
const totalAmount = ref();
const payment = ref('');
const couponCode = ref('');
const coupons = computed(() => productsStore.coupons);
const isCouponValid = ref(false);
const couponId = ref(null);
const couponDiscount = ref(0);
const sendAddress = computed(() => userStore.defaultAddress);

const frete = computed(() => {
    if (totalAmount.value > 150) {
        return 0;
    }
    return totalAmount.value * 0.2;
});

const discountAmount = computed(() => {
    return (totalAmount.value * (couponDiscount.value / 100));
});

const totalFinal = computed(() => {
    return totalAmount.value - discountAmount.value + frete.value;
});

async function showCartItems() {
    await orderStore.fetchCart();
    intItem.value = orderStore.cart.items.sort((a, b) => a.name.localeCompare(b.name));
    totalAmount.value = orderStore.cart.total_amount;
    console.log('defaultAddress', sendAddress);
}

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

async function alterQuantity(item) {
    await orderStore.updateCartItem({product_id: item.product_id}, false, item.quantity);
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

function selectPayment(type){
    payment.value = type;
}

async function sendOrder(addressId) {
    const orderData = {
        "address_id": addressId,
        "coupon_id": couponId.value
    }

    if (payment.value === ''){
        toast.warning('Selecione uma forma de Pagamento')
    } else if (!sendAddress.value?.id){
        toast.warning('Defina o endereço de entrega')
    } else {
        try{
        await orderStore.newOrder(orderData);
        toast.success('Pedido enviado com sucesso!')
        await orderStore.updateCartItem(false);
        payment.value = ''
        couponCode.value = ''
    } catch (error){
        toast.error('erro ao enviar pedido');
        console.error(error);
    }
    }

    showCartItems();
}

onMounted(()=>{
    showCartItems();
})

watch(couponCode, (newCode) => {
    const coupon = coupons.value.find(c => c.code.toLowerCase() === newCode.trim().toLowerCase());
    isCouponValid.value = !!coupon;
    if (coupon) {
        couponId.value = coupon.id;
        couponDiscount.value = coupon.discount_percentage;
    } else {
        couponId.value = null;
        couponDiscount.value = 0;
    }
});
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

    .custom-w-1{
        width: 70%;
    }
    .custom-w-2{
        width: 20%;
    }
</style>
