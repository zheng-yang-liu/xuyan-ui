<template>
  <div class="box">
    <el-button type="primary">Primary</el-button>
    {{msg}}
    <slot></slot>
    再见
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue"

  export default defineComponent({
    name: "xy-test",
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

<style lang="scss" scoped>
.box{
  width: 100px;
  height: 100px;
  background-color: red;
  color: white;
}
</style>