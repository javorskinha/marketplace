import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/categorias/:categoryId',
      name: 'categoryProducts',
      component: () => import('../views/CategoriesView.vue'),
      props: true,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('../components/DashboarComponent.vue'),
      children: [
        { path: '', redirect: 'perfil' },
        { path: 'perfil', component: () => import('../components/UserDataComponent.vue') },
        { path: 'enderecos', component: () => import('../components/AddressesComponent.vue') },
        { path: 'carrinho', component: () => import('../components/CartComponent.vue') },
        //{ path: 'favoritos', component: () => import('../') },
        { path: 'pedidos', component: () => import('../components/OrdersComponent.vue') },
        { path: 'categorias', component: () => import('../components/AdmCategoriesComponent.vue') },
        { path: 'produtos', component: () => import('../components/AdmProductsComponent.vue') },
        { path: 'moderator', component: () => import('../components/ModeratorComponent.vue') },
      ]
    },
  ],
})

export default router
