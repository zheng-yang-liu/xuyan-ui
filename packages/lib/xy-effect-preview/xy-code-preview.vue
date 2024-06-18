<template>
  <pre v-highlightjs="code" ref="preBox">
    <code :class="languageClass" ref="codeBox"></code>
  </pre>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue';

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
    const codeBox = ref<HTMLElement | null>(null);
    const preBox = ref<HTMLElement | null>(null);
    onMounted(() => {
      if (codeBox.value) {
        console.log(codeBox.value.scrollHeight);
        //获取高度
        preBox.value.style.height = `${codeBox.value.scrollHeight}px`;
        preBox.value.style.position = 'relative';
        codeBox.value.style.position = 'absolute';
        codeBox.value.style.inset = 0;
      }
    });
    return {
      languageClass,
      codeBox,
      preBox
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
