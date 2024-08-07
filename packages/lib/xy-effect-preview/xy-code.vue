<template>
  <code class="xy-code">{{code}}</code>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "xy-code",
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  components: {},
  setup(props, context) {

    return {}
  }
})
</script>

<style scoped lang="scss">
.xy-code{
  margin: 0 5px;
  font-weight: 600;
  padding: 3px 6px;
  border-radius: 5px;
  background-color: #f5f7fa;

}
</style>