<template>
  <div>
    <xy-img-cropping
      v-model:visible="state.visible"
      @confirmReturn="confirmReturn"
      :uploadApi="upload"
    ></xy-img-cropping>
    <el-button @click="state.visible = true"></el-button>
    <el-button @click="dianji()">点击</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue"
import {Tools} from "../../../packages"
const state = reactive({
  visible:false,
})
import {upload} from "@/api/index"

const confirmReturn = async (file:File|string)=>{
  console.log(file);
  // const res = await upload(file)
  // console.log(res)
}
import {getLink} from "@/api/index"
const test = async ()=>{
  const res = await getLink()
  console.log(res)
}

const dianji = ()=>{
  // Tools.showConfirm("提示",()=>{
  //   console.log("确定删除")
  // })
  Tools.showAlert("提示信息")
}


</script>

<style lang="scss">

</style>