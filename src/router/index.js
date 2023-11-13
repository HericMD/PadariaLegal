import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CarrinhoView from '../views/CarrinhoView.vue';
import UsuarioView from '../views/UsuarioView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/carrinhos',
      name: 'carrinhos',
      component: CarrinhoView,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuarioView,
    },
  
  ],
});

export default router;
