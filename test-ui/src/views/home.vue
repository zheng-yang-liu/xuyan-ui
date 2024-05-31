<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue"
import {Tools} from "../../../packages"

const arr = [
  {name: '张三', age: 18},
  {name: '李四', age: 20},
  {name: '张三', age: 1},
  {name: '王五', age: 22},
  {name: '李四', age: 20},
  {name: '赵六', age: 24},
  {name: '张三', age: 18},
  {name: '李四', age: 20},
  {name: '张三', age: 18},
  {name: '王五', age: 22},
  {name: '李四', age: 20},
  {name: '赵六', age: 24},
  {name: '张三', age: 18},
  {name: '李四', age: 20},
  {name: '张三', age: 18},
  {name: '王五', age: 22},
  {name: '李四', age: 20},
  {name: '赵六', age: 24},
  {name: '张三', age: 18},
  {name: '李四', age: 20},
  {name: '张三', age: 18},
  {name: '王五', age: 22},
  {name: '李四', age: 20},
  {name: '赵六', age: 24},
  {name: '张三', age: 18},
  {name: '李四', age: 20},
  {name: '张三', age: 18},
  {name: '王五', age: 22},
  {name: '李四', age: 20},
  {name: '赵六', age: 24},
  {name: '张三', age: 18},
  {name: '李四', age: 20},
  {name: '张三', age: 18},
  {name: '王五', age: 22},
  {name: '李四', age: 20},
  {name: '赵六', age: 24},
];

console.log(Tools.accordingToKeyUnique(arr))
</script>

<style lang="scss">

</style>