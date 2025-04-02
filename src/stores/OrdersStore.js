import { defineStore } from "pinia";
import { getCart, postCart, deleteCart, getOrders } from "@/services/HttpService";
import { ref } from "vue";

export const useOrdersStore = defineStore ('orders', ()=> {
    const cart = ref([]);
    const order = ref([]);

    async function fetchCart(cartItems = true) {
        try{
            const result = await getCart(cartItems);
            cart.value = result;
        } catch (error){
            console.error('OrdersStore erro exibir carrinho', error);
        }
    }

    async function addCartItem(itemData) {
        try{
            const result = await postCart(itemData);
            cart.value.push(result);
        } catch (error){
            console.error('OrdersStore erro ao adicionar item', error);
        }
    }

    async function removeCartItem(itemId) {
        try{
            const result = await deleteCart(itemId);
            cart.value = cart.value.filter(item => item.id !== result.id);
        } catch (error){
            console.error('OrdersStore erro ao excluir item', error);
        }
    }

    async function fetchOrder(orderId = null) {
        try{
            const result = await getOrders(orderId);
            order.value = result;
        } catch (error){
            console.error('OrdersStore erro exibir pedido', error);
        }
    }

    return {cart, order, fetchCart, fetchOrder, addCartItem, removeCartItem}
})