<template>
  <div>
    <h1>{{pageTitle}}</h1>
    <p>{{ introduction }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent,PropType} from 'vue'
import {catalogue} from"./effect.type"
export default defineComponent({
  name: "xy-showcase-page",
  props: {
    catalogue:{
      type: Array as PropType<catalogue[]>,
      default: () => [],
      required: true
    },
    pageTitle:{
      type: String,
      default: '',
      required: true
    },
    introduction:{
      type: String,
      default: '',
      required: true
    }
  },
  components: {},
  setup(props, context) {

    return {}
  }
})
</script>

<style scoped lang="scss">

</style>