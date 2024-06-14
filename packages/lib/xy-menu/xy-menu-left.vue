<template>
  <div :style="{maxHeight:`${height}px`}" class="xyMenuLeftLogo" ref="xyMenuLeftLogo">
    <slot name="logo"></slot>
  </div>
  <ul class="menu-left" :style="{backgroundColor:itemStyle.backgroundColor}" ref="menuLeft">
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
      :expandAll="expandAll"
      :selfJump="selfJump"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent ,ref,provide,onMounted} from 'vue';
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
      type: Object as PropType<{
        autoIndent:boolean,
        indentValue:number,
        currentIndent:number
      }>,
      default:()=>({
        autoIndent:true,
        indentValue:10,
        currentIndent:0
      })
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
      type:Object as PropTYpe<{
        backgroundColor?:string,
        color?:string,
        border?:string
      }>,
      default:()=>({
        backgroundColor: '#f9f9fc',
        color: '#2c2c2c',
        border: '1px solid #e8e8e8'
      })
    },
    expandAll:{
      type:Boolean,
      default:false
    },
    selfJump:{
      type:Boolean,
      default:true
    }
  },
  emits:['clickItem'],
  setup(props,context) {
    const currentIndex = ref(0);
    const currentID = ref(props.startID);
    provide('currentID', currentID);
    const xyMenuLeftLogo = ref<HTMLElement | null>(null);
    const menuLeft = ref<HTMLElement | null>(null);


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
      afterConversionMenu.value = addSubmenuIndent(
        props.menuItems,
        props.submenuIndentConfig.indentValue,
        props.submenuIndentConfig.currentIndent
      );
    }
    convertData();
    const xyMenuClickItem = (item:MenuItemType)=>{
      context.emit('clickItem',item)
    }
    provide('xyMenuClickItem',xyMenuClickItem)
    const setMenuHeight = ()=>{
      const logoHeight = xyMenuLeftLogo.value.offsetHeight;
      const tempMenuHeight = menuLeft.value.offsetHeight
      menuLeft.value.style.height = tempMenuHeight - logoHeight + 'px';
    }
    onMounted(()=>{
      setMenuHeight();
    })
    return {
      currentIndex,
      afterConversionMenu,
      xyMenuLeftLogo,
      menuLeft
    };
  }
});
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";
.menu-left {
  list-style-type: none;
  padding: 0;
  height: 100%;
  overflow-y: auto;
}
@include scrollbar;

</style>
