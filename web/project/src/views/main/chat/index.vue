<template>
  <el-container class="chat-wrapper">
    <el-aside width="200px" class="chat-aside">
      <user-card
        v-for="item of userList"
        :key="item.id"
        :avatar="item.avatar"
        :name="item.name"
      ></user-card>
    </el-aside>
    <el-container class="chat-container">
      <el-header height="30px" class="chat-header">Header</el-header>
      <el-main class="chat-main">Main</el-main>
      <el-footer class="chat-footer"><el-button @click="sendMsg"></el-button></el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserCard from './components/user-card/index.vue'
import useUserList from './setup/useUserList'
import Ws from '@/api/websocket'

type data = {
  ws: null | WebSocket;
}

export default defineComponent({
  components: {
    UserCard
  },
  setup () {
    const { userList, toUpdateList } = useUserList()
    return {
      userList,
      toUpdateList
    }
  },
  data () {
    return {
      ws: null
    } as data
  },
  mounted () {
    this.init()
  },
  methods: {
    init (): void {
      this.createChatWs()
    },
    createChatWs (): void {
      this.ws = Ws({
        url: 'ws',
        onOpen: this.onOpen,
        onMessage: this.onMessage,
        onClose: this.onClose,
        onError: this.onError
      })
    },
    onOpen () {
      console.log(this)
      if (this.ws) {
        this.ws.send('abc')
      }
    },
    onMessage (msg: string) {
      console.log(msg)
    },
    onClose () {
      console.log('close')
    },
    onError () {
    },
    sendMsg () {
      if (this.ws) {
        this.ws.send('123')
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
$borderStyle = 1px solid #eee
.chat-wrapper
  .chat-aside
    border-right $borderStyle
  .chat-container
    .chat-header
      display flex
      justify-content center
      align-items center
      border-bottom $borderStyle
    .chat-footer
      border-top $borderStyle
</style>
