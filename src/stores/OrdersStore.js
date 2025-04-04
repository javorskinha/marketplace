import { defineStore } from "pinia";
import { getCart, postCart, deleteCart, getOrders, putCart, postOrder } from "@/services/HttpService";
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

    async function updateCartItem(itemData, isAdding, newQuantity = null) {
        try{
            if(isAdding){
                const result = await postCart(itemData);
                console.log('os dados foram adicinados', itemData);
                cart.value.push(result);
            } else if (newQuantity !== null){
                await putCart(itemData.product_id, newQuantity);
                const index = cart.value.items.findIndex(item => item.id === itemData.id);
                if (index !== -1) cart.value[index].quantity = newQuantity;
                console.log("quantidade atualizada com sucesso!")
            } else {
                await deleteCart(itemData.id);
                cart.value.items = cart.value.items.filter(item => item.id !== itemData.id);
            }
        } catch (error){
            console.error('OrdersStore erro ao atualizar o carrinho', error);
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

    async function newOrder(orderData){
        try {
            const result = await postOrder(orderData);
            order.value = result;
        } catch (error){
            console.error('OrdersStore erro exibir pedido', error);
        }
    }

    return {cart, order, fetchCart, fetchOrder, updateCartItem}
})