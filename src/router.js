import Vue from 'vue'
import Router from 'vue-router'
import Cart from './views/Cart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cart',
      component: Cart
    },
  ]
})
