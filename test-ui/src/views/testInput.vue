<template>
  <div>
    {{testValue}}
    禁用
    <xy-input size="large" disabled placeholder="禁用"></xy-input>
    自定义边框颜色
    <xy-input v-model="testValue" focusoutColor="#ff2e63" focusColor="green" max-length="10"></xy-input>
    small样式
    <xy-input size="small" v-model="testValue" min-length="10"></xy-input>
    可清除
    <xy-input clearable v-model="testValue" placeholder="请输入"></xy-input>
    前置图标
    <xy-input v-model="testValue" placeholder="请输入" size="small" beforeIcon="zhuyi"></xy-input>
    后置图标
    <xy-input v-model="testValue" placeholder="请输入" size="default" afterIcon="sousuo" bgColor="green"></xy-input>
    图标点击事件
    <xy-input
      placeholder="请输入"
      size="default"
      @iconDown="iconDown"
      @beforeIconDown="beforeIconDown"
      @afterIconDown="afterIconDown"
      beforeIcon="zhuyi"
      afterIcon="sousuo"
    ></xy-input>
    图标不能点击
    <xy-input
      placeholder="请输入"
      @iconDown="iconDown"
      @beforeIconDown="beforeIconDown"
      @afterIconDown="afterIconDown"
      beforeIcon="zhuyi"
      afterIcon="sousuo"
      :iconCanClick="false"
    ></xy-input>
    密码框
    <xy-input focusoutColor="#ff2e63" focusColor="green" password></xy-input>
    多行文本允许任意调节
    <xy-input v-model="testValue" placeholder="请输入" textarea max-length="40"></xy-input>
    <xy-input v-model="testValue" placeholder="请输入" textarea min-length="40"></xy-input>
    多行文本不允许调整
    <xy-input v-model="testValue" placeholder="请输入" textarea textChangeSize="none"></xy-input>
    多行文本允许水平
    <xy-input v-model="testValue" placeholder="请输入" textarea textChangeSize="horizontal"></xy-input>
    多行文本允许垂直
    <xy-input v-model="testValue" placeholder="请输入" textarea textChangeSize="vertical"></xy-input>
    多行自动高度w
    <xy-input
      v-model="testValue"
      placeholder="请输入文字"
      height="50"
      width="300"
      textarea
      textChangeSize="vertical"
      autoSize
    ></xy-input>
    前置slot
    <xy-input v-model="testValue" width="500">
      <template #prepend>
        kkkk
      </template>
    </xy-input>
    后置slot
    <xy-input v-model="testValue">
      <template #append>
        kkkk
      </template>
    </xy-input>
    插槽
    <xy-input
      v-model="testValue"
      width="500"
      @append-down="dianji2"
      @prepend-down="dianji"
    >
      <template #prepend>
        <span>sdfghjkl</span>
      </template>
      <template #append>
        kkkk
      </template>
    </xy-input>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const testValue = ref<string>('');
const dianji = () => {
  console.log('点击1');
};
const dianji2 = () => {
  console.log('点击2');
};
const iconDown = () => {
  console.log('iconDown')
}
const beforeIconDown = () => {
  console.log('beforeIconDown')
}
const afterIconDown = () => {
  console.log('afterIconDown')
}
</script>

<style scoped lang="scss">

</style>