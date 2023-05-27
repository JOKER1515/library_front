import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //登录界面
  {
    path: '/log',
    name: 'log',
    component: () => import('../views/LogView.vue')
  },

  //设置默认映射
  {
    path: '/',
    redirect: '/log'
  },

  //注册界面
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },

  //用户界面——查看所有图书
  {
    path:'/reader',
    name: 'reader',
    component: () => import('../views/ReaderView.vue')
  },

    //用户界面——查看自己借走的图书
    {
      path:'/reader/borrowed',
      name:'borrowed',
      component: () => import('../views/ReaderBorrowView.vue')
    },

  //管理员界面
  {
    path:'/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
