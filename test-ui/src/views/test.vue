<template>
  <div>
    <xy-button @click="action">kaishi</xy-button>{{ count}}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AnimationUtils } from 'yanyan-ui'
const count = ref(0)
console.log(AnimationUtils.conTest)

const action = ()=>{
  // 使用示例
  // 使用示例
  AnimationUtils.numberAnimate(
    1000,                        // 持续时间
    0,                           // 起始值
    100,                         // 结束值
    (value) => {
      console.log(value);        // 回调函数，每帧调用一次
      count.value = value
    },
    'step-end'
  );


}

</script>

<style scoped>
/* Your styles here */
</style>
