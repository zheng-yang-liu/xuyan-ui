<template>
  <li class="xy-menu-item" :style="{paddingLeft:indentValue+'px'}">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'xy-menu-item',
  props: {
    indentValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props,content) {
    return {};
  },
});
</script>

<style scoped>
.xy-menu-item {
  padding: 10px;
  background-color: var(--xy-menu-item-bg-color);
  border-bottom: 1px solid #ccc;
  list-style-type: none; /* 取消 li 前面的标号 */
}
</style>
