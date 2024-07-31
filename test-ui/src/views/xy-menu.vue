<template>
  <ul class="xy-menu">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted ,ref,provide} from 'vue';

export default defineComponent({
  name: 'xy-menu',
  props: {
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    width:{
      type: Number,
      default: 200,
    },
    showAll:{
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const currentSubMenuId = ref('');
    const currentSubMenuFatherId = ref('');
    const setCurrentSubMenuId = (subMenuId: string) => {
      currentSubMenuId.value = subMenuId;
    };
    const setCurrentSubMenuFatherId = (subMenuFatherId: string) => {
      currentSubMenuFatherId.value = subMenuFatherId;
    };
    provide('currentSubMenuId', currentSubMenuId);
    provide('setCurrentSubMenuId', setCurrentSubMenuId);
    provide('currentSubMenuFatherId', currentSubMenuFatherId);
    provide('setCurrentSubMenuFatherId', setCurrentSubMenuFatherId);
    provide("showAll",props.showAll);
    // 设置 CSS 变量的值
    const setCssVar = (cssVarName: string, value: string) => {
      document.documentElement.style.setProperty(cssVarName, value);
    };
    setCssVar('--xy-menu-item-bg-color', props.backgroundColor);
    setCssVar('--xy-menu-width', `${props.width}px`);

    onMounted(() => {
      // Any additional setup can go here
    });
  },
});
</script>

<style lang="scss">
:root {
  --xy-menu-item-bg-color: #fff;
  --xy-menu-width: 200px;
}

.xy-menu {
  width: var(--xy-menu-width);
  padding: 0;
  margin: 0;
  list-style-type: none; /* 取消 li 前面的标号 */
  &:hover {
    cursor: pointer;
  }
}
</style>
