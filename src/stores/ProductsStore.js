import { defineStore } from "pinia";
import { deleteCategory, deleteProduct, getCategories, getProducts, postCategory, postProduct, putCategory, putProducts } from "@/services/HttpService";
import { ref } from "vue";

export const useProductsStore = defineStore('products', ()=>{
    const categories  = ref([]);
    const products = ref([]);

    const adminId = 17;

    // categories
    async function fetchCategories(userId, categoryId) {
        try{
            const result = await getCategories(userId, categoryId);
            categories.value = result;
            return result;
        } catch (error){
            console.error('ProductsStore erro ao pegar categoria', error);
            throw error;
        }
    }

    // categories post, put e delete para admin e moderador.
    async function updateCategories({action, categoryData, newCatData = null}) {
        console.log('AÇÃO:', action);
        console.log('DADOS da categoria:', categoryData);
        try{
            switch (action){
                case 'create':
                    console.log('categoryData na STORE', categoryData)
                    await postCategory(categoryData);
                    console.log('PRODUCTS STORE categoria criada');
                    break;

                case 'update':
                    await putCategory(categoryData.id, newCatData);
                    console.log('PRODUCTS STORE categoria foi alterada');
                    break;

                case 'delete':
                    await deleteCategory(categoryData.id);
                    console.log('PRODUCTS STORE categoria foi deletada');
                    break;

                default:
                    throw new Error ('Ação não encontrada!')
            }
            await fetchCategories();
        } catch (error){
            console.error('PRODUCTS STORE erro ao atualizar categoria', error);
        }
    }

    async function fetchProducts(userId = adminId, categoryId = null, productId = null) {
        try{
            const result = await getProducts(userId, categoryId, productId);
            products.value = result;
            return result;
        } catch (error){
            console.error('ProductsStore erro ao pegar produto', error);
            throw error;
        }
    }

    // products post, put e delete para admin e moderador.
    async function updateProducts({action, productData, newProData = null}) {
        try{
            switch (action){
                case 'create':
                    await postProduct(productData);
                    console.log('PRODUCTS STORE Produto adicionado');
                    break;

                case 'update':
                    if ('stock' in newProData && Object.keys(newProData).length === 1){
                        console.log(newProData)
                        await putProducts(productData.id, newProData, true);
                    } else {
                        console.log(newProData)
                        await putProducts(productData.id, newProData);
                    };
                    console.log('PRODUCTS STORE dados do produto foram alterados');
                    break;

                case 'delete':
                    await deleteProduct(productData.id);
                    console.log('PRODUCTS STORE Produto foi deletado');
                    break;

                default:
                    throw new Error ('Ação não encontrada!')
            }
            await fetchProducts(17, null, null);
        } catch (error){
            console.error('Erro detalhado:', error.response?.data);
        }
    }

    return {categories, products, fetchCategories, updateCategories, fetchProducts, updateProducts}
})