<template>
  <div>
    <xy-calendar
      :currentMonth="state.currentMonth"
      :currentYear="state.currentYear"
      :startDayOfMonday="state.startDayOfMonday"
      @changeDate="changeDate"
    > </xy-calendar>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {Tools} from "../../../packages"

Tools.deepCopy({a: 1})

const state = reactive({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  startDayOfMonday: true
})
const date = Tools.convertTimeFormat("YYYY-MM-DD", new Date());
console.log(date,'date');
const changeDate = (dateInfo:any)=>{
  console.log(dateInfo,'date');
}
</script>

<style lang="scss">

</style>