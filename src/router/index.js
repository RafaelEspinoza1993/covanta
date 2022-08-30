import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView')
  },
]


const router = new VueRouter({
  routes
})

export default router
