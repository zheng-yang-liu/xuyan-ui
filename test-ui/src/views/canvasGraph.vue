<template>
  <div class="graphBox">
    <div class="tools">
      <input type="color" v-model="graphColor"/>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,watch,onBeforeUnmount} from 'vue';
import {DrawGraph} from "../../../packages";

let canvas = null;
const graphColor= ref("#e8e6e6");
let graph:any = null;

watch(()=>graphColor.value,(newVal)=>{
  console.log(newVal)
  graph.changeGraphColor(newVal);
})
onMounted(()=>{
  const ctx = canvas?.getContext('2d');
  graph = new DrawGraph(canvas,ctx);
  graph.init();
  graph.drawShape();
  setTimeout(()=>{
    console.log('change color')
    // graph.changeCanvasBG("#4c2525");
    graph.downloadCanvas();
  },5000)
})
//页面销毁
onBeforeUnmount(()=>{
  graph.destruction();
})


</script>
<style scoped lang="scss">
.graphBox{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .tools{
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>