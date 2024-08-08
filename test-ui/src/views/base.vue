<template>
  <div>
    <el-button @click="visible=true">图像裁剪</el-button>
    {{visible}}
    <xy-img-cropping
      v-model:visible="visible"
      @confirmReturn="confirmReturn"

    >
    </xy-img-cropping>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const visible = ref(false);

const confirmReturn = async(file:File|string)=>{
  console.log(file);
  //网络请求
}
</script>

<style scoped lang="scss">

</style>