<template>
  <div :style="{maxHeight:`${height}px`}" class="xyMenuLeftLogo" ref="xyMenuLeftLogo">
    <slot name="logo"></slot>
  </div>
  <ul class="menu-left" :style="[{backgroundColor:itemStyle.backgroundColor},menuLeftStyle]" ref="menuLeft">
    <xy-menu-item
      :key="index"
      :item="item"
      :index="index"
      :height="height"
      :selfJump="selfJump"
      :expandAll="expandAll"
      v-model:currentIndex="currentIndex"
      :indent="submenuIndentConfig.autoIndent"
      :fillingDefaultIcon="fillingDefaultIcon"
      v-for="(item, index) in afterConversionMenu"
      :itemStyle="defaultStyle?defaultItemStyle:itemStyle"
      :selectStyle="defaultStyle?defaultSelectStyle:selectStyle"
      :mouseOverStyle="defaultStyle?defaultMouseOverStyle:mouseOverStyle"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent ,ref,provide,onMounted} from 'vue';
import type {PropType}from 'vue'
import type { menuItem as MenuItemType } from './xy-menu.type';
import xyMenuItem from './xy-menu-item.vue'
import{calculateItemDepth}from'../../tools'

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
      type:Object,
      default:()=>({})
    },
    expandAll:{
      type:Boolean,
      default:false
    },
    selfJump:{
      type:Boolean,
      default:true
    },
    mouseOverStyle:{
      type:Object,
      default:()=>({})
    },
    defaultStyle:{
      type:Boolean,
      default:true,
    },
    fillingDefaultIcon:{
      type:Boolean,
      default:true
    },
    menuLeftStyle:{
      type:Object,
      default:()=>({})
    }
  },
  emits:['clickItem'],
  setup(props,context) {
    const currentIndex = ref(0);
    const currentID = ref(props.startID);
    provide('currentID', currentID);
    const xyMenuLeftLogo = ref<HTMLElement | null>(null);
    const menuLeft = ref<HTMLElement | null>(null);
    const defaultSelectStyle = {
      backgroundColor: '#417ff2',
      color: '#ffffff',
      border: '1px solid #e8e8e8'
    }
    const defaultItemStyle = {
      backgroundColor: '#f9f9fc',
      color: '#2c2c2c',
      border: '1px solid #EDEDEDFF'
    }
    const defaultMouseOverStyle = {
      backgroundColor: '#ecf5ff'
    }
    
    const afterConversionMenu = ref<MenuItemType>(props.menuItems);
    const convertData = ()=>{
      if(!props.submenuIndentConfig.autoIndent) return;
      afterConversionMenu.value = calculateItemDepth(
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
      menuLeft,
      defaultSelectStyle,
      defaultItemStyle,
      defaultMouseOverStyle,
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
