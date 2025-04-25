import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { requiresAuth: true },
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: 'dashboard/perfil' },
        { path: 'perfil', component: () => import('../components/UserDataComponent.vue') },
        { path: 'enderecos', component: () => import('../components/AddressesComponent.vue') },
        { path: 'carrinho', component: () => import('../components/CartComponent.vue') },
        //{ path: 'favoritos', component: () => import('../') },
        { path: 'pedidos', component: () => import('../components/OrdersComponent.vue') },
        { path: 'categorias', component: () => import('../components/AdmCategoriesComponent.vue') },
        { path: 'produtos', name: 'admProdutos', component: () => import('../components/AdmProductsComponent.vue') },
        { path: 'moderator', component: () => import('../components/ModeratorComponent.vue') },
      ]
    },
  ],
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const isLoggedIn = authStore.isAuthenticated;

  if(to.meta.requiresAuth && !isLoggedIn){
    next({ name: 'login' });
  } else if (to.name === 'login' && isLoggedIn){
    next({ name: 'home' })
  } else {
    next();
  }
})

export default router
