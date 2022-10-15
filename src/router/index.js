import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '@/pages/CartPage.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */ '@/pages/OrderPage.vue')
  },
  {
    path: '/orderInfo/:id',
    name: 'orderInfo',
    component: () => import(/* webpackChunkName: "orderInfo" */ '@/pages/OrderInfoPage.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  routes
})

export default router
