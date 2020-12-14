<template>
  <el-button
    class="circle-btn"
    :style="{
      width: getSize,
      height: getSize
    }"
    v-bind="config"
    @click="$emit('click')"
  >
    <slot></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  emits: {
    click: null
  },
  props: {
    size: {
      type: [String, Number],
      default: '30px'
    },
    config: {
      type: Object,
      default: () => ({
        type: 'primary',
        icon: 'el-icon-right'
      })
    }
  },
  computed: {
    getSize (): string {
      const size: string | number = this.size
      if (typeof size === 'number') {
        return size + 'px'
      } else {
        return size
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
.circle-btn
  padding 0
  width 30px
  height 30px
  border-radius 50%
</style>
