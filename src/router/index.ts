import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Login from '@/views/login/index.vue';
// import Layout from '@/layout/index.vue';
Vue.use(Router);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/employees/Employees.vue')
  }
];

const router = new Router({
  // mode: 'history',
  routes
});

export default router;
