import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/log',
    name: 'log',
    component: () => import('../views/LogView.vue')
  },
  {
    path: '/',
    redirect: '/log'
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path:'/reader',
    name: 'reader',
    component: () => import('../views/ReaderView.vue')
  },
  {
    path:'/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
