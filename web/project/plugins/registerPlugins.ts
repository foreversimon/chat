import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from '@/api/index'
import ws from '@/api/websocket'

export default (app: any) => {
  app.use(ElementUI)
  app.$axios = axios
  app.$ws = ws
}
