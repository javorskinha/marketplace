<template>
    <div class="m-2">
        <h3>Seus Pedidos</h3>
        <div v-if="orders.length > 0">
            <div v-for="order in orders" :key="order.id" class="d-flex flex-column flex-md-row w-100 justify-content-between border p-2 p-md-4" :class="order.status === 'CANCELED'? 'disabled-order' : ''">
                <div class="w-100 w-md-25">
                    <h5 class="text-info">Pedido número: {{ order.id }}</h5>
                    <h6 class="text-secondary">Realizado em: {{ dataFormat(order.order_date) }}</h6>
                    <div v-if="userAdm || userModerator">
                        <h6>Atualizar Status do Pedido</h6>
                        <div class="d-flex">
                            <select v-model="newStatus[order.id]" class="form-select w-50 me-2">
                                <option value="PENDING">Recebido</option>
                                <option value="PROCESSING">Em Preparo</option>
                                <option value="SHIPPED">A Caminho</option>
                                <option value="COMPLETED">Concluído</option>
                            </select>
                            <button @click="handleNewStatus(order.id)" :desable="!newStatus[order.id]" class="btn btn-primary h-25">Atualizar</button>
                        </div>
                    </div>
                    <h6 v-else class="text-secondary">Status: {{ statusName(order.status) }}</h6>
                    <button @click="confirmExclusion(order.id)" class="bg-white btn btn-sm text-danger mt-2 d-flex align-items-center border p-1 rounded-1 fw-light"><i class="pi pi-times"></i>Cancelar</button>
                </div>
                <div class="w-100 w-md-75 mt-4 d-flex">
                    <div v-for="(step, index) in statusSteps" :key="step" class="text-center custom-width">
                        <div class="mb-2">
                            <i
                            class="pi fs-4"
                            :class="stepIcon(step)"
                            ></i>
                        </div>
                        <p class="mb-0">{{ orderStatus[step] }}</p>
                        <div class="mt-1 position-relative">
                            <i
                            class="pi fw-bold fs-3 bg-white"
                            :class="isPass(order.status, step) ? 'pi-check-circle text-primary' : 'pi-circle text-secondary'"
                            ></i>
                            <div
                                v-if="index < statusSteps.length - 1"
                                class="position-absolute top-50 translate-middle-y line-style"
                                :style="{ backgroundColor: isPass(order.status, statusSteps[index + 1]) ? '#00b207' : '#e9e9e9' }"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="my-5">
            <p class="fs-5 fw-light m-0">Você ainda não fez nenhum pedido.</p>
            <p class="text-info fs-5"><a class="nav-link" href="/products">Ver produtos <i class="pi pi-arrow-right"></i></a></p>
        </div>
        <ConfirmModal :show="showConfirmModal" title="Confirmar Cancelamento" message="Deseja realmente cancelar seu pedido?" 
        @confirm="onConfirm" 
        @cancel="onCancel" />
    </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/OrdersStore';
import { useAuthStore } from '@/stores/AuthStore';
import ConfirmModal from "../elements/ConfirmModal.vue";
import { onMounted, computed, ref } from 'vue';

const orderStore = useOrdersStore();
const authStore = useAuthStore();
const showConfirmModal = ref(false);
const orderToDelete = ref(null);
const userAdm = computed(()=> authStore.user.role === 'ADMIN');
const userModerator = computed(()=> authStore.user.role === 'MODERATOR');
const orders = computed(() => orderStore.order);
const orderStatus = {
    PENDING: 'Recebido',
    PROCESSING: 'Em Preparo',
    SHIPPED: 'A Caminho',
    COMPLETED: 'Concluído',
    CANCELED: 'Cancelado'
}
const statusSteps = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED'];
const newStatus = ref({})

function stepIcon(step) {
    const icons = {
        PENDING: 'pi-shopping-bag',
        PROCESSING: 'pi-box',
        SHIPPED: 'pi-truck',
        COMPLETED: 'pi-check-square'
    };
    return icons[step];
}

function isPass( orderStatus, stepStatus){
    return statusSteps.indexOf(orderStatus) >= statusSteps.indexOf(stepStatus);
}

function dataFormat(dataString){
    const date = new Date(dataString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function statusName (status){
    return orderStatus[status];
}

async function handleNewStatus(orderId) {
    const updatedStatus = newStatus.value[orderId];
    await orderStore.updateOrder(orderId, {status: updatedStatus});
    getAllOrders();
}

async function getAllOrders() {
    console.log('os dados de orderStore.order', orderStore.order)
    await orderStore.fetchOrder();
}

async function confirmExclusion(order){
    showConfirmModal.value = true;
    orderToDelete.value = order;
}

function onConfirm(){
    showConfirmModal.value = false;
    if (orderToDelete.value){
        delThisOrder(orderToDelete.value);
    };
}

function onCancel(){
    showConfirmModal.value = false;
}

async function delThisOrder(orderId) {
    await orderStore.delOrder(orderId);

    getAllOrders();
}

onMounted(()=> {
    getAllOrders();
})
</script>

<style>
    .line-style{
        height: 8px;
        left: 61%;
        z-index: 0;
        width: 100%;
    }

    .custom-width{
        min-width: 25%;
    }

    .disabled-order {
        opacity: 0.4;
        pointer-events: none;
        user-select: none;
    }
</style>