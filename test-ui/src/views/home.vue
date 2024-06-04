<template>
  <div>
    <xy-img-cropping
      v-model:visible="state.visible"
      :previewSizeFixed="true"
    ></xy-img-cropping>
    <el-button @click="state.visible = true"></el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue"
const state = reactive({
  visible:false,
})
</script>

<style lang="scss">

</style>