<template>
  <pre v-highlightjs="code" ref="preBox">
    <code :class="languageClass" ref="codeBox" :style="round?{borderRadius:'10px'}:''"></code>
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
    },//是否圆角
    round: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const languageClass = computed(() => `language-${props.language}`);
    const codeBox = ref<HTMLElement | null>(null);
    const preBox = ref<HTMLElement | null>(null);
    onMounted(() => {
      if (codeBox.value) {
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

<style scoped lang="scss">
@import"../../assets/style/mixin.scss";
.hljs {
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
  overflow-x: auto;
  overflow-y: hidden;
}
@include scrollbar();
</style>
