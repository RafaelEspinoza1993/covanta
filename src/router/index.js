import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView'
import DashboardView from '@/views/DashboardView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: DashboardView
  },
]

const router = new VueRouter({
  routes
})

export default router
