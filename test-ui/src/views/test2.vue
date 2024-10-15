<template>
  <div></div>
</template>

<script lang="ts" setup>
import {Tools} from "../../../packages"


const time = Tools.convertTimeFormat('YYYY-MM-DD HH:mm:ss', new Date())

const convertDate = Tools.convertDateFormatByTemplate('2024.10','YYYY-MM')

console.log(time);
console.log(convertDate);


</script>

<style scoped lang="scss">

</style>