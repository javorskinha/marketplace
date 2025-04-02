import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//authentication requests
export async function postLogin(credentials) {
    try{
        const response = await api.post('/login', {
            email: credentials.email,
            password: credentials.password
        });
        return response.data;
    } catch (error){
        console.error('erro fazer login', error);
        throw error;
    }
}

export async function postRegister(userData) {
    try{
        const response = await api.post('/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        return response.data;
    } catch(error){
        console.error('erro ao realizar registro', error);
        throw error;
    }
}

// export async function postRenewToken() {
//     try{
//         const response = await api.post('/renew-token',);
//         return response.data;
//     } catch(error){
//         console.error('erro ao renovar token', error);
//         throw error;
//     }
// }

//verify-token

//função auxiliar para realizar as requisições
async function request(method, url, data = null) {
    try {
        const response = await api({ method, url, data });
        return response.data;
    } catch (error) {
        console.error(`HTTP Erro em ${method}`, error.response || error);
        throw error;
    }
}

// user data requests
export const getUser = () => request("get", "/users/me");
export const putUser = (userData) => request("put", "/users/me", userData);
export const deleteUser = () => request("delete", "/users/me");
//users/created-moderator

// user addresses requests
export async function getAddresses(addressId = null) {
    return request('get', addressId? `/addresses/${addressId}` : '/addresses')
}
export const postAddresses = (addressData) => request("post", "/addresses", addressData);
export const putAddress = (id, updatedData) => request("put", `/addresses/${id}`, updatedData);
export const deleteAddress = (id) => request("delete", `/addresses/${id}`);

// categories requests
export async function getCategories(userId = null, categoryId = null) {
    let url = '/categories';

    if(userId && !categoryId) url += `/user/${userId}`;
    else if(!userId && categoryId) url += `/${categoryId}`;

    return request('get', url);
}
export const postCategory = (categoryData) => request("post", "/categories", categoryData);
export const putCategory = (id, updatedCategory) => request("put", `/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => request("delete", `/categories/${id}`);

// discounts requests
export async function getDiscounts(discountsId = null) {
    return request('get', discountsId? `/discounts/${discountsId}` : '/discounts')
}
export const postDiscount = (discountData) => request("post", "/discounts", discountData);
export const putDiscount = (id, updatedDiscount) => request("put", `/discounts/${id}`, updatedDiscount);
export const deleteDiscount = (id) => request("delete", `/discounts/${id}`);

// cupons requests
export async function getCoupons(couponsId = null) {
    return request('get', couponsId? `/coupons/${couponsId}` : '/coupons')
}
export const postCoupon = (couponData) => request("post", "/coupons", couponData);
export const putCoupon = (id, updatedCoupon) => request("put", `/coupons/${id}`, updatedCoupon);
export const deleteCoupon = (id) => request("delete", `/coupons/${id}`);

// products requests
export async function getProducts(userId = null, categoryId = null, productId = null) {
    let url = '/products';

    if(userId && !categoryId && !productId) url += `/user/${userId}`;
    else if(!userId && categoryId && !productId) url += `/category/${categoryId}`;
    else if(!userId && !categoryId && productId) url += `/${productId}`;

    return request('get', url);
}
export const postProduct = (productData) => request("post", "/products", productData);
export async function putProducts(productId = null, stock = false) {
    return request('put', stock? `/products/${productId}/stock` : `/products/${productId}`)
}
export const deleteProduct = (id) => request("delete", `/products/${id}`);

// cart requests
export async function getCart(cartItems = false) {
    return request('get', cartItems? '/cart/items' : '/cart')
}
export async function postCart(cartIten = false) {
    return request('post', cartIten? '/cart/items' : '/cart')
}
export const putCart = (id, newQuantity) => request("put", '/cart/items', {id, newQuantity});
export async function deleteCart(deleteItem = false) {
    return request('delete', deleteItem? '/cart/items' : '/cart/clear')
}

// orders requests
export async function getOrders(orderId = null) {
    return request('get', orderId? `/orders/${orderId}` : '/orders')
}
export const postOrder = (orderData) => request("post", "/orders", orderData);
export const putOrder = (id, updatedOrder) => request("put", `/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => request("delete", `/orders/${id}`);
