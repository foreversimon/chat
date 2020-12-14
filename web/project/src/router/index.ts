import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'
import Main from '@/views/main/index.vue'
import MainChildren from './main/index'
import {
  MAIN,
  LOGIN
} from './router-name'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: MAIN,
    component: Main,
    children: MainChildren()
  },
  {
    path: '/login',
    name: LOGIN,
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach((to, from, next) => {
//   const state: any = store.state
//   const isLogin: boolean = state.User.isLogin
//   if (to.name !== LOGIN) {
//     if (isLogin) {
//       next()
//     } else {
//       next({ name: LOGIN })
//     }
//   } else {
//     next()
//   }
// })

export default router
