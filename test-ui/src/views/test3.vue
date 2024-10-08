<template>
  <div>
    {{name.a}}
    {{name.b}}
  </div>
</template>

<script lang="ts" setup>
import{ref,computed}from"vue"
const props = defineProps({
  // 当前年份
  currentYear:{
    type:Number,
    required:true,
  },//班子ID
  objectId:{
    type:String,
    required:true,
    default:""
  }
})
const name = computed(() => {
  return {
    a: props.currentYear,
    b: props.objectId
  }
})
console.log(name)
</script>

<style scoped lang="scss">

</style>