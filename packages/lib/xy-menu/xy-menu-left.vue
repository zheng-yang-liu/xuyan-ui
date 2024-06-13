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
      :selectStyle="selectStyle"
      :itemStyle="itemStyle"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent ,ref,provide} from 'vue';
import type {PropType}from 'vue'
import type { menuItem as MenuItemType } from './xy-menu.type';
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
      type:String,
      default:0
    },
    startID:{
      type:String,
      default:''
    },
    selectStyle:{
      type:Object,
      default:()=>({})
    },
    itemStyle:{
      type:Object,
      default:()=>({})
    }
  },
  setup(props,context) {
    const currentIndex = ref(0);
    const currentID = ref(props.startID);
    provide('currentID', currentID);
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
