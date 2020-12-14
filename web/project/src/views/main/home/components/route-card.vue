<template>
  <el-card
    :body-style="{ padding: '0px' }"
    shadow="hover"
    class="card-wrapper"
    @click="toPush"
  >
    <img alt="" :src="pic" class="image">
    <div class="label">
      <span>{{label}}</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String
    },
    pic: {
      type: String,
      default: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
    },
    routeToName: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {
    toPush () {
      this.$router.push({ name: this.routeToName })
    }
  }
})
</script>

<style lang="stylus" scoped>
$card-width = 240px
$fontSize = 14px
.card-wrapper
  width $card-width
  font-size 0
  .image
    width 100%
  .label
    font-size $fontSize
    display flex
    justify-content flex-end
    align-items center
    height 40px
    padding 8px

</style>
