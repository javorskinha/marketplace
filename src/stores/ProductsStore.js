import { defineStore } from "pinia";
import { deleteCategory, deleteProduct, getCategories, getProducts, postCategory, postProduct, putCategory, putProducts, getDiscounts, postDiscount, putDiscount, deleteDiscount, getCoupons, postCoupon, putCoupon, deleteCoupon } from "@/services/HttpService";
import { ref } from "vue";

export const useProductsStore = defineStore('products', ()=>{
    const categories  = ref([]);
    const products = ref([]);
    const discounts = ref([]);

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
                    await putCategory(categoryData.id, newCatData, newCatData.image);
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

    async function updateDiscounts({action, discountData, newDiscountData = null}) {
        try{
            switch (action){
                case 'show':
                    discounts.value = await getDiscounts();
                    console.log('PRODUCTS STORE Descontos pegos pela store');
                    break;

                case 'create':
                    await postDiscount(discountData);
                    console.log('PRODUCTS STORE Desconto Criado');
                    break;

                case 'update':
                    await putDiscount(discountData.id, newDiscountData)
                    console.log('PRODUCTS STORE Dados do desconto foram alterados');
                    break;

                case 'delete':
                    await deleteDiscount(discountData.id);
                    console.log('PRODUCTS STORE O desconto foi deletado');
                    break;

                default:
                    throw new Error ('Ação não encontrada!')
            }
        } catch (error){
            console.error('Erro detalhado:', error.response?.data);
        }
    }

    async function updateCoupons({action, couponData, newCouponData = null}) {
        try{
            switch (action){
                case 'show':
                    discounts.value = await getCoupons();
                    console.log('PRODUCTS STORE Cupons pegos pela store');
                    break;

                case 'create':
                    await postCoupon(couponData);
                    console.log('PRODUCTS STORE Cupom Criado');
                    break;

                case 'update':
                    await putCoupon(couponData.id, newCouponData)
                    console.log('PRODUCTS STORE Dados do cupom foram alterados');
                    break;

                case 'delete':
                    await deleteCoupon(couponData.id);
                    console.log('PRODUCTS STORE O cupom foi deletado');
                    break;

                default:
                    throw new Error ('Ação não encontrada!')
            }
        } catch (error){
            console.error('Erro detalhado:', error.response?.data);
        }
    }

    return {categories, products, fetchCategories, updateCategories, fetchProducts, updateProducts, updateDiscounts, updateCoupons}
}, {persist: true})