<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="user-info">
        <span>{{username}}</span>
        <el-avatar size="small"></el-avatar>
      </div>
    </el-header>
    <el-main class="main">
      <div>
        <el-button
          :style="{
            visibility: isHome?'visible':'hidden'
          }"
          type="text"
          icon="el-icon-back"
          @click="toHome"
        >返回到首页</el-button>
      </div>
      <router-view class="main-container"></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  computed: {
    ...mapState('User', {
      username: 'username'
    }),
    isHome (): boolean {
      return this.$route.name !== 'HOME'
    }
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'HOME' })
    }
  }
})
</script>

<style lang="stylus" scoped>
.layout
  height 100%
  .header
    display flex
    align-items center
    justify-content flex-end
    padding 8px 16px
    box-shadow 0 2px 10px 0 rgba(0,0,0,.1)
    .user-info
      display inline-flex
      align-items center
      >span
        margin-right 8px
        color #333
  .main
    display flex
    flex-direction column
    .main-container
      flex 1
      border 1px solid #eeeeee
      height 0
      min-height 249px
</style>
