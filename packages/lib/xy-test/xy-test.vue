<template>
  <div class="box">
    {{msg}}
    <slot></slot>
    再见
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: "xyTest",
    props:{
      msg:{
        type: String,
        default: 'hello'
      }
    },
    setup(props,context){
      return {}
    }
  })
</script>

<style lang="scss">
.box{
  width: 100px;
  height: 100px;
  background-color: red;
  color: white;
}
</style>