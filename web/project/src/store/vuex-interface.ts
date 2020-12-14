import { Commit, Dispatch } from 'vuex'

export interface StoreContext {
  User?: any;
}

export interface ActionContext {
  commit: Commit;
  dispatch: Dispatch;
}
