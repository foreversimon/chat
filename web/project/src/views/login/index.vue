<template>
  <div class="container">
    <div class="login-window">
      <el-form size="small">
        <el-form-item label="帐号">
          <el-input class="input-shape" v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="input-shape" v-model="password"></el-input>
        </el-form-item>
        <circle-btn
          style="margin-top: 16px"
          @click="toLogin"
          size="40px"
        ></circle-btn>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  useUser
} from './setup/login-and-register'
import { useStore } from 'vuex'

export default defineComponent({
  data () {
    return {}
  },
  setup () {
    const store = useStore()
    const { username, password, toLogin } = useUser(store)
    return {
      username,
      password,
      toLogin
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {}
})
</script>

<style lang="stylus" scoped>
$window-width = 300px
$window-height = 200px
$input-width = 200px
.container
  height 100%
  width 100%
  .login-window
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    padding 16px 24px
    height $window-height
    width $window-width
    border 1px solid #eee
    text-align center
    border-radius 8px
    box-shadow 0 2px 4px rgba(0, 0, 0, .3)
    .input-shape
      width $input-width
</style>
