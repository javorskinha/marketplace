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
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/product-details/:id',
      name: 'product-details',
      component: () => import('../views/DetailedView.vue'),
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
        { path: 'perfil', component: () => import('../components/dashboardElements/UserDataComponent.vue') },
        { path: 'enderecos', component: () => import('../components/dashboardElements/AddressesComponent.vue') },
        { path: 'carrinho', component: () => import('../components/CartComponent.vue') },
        //{ path: 'favoritos', component: () => import('../') },
        { path: 'pedidos', component: () => import('../components/dashboardElements/OrdersComponent.vue') },
        { path: 'categorias', component: () => import('../components/dashboardElements/AdmCategoriesComponent.vue') },
        { path: 'produtos', name: 'admProdutos', component: () => import('../components/dashboardElements/AdmProductsComponent.vue') },
        { path: 'descontos', name: 'admDescontos', component: () => import('../components/dashboardElements/DiscountsComponent.vue') },
        { path: 'cupons', name: 'admCupons', component: () => import('../components/dashboardElements/CouponsComponent.vue') },
        { path: 'moderator', component: () => import('../components/dashboardElements/ModeratorComponent.vue') },
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
