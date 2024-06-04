<template>
  <div>
    <xy-img-cropping
      v-model:visible="state.visible"
    ></xy-img-cropping>
    <el-button @click="state.visible = true"></el-button>
    <el-button @click="dianji('zhangsassssssn')">点击</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue"
import {Tools} from "../../../packages"
const state = reactive({
  visible:false,
})

const dianji = Tools.debounce((name)=>{
  console.log(name)
},1000);
</script>

<style lang="scss">

</style>