import { defineStore } from "pinia";
import { getCart, postCart, deleteCart, getOrders, putCart } from "@/services/HttpService";
import { ref } from "vue";

export const useOrdersStore = defineStore ('orders', ()=> {
    const cart = ref([]);
    const order = ref([]);

    //carrinho
    async function fetchCart(cartItems = true) {
        try{
            const result = await getCart(cartItems);
            cart.value = result;
        } catch (error){
            console.error('OrdersStore erro exibir carrinho', error);
        }
    }

    async function addCartItem(itemData) {
        console.log('dados na store:', itemData);
        try{
            const result = await postCart(itemData);
            console.log('os dados foram adicinados', itemData);
            cart.value.push(result);
        } catch (error){
            console.error('OrdersStore erro ao adicionar item', error);
        }
    }

    async function alterCartQuant(id, newQuantity) {
        try{
            const result = await putCart(id, newQuantity);
            item.value = result;
        } catch (error){
            console.error('OrdersStore erro ao alterar quantidade do item', error);
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

    //pedidos
    async function fetchOrder(orderId = null) {
        try{
            const result = await getOrders(orderId);
            order.value = result;
        } catch (error){
            console.error('OrdersStore erro exibir pedido', error);
        }
    }

    return {cart, order, fetchCart, fetchOrder, addCartItem, alterCartQuant, removeCartItem}
})