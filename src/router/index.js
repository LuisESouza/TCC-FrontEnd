import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'Cadastrar',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/training',
    name: 'Treino',
    component: () => import('../views/TrainingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/diet',
    name: 'Dieta',
    component: () => import('../views/DietView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/plans',
    name: 'Planos',
    component: () => import('../views/PlansView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/forgot-password',
    name: 'Recuperar Senha',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'Trocar Senha',
    component: () => import('../views/ResetPassword.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;