import app from '@/main'
import {
  ActionContext
} from '../vuex-interface'

interface User {
  username: string;
  token: string;
  isLogin: boolean;
}

export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: 'admin',
    token: ''
  },
  mutations: {
    setUsername (state: any, params: string) {
      state.username = params
    },
    setToken (state: any, params: string) {
      state.token = params
    },
    setLogin (state: any, params: boolean) {
      state.isLogin = params
    }
  },
  actions: {
    async toSetUser (context: ActionContext, params: User) {
      const { username, token, isLogin } = params
      context.commit('setUsername', username)
      context.commit('setToken', token)
      context.commit('setLogin', isLogin)
    },
    async toLogin (context: ActionContext, params: {username: string; password: string}) {
      console.log(params)
      await app.$axios.post('http://localhost:3000/', params)
    },
    async toLogOut (context: ActionContext) {
      await context.dispatch('toSetUser', {
        username: '',
        token: '',
        isLogin: false
      })
    }
  }
}
