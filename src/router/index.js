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
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/components/loginComponents/singUpComponent')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/components/loginComponents/forgotPasswordComponent')
  }
]


const router = new VueRouter({
  routes
})

export default router
