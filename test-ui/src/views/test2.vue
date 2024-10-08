<template>
  <div></div>
</template>

<script lang="ts" setup>
import {Tools} from "../../../packages"


const time = Tools.convertTimeFormat('YYYY-MM-DD HH:mm:ss', new Date())

console.log(time);


</script>

<style scoped lang="scss">

</style>