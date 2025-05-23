import axios from "axios";

export const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseURL
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

export async function postRenewToken() {
    try{
        const response = await api.post('/renew-token');
        return response.data;
    } catch(error){
        console.error('erro ao renovar token', error);
        throw error;
    }
}

//função auxiliar para realizar as requisições
async function request(method, url, data = null) {
    try {
        const config = {
            method, url, data
        };

        if (data instanceof FormData) {
            config.headers = {
                'Content-Type': 'multipart/form-data'};
        }

        const response = await api(config);
        return response.data;
    } catch (error) {
        console.error(`HTTP Erro em ${method} ${url}`, error.response || error);
        throw error;
    }
}

// user data requests
export const getUser = () => request("get", "/users/me");
export const putUser = (userData) => request("put", "/users/me", userData);
export const putUserPic = (userData) => request("put", "/users/image", userData);
export const deleteUser = () => request("delete", "/users/me");
export const postModerator = (modData) => request("post", "/users/create-moderator", modData);

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
export async function putCategory(id, updatedCategory, image = false) {
    let url = `/categories/${id}`

    if(image) url += "/image";

    return request("put", url, updatedCategory);
}
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
export async function putProducts(productId = null, data = {},  stock = false, image = false) {
    let url = '/products'

    if(stock) url += `/${productId}/stock`;
    else if (image) url += `/${productId}/image`;
    else url += `/${productId}`

    return request('put', url, data)
}
export const deleteProduct = (id) => request("delete", `/products/${id}`);

// cart requests
export async function getCart(cartItems = false) {
    return request('get', cartItems? '/cart/items' : '/cart')
}
export async function postCart(itemData = null) {
    const url = itemData? '/cart/items' : '/cart';
    return request('post', url, itemData);
}
export const putCart = (id, newQuantity) => request("put", '/cart/items', {product_id: id, quantity: newQuantity});
export async function deleteCart(itemId) {
    return request('delete', itemId? '/cart/items' : '/cart/clear', itemId? {"product_id": itemId} : {});
}

// orders requests
export async function getOrders(orderId = null) {
    return request('get', orderId? `/orders/${orderId}` : '/orders')
}
export const getStoreOrders = (adminId) => request('get', `/orders/all/${adminId}`, adminId)
export const postOrder = (orderData) => request("post", "/orders", orderData);
export const putOrder = (id, updatedOrder) => request("put", `/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => request("delete", `/orders/${id}`);
