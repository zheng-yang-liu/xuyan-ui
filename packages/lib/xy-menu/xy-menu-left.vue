<template>
  <ul class="menu">
    <xy-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :item="item"
      :index="index"
      v-model:currentIndex="currentIndex"
      v-model:currentID="currentID"
      :height="height"
      :submenuIndent="submenuIndent"
      :selectStyle="selectStyle"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent ,ref} from 'vue';
import type {PropType}from 'vue'
import type { MenuItem as MenuItemType } from './xy-menu.type';
import xyMenuItem from './xy-menu-item.vue'

export default defineComponent({
  name: 'xy-menu-left',
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
    },
    selectStyle:{
      type:Object,
      default:()=>({})
    }
  },
  setup(props,context) {
    const currentIndex = ref(0);
    const currentID = ref('');
    return {
      currentIndex,
      currentID
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
