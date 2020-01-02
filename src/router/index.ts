import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import layout from '@/views/layout/index.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/setting',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "about" */ '../views/setting.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: layout
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
