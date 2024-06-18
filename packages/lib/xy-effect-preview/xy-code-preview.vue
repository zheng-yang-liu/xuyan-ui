<template>
  <pre v-highlightjs="code">
    <code :class="languageClass"></code>
  </pre>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import 'highlight.js/styles/atom-one-dark.css';

export default defineComponent({
  name: 'xy-code-preview',
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'xml'
    }
  },
  setup(props, context) {
    const languageClass = computed(() => `language-${props.language}`);

    return {
      languageClass,
    };
  }
});

</script>

<style scoped>
/* 自定义样式以确保标点符号为英文状态 */
.hljs {
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
}
/* 可以根据需要添加更多的自定义样式 */
</style>
