import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Page',
    component: () => import( '../views/page.vue'),
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import( '../views/home.vue'),
    },
    {
      path: '/just-in',
      name: 'just-in',
      component: () => import( '../views/just-in.vue')
    },
    {
      path: '/basic',
      name: 'About',
      component: () => import( '../views/basic.vue')
    },
    {
      path: '/clothing',
      name: 'clothing',
      component: () => import( '../views/clothing.vue')
    },
    {
      path: '/graphics',
      name: 'graphics',
      component: () => import( '../views/graphics.vue')
    },
    {
      path: '/accessoires',
      name: 'accessoires',
      component: () => import( '../views/accessoires.vue')
    },
    {
      path: '/customer-service',
      name: 'customer-service',
      component: () => import( '../views/customer-service.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import( '../views/address.vue')
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import( '../views/login.vue')
    // },
    {
      path: '/forgetpass',
      name: 'forgetpass',
      component: () => import( '../views/forgetpass.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
