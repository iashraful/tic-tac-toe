import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Playground from '../components/Playground.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/playground/:userId',
    name: 'Playground',
    component: Playground
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
