<template>
  <div class="card-wrapper" @click="$emit('click')">
    <el-avatar class="card-avatar" :src="avatar"></el-avatar>
    <div class="card-name">{{name}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    click: null
  },
  props: {
    avatar: {
      type: String
    },
    name: {
      type: String
    }
  },
  data () {
    return {}
  },
  setup () {
    return {}
  },
  methods: {}
})
</script>

<style lang="stylus" scoped>
.card-wrapper
  display flex
  align-items center
  width 100%
  height 64px
  padding 8px
  overflow hidden
  text-overflow clip
  border 1px solid #eee
  cursor pointer
  &:hover
    background-color #eee
  .card-avatar
    width 40px
  .card-name
    margin-left 8px
    flex 1
    text-align left
</style>
