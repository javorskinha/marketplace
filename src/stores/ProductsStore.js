import { defineStore } from "pinia";
import { getCategories, getProducts } from "@/services/HttpService";
import { ref } from "vue";

export const useProductsStore = defineStore('products', ()=>{
    const categories  = ref([]);
    const products = ref([]);

    // categories
    async function fetchCategories(userId, categoryId) {
        try{
            const result = await getCategories(userId, categoryId);
            categories.value = result;
        } catch (error){
            console.error('ProductsStore erro ao pegar categoria', error);
            throw error;
        }
    }
    // criar categories post, put e delete para admin e moderador.

    async function fetchProducts(userId = null, categoryId = null, productId = null) {
        try{
            const result = await getProducts(userId, categoryId, productId);
            products.value = result;
        } catch (error){
            console.error('ProductsStore erro ao pegar produto', error);
            throw error;
        }
    }
    // criar products post, put e delete para admin e moderador.

    return {categories, products, fetchCategories, fetchProducts}
})