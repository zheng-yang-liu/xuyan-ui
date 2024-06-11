<template>
  <ul class="menu">
    <xy-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :item="item"
      :index="index"
      v-model:currentIndex="currentIndex"
      :height="height"
      :submenuIndent="submenuIndent"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent ,ref} from 'vue';
import type {PropType}from 'vue'
import type { MenuItem as MenuItemType } from './xy-menu.type';
import xyMenuItem from './xy-menu-item.vue'

export default defineComponent({
  name: 'xy-menu',
  components: {
    xyMenuItem
  },
  props: {
    menuItems: {
      type: Array as PropType<MenuItemType[]>,
      required: true
    },
    height:{
      type:Number,
      default:40
    },
    submenuIndent:{
      type:Number,
      default:0
    }
  },
  setup(props,context) {
    const currentIndex = ref(0);
    return {
      currentIndex
    };
  }
});
</script>

<style scoped lang="scss">
.menu {
  list-style-type: none;
  padding: 0;
}
</style>
