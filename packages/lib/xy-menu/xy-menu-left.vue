<template>
  <ul class="menu-left">
    <xy-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :item="item"
      :id="item.id"
      :index="index"
      :height="height"
      :submenuIndent="submenuIndent"
      :mouseOverColor="mouseOverColor"
      :expandAll="expandAll"
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
    },//子菜单缩进量
    submenuIndent:{
      type:Number,
      default:0
    },
    mouseOverColor:{
      type:String,
      default:'#014da1'
    },
    expandAll:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context) {
    return {
    };
  }
});
</script>

<style scoped lang="scss">
.menu-left {
  list-style-type: none;
  padding: 0;
}
</style>
