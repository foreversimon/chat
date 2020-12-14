import { reactive, toRefs, Ref } from 'vue'
import { Store } from 'vuex'

interface User {
  username: Ref<string>;
  password: Ref<string>;
  toLogin: any;
}

export function useUser (store: Store<any>): User {
  const user = reactive({
    username: '',
    password: ''
  })
  const toLogin = async (): Promise<any> => {
    await store.dispatch('User/toLogin', user)
  }
  return {
    ...toRefs(user),
    toLogin
  }
}
