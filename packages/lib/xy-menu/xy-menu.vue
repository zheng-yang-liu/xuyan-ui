<template>
  <ul class="menu">
    <xy-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :item="item"
      :index="index"
      v-model:currentIndex="currentIndex"
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

<style scoped>
.menu {
  list-style-type: none;
  padding: 0;
}
</style>
