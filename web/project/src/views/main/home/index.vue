<template>
  <div class="home">
    <route-card
      v-for="(item, index) of listRoute"
      :key="index"
      :label="item.label"
      :route-to-name="item.name"
    ></route-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RouteCard from './components/route-card.vue'

export default defineComponent({
  components: {
    RouteCard
  },
  data () {
    return {
      listRoute: [
        {
          label: '聊天室',
          name: 'CHAT'
        }
      ]
    }
  }
})

</script>

<style lang="stylus" scoped>
.home
  padding 8px
</style>
