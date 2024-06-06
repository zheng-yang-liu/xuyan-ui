<template>
  <div>
    <xy-classic-page v-model:direction="direction">
      <template #header>
        <el-button @click="dianji">header</el-button>
        <el-button @click="dddddddd">header2</el-button>
      </template>
      <template #aside>
        <div style="background-color: #3c9cff;width: 100%;height: 100%"></div>
      </template>
      <template #main>
        <div style="background-color: green;width: 100%;height: 100%"></div>
      </template>
    </xy-classic-page>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


const direction = ref('horizontal')
const dianji = () => {
  direction.value = 'vertical'
}
const dddddddd = () => {
  direction.value = 'horizontal'
}

</script>