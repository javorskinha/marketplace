import { defineStore } from "pinia";
import { getCart, postCart, deleteCart, getOrders, putCart, postOrder, putOrder, deleteOrder } from "@/services/HttpService";
import { ref } from "vue";

export const useOrdersStore = defineStore ('orders', ()=> {
    const cart = ref([]);
    const orders = ref([]);
    const selectedOrder = ref(null);

    //carrinho
    async function fetchCart(cartItems = true) {
        try{
            const result = await getCart(cartItems);
            cart.value = result;
        } catch (error){
            console.error('OrdersStore erro exibir carrinho', error);
        }
    }

    async function updateCartItem(itemData, isAdding, newQuantity = null) {
        try{
            if(isAdding){
                await postCart(itemData);
                console.log('os dados foram adicinados', itemData);
            } else if (newQuantity !== null){
                await putCart(itemData.product_id, newQuantity);
                console.log("quantidade atualizada com sucesso!")
            } else {
                await deleteCart(itemData.product_id);
            }
            await fetchCart();
        } catch (error){
            console.error('OrdersStore erro ao atualizar o carrinho', error);
        }
    }

    //pedidos
    async function fetchOrder(orderId = null) {
        try{
            if(orderId != null){
                const result = await getOrders(orderId);
                selectedOrder.value = result;
                return selectedOrder.value;
            } else {
                const result = await getOrders(orderId);
                orders.value = result;
                return orders.value;
            }
        } catch (error){
            console.error('OrdersStore erro exibir pedido', error);
        }
    }

    async function newOrder(orderData){
        try {
            const result = await postOrder(orderData);
            orders.value = result;
        } catch (error){
            console.error('OrdersStore erro enviar pedido', error);
        }
    }

    async function updateOrder(id, status){
        try {
            await putOrder(id, status);
        } catch (error){
            console.error('OrdersStore erro update order', error);
        }
    }

    async function delOrder(id){
        try {
            await deleteOrder(id);
        } catch (error){
            console.error('OrdersStore erro ao deletar order', error);
        }
    }

    return {cart, orders, selectedOrder, fetchCart, fetchOrder, newOrder, delOrder, updateOrder, updateCartItem}
}, {persist: true})