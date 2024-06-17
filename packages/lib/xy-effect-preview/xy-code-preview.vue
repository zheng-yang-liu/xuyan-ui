<template>
  <pre><code ref="codeBlock" :class="languageClass"></code></pre>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import hljs from 'highlight.js';
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
    const codeBlock = ref<HTMLElement | null>(null);

    const languageClass = computed(() => `language-${props.language}`);

    const highlightCode = () => {
      if (codeBlock.value) {
        // 使用 textContent 来设置代码内容，确保特殊字符被转义
        codeBlock.value.textContent = props.code;
        hljs.highlightElement(codeBlock.value);
      }
    };

    onMounted(highlightCode);
    watch(() => props.code, highlightCode);

    return {
      codeBlock,
      languageClass
    };
  }
});

</script>

<style scoped>
/* 自定义样式以确保标点符号为英文状态 */
.hljs {
  font-family: "Courier New", Courier, monospace;
}
/* 可以根据需要添加更多的自定义样式 */
</style>
