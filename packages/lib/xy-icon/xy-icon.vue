<template>
  <i :class="`iconfont icon-${icon}`" :style="iconStyle"></i>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "xy-icon",
  props: {
    icon: {
      type: String,
      default: '',
      require: true
    },
    iconStyle:{
      type: CSSStyleValue,
      default: () => ({})
    }
  },
  components: {},
})
</script>