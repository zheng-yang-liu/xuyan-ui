<template>
  <div class="homeBox">
    <svg width="540" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- X -->
      <path class="svgLine" d="M10,50 L50,150 M50,50 L10,150" stroke="black" stroke-width="2" transform="scale(1.25)"/>
      <!-- U -->
      <path class="svgLine" d="M70,50 L70,130 Q70,150 90,150 Q110,150 110,130 L110,50" stroke="black" stroke-width="2" fill="transparent" transform="scale(1.25)"/>
      <!-- Y -->
      <path class="svgLine" d="M130,50 L150,100 L170,50 M150,100 L150,150" stroke="black" stroke-width="2" transform="scale(1.25)"/>
      <!-- A -->
      <path class="svgLine" d="M190,150 L210,50 L230,150 M200,110 L220,110" stroke="black" stroke-width="2" transform="scale(1.25)"/>
      <!-- N -->
      <path class="svgLine" d="M250,150 L250,50 L290,150 L290,50" stroke="black" stroke-width="2" transform="scale(1.25)"/>
      <!-- - -->
      <path class="svgLine" d="M310,100 L340,100" stroke="black" stroke-width="2" transform="scale(1.25)"/>
      <!-- U -->
      <path class="svgLine" d="M360,50 L360,130 Q360,150 380,150 Q400,150 400,130 L400,50" stroke="black" stroke-width="2" fill="transparent" transform="scale(1.25)"/>
      <!-- I -->
      <path class="svgLine" d="M420,50 L420,150" stroke="black" stroke-width="2" transform="scale(1.25)"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {Tools} from "../../../packages"
export default defineComponent({
  name: "svgAnimation",
  setup(props, context) {
    onMounted(() => {
      Tools.svgAnimation();
    })

    return {
    }
  }
})
</script>

<style scoped lang="scss">
.homeBox{
  width: 100%;
  height: 100vh;
  display: flex;
  //align-items:center;
  justify-content:center;
  //设置背景图片
  background-image: url("@/assets/homeBackground.png");
  background-size: cover;
  background-repeat: no-repeat;
  svg{
    margin-top: 10%;
  }
}
</style>
