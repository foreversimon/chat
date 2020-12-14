import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerPlugins from '../plugins/registerPlugins'
import registerComponents from '@/components/registerComponents'

import '@/assets/css/index.styl'

const app: any = createApp(App)
registerComponents(app)
registerPlugins(app)

app
  .use(store)
  .use(router)
  .mount('#app')

export default app
