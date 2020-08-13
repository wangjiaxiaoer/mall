import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/Index.vue'),
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/views/category/Index.vue'),
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/cart/Index.vue'),
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/profile/Index.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
