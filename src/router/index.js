import Vue from 'vue'
import VueRouter from 'vue-router'
import ContacList from '../views/ContactList'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ContacList
  },
  {
    path: '*',
    component: ContacList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
