<template>
  <ul class="menu">
    <xy-menu-item
      v-for="(item, index) in afterConversionMenu"
      :key="index"
      :item="item"
      :index="index"
      v-model:currentIndex="currentIndex"
      :height="height"
      :selectStyle="selectStyle"
      :itemStyle="itemStyle"
      :indent="submenuIndentConfig.autoIndent"

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
    submenuIndentConfig:{
      type: Object as PropType<{autoIndent:boolean,indentValue:number,currentIndent:number}>,
      default:()=>({autoIndent:false,indentValue:10,currentIndent:0})
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
    const addSubmenuIndent = (menuItems:MenuItemType[], indentValue = 10, currentIndent = 0):MenuItemType[]=> {
      return menuItems.map(item => {
        let newItem = { ...item, submenuIndent: currentIndent };
        if (newItem.children) {
          newItem.children = addSubmenuIndent(newItem.children, indentValue, currentIndent + indentValue);
        }
        return newItem;
      });
    }
    const afterConversionMenu = ref<MenuItemType>(props.menuItems);
    const convertData = ()=>{
      if(!props.submenuIndentConfig.autoIndent) return;
      afterConversionMenu.value = addSubmenuIndent(props.menuItems, props.submenuIndentConfig.indentValue, props.submenuIndentConfig.currentIndent);
      console.log(afterConversionMenu.value);
    }
    convertData();
    return {
      currentIndex,
      afterConversionMenu
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
