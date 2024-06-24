<template>
  <div>
<!--    <xy-calendar-->
<!--      :currentMonth="state.currentMonth"-->
<!--      :currentYear="state.currentYear"-->
<!--      :startDayOfMonday="state.startDayOfMonday"-->
<!--      @changeDate="changeDate"-->
<!--    > </xy-calendar>-->
    <xy-test></xy-test>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {Tools} from "../../../packages"

const state = reactive({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  startDayOfMonday: true,
  diaVisible:''
})
const date = Tools.convertTimeFormat("YYYY-MM-DD", new Date());
console.log(date,'date');
const changeDate = (dateInfo:any)=>{
  console.log(dateInfo,'date');
}
import {useCounterStore}from "@/stores/counter"
const user = useCounterStore();
console.log(user.doubleCount,'user');
user.increment();
console.log(user.doubleCount,'user');
console.log(user.count,'user');
</script>

<style lang="scss">

</style>