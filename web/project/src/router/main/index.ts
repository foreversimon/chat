import { RouteRecordRaw } from 'vue-router'
import { CHAT, HOME } from '@/router/router-name'

function routers (): Array<RouteRecordRaw> {
  return [
    {
      path: '',
      name: HOME,
      component: () => import(/* webpackChunkName: "home" */ '../../views/main/home/index.vue')
    },
    {
      path: 'chat',
      name: CHAT,
      component: () => import(/* webpackChunkName: "chat" */ '../../views/main/chat/index.vue')
    }
  ]
}

export default routers
