<template>
  <div>
    <xy-img-cropping
      v-model:visible="state.visible"
      @confirmReturn="confirmReturn"
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
import {upload} from "@/api/index"

const confirmReturn = async (file)=>{
  const res = await upload(file)
  console.log(res)
}
import {getLink} from "@/api/index"
const test = async ()=>{
  const res = await getLink()
  console.log(res)
}
test();
const dianji = Tools.debounce((name)=>{
  console.log(name)
},1000);
</script>

<style lang="scss">

</style>