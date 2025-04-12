import { defineStore } from "pinia";
import { getCart, postCart, deleteCart, getOrders, putCart, postOrder, putOrder } from "@/services/HttpService";
import { ref } from "vue";

export const useOrdersStore = defineStore ('orders', ()=> {
    const cart = ref([]);
    const order = ref([
        {
            address_id: 96,
            coupon_id: 0,
            id: 1,
            order_date: "2025-04-12T19:02:24.067Z",
            status: "PENDING",
          },
          {
            address_id: 96,
            coupon_id: 0,
            id: 2,
            order_date: "2025-04-11T19:02:24.067Z",
            status: "DELIVERED",
          },
          {
            address_id: 0,
            coupon_id: 0,
            id: 3,
            order_date: "2025-04-10T19:02:24.067Z",
            status: "CANCELLED",
          },
    ]);

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
            //comentado a chamada da api, para usar os dados manuais do array
            //const result = await getOrders(orderId);
            //order.value = result;
            return order.value;
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

    async function updateOrder(moderator, id, status){
        try {
            if(moderator)await putOrder(id, status);
            else window.alert('Somente moderador pode alterar o status');
        } catch (error){
            console.error('OrdersStore erro update order', error);
        }
    }

    async function deleteOrder(id){
        try {
            await putOrder(id);
        } catch (error){
            console.error('OrdersStore erro ao deletar order', error);
        }
    }

    return {cart, order, fetchCart, fetchOrder, newOrder, deleteOrder, updateOrder, updateCartItem}
})