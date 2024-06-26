<template>
  <div :style="[{maxHeight:`${height}px`},logoSlotStyle]" class="xyMenuLeftLogo" ref="xyMenuLeftLogo">
    <slot name="logo"></slot>
  </div>
  <ul class="menu-left"
      :style="[{backgroundColor:itemStyle.backgroundColor,width:`${width}px`,minWidth:`${width}px`},menuLeftStyle]"
      ref="menuLeft"
  >
    <xy-menu-item
      :key="index"
      :item="item"
      :index="index"
      :height="height"
      :selfJump="selfJump"
      :needPath="needPath"
      :clickName="clickName"
      :expandAll="expandAll"
      :itemTitleStyle="itemTitleStyle"
      :areAllClickable="areAllClickable"
      v-model:currentIndex="currentIndex"
      :indent="indent"
      :fillingDefaultIcon="fillingDefaultIcon"
      v-for="(item, index) in afterConversionMenu"
      :itemStyle="defaultStyle?defaultItemStyle:itemStyle"
      :selectStyle="defaultStyle?defaultSelectStyle:selectStyle"
      :mouseOverStyle="defaultStyle?defaultMouseOverStyle:mouseOverStyle"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent ,ref,provide,onMounted,watch} from 'vue';
import type {PropType}from 'vue'
import type { menuItem as MenuItemType } from './xy-menu.type';
import xyMenuItem from './xy-menu-item.vue'
import{calculateItemDepth,deepLookup,showMsg}from'../../tools'
import{useRouter}from'vue-router'
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
    width:{
      type:Number,
      default:200
    },//子菜单缩进配置
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
    },//初始Id
    startID:{
      type:String,
      default:''
    },//选中item样式
    selectStyle:{
      type:Object,
      default:()=>({})
    },//item的样式
    itemStyle:{
      type:Object,
      default:()=>({})
    },//是否全部展开
    expandAll:{
      type:Boolean,
      default:false
    },//是否采用自身的跳转方式(router.push),false时父组件需@click
    selfJump:{
      type:Boolean,
      default:true
    },//鼠标悬浮item的样式
    mouseOverStyle:{
      type:Object,
      default:()=>({})
    },//是否使用自带的默认样式
    defaultStyle:{
      type:Boolean,
      default:true,
    },//是否填充默认图标
    fillingDefaultIcon:{
      type:Boolean,
      default:false
    },//menuLeft的样式
    menuLeftStyle:{
      type:Object,
      default:()=>({})
    },//是否设置高度
    isTheHeightSet:{
      type:Boolean,
      default:true
    },//是否需要path
    needPath:{
      type:Boolean,
      default:true
    },//点击事件名,多个xy-menu-item/xy-menu-left时需设置不同的值
    clickName:{
      type:String,
      default:'xyMenuClickItem'
    },//是否全部可选
    areAllClickable:{
      type:Boolean,
      default:false
    },//默认选中第一个可选item
    selectFirstItem:{
      type:Boolean,
      default:false
    },//logo插槽样式
    logoSlotStyle:{
      type:Object,
      default:()=>({})
    },//itemTitle文字样式
    itemTitleStyle:{
      type:Object,
      default:()=>({})
    },//是否缩进
    indent:{
      type:Boolean,
      default:true
    },//根据路由初始化currentID
    initByRouter:{
      type:Boolean,
      default:false
    },//提示
    showPrompt:{
      type:Boolean,
      default:true
    },
  },
  emits:['clickItem'],
  setup(props,context) {
    const currentIndex = ref(0);
    const router = useRouter();
    const firstItem = ref<object>({})
    const currentID = ref(props.startID);
    provide('currentID', currentID);
    const xyMenuLeftLogo = ref<HTMLElement | null>(null);
    const menuLeft = ref<HTMLElement | null>(null);

    watch(()=>props.startID,(newValue)=>{
      currentID.value = newValue;
    })
    const selectFirstItem = (item: any) => {
      let resultID = {};
      if (item.children) {
        resultID = item.children[0];
        if (item.children[0].children) {
          resultID = selectFirstItem(item.children[0]);
        }
      } else {
        resultID = item;
      }
      return resultID;
    }
    firstItem.value = selectFirstItem(props.menuItems[0])

    const init = () => {
      if (props.initByRouter) {
        // 根据路由初始化
        const url = router.currentRoute.value.path;
        const startItem = deepLookup(props.menuItems, item => item.path === url);
        currentID.value = startItem[0].id;
        return;
      }

      if (props.startID) {
        console.log('startID', props.startID);
        // 根据 startID 初始化
        const lookupResult = deepLookup(props.menuItems, item => item.id === props.startID);
        if (lookupResult.length) {
          const { path } = lookupResult[0];
          if (path) {
            router.push(path);
          } else {
            props.showPrompt&&showMsg('error', '初始 path 不存在');
          }
        } else {
          props.showPrompt&&showMsg('error', '初始 path 不存在');
        }
        return;
      }

      if (props.selectFirstItem) {
        // 根据第一个可选 item 初始化
        const { id, path } = firstItem.value;
        currentID.value = id;
        if (path) {
          router.push(path);
        } else {
          showMsg('error', '路径不存在');
        }
      }
    };
    init();

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
      const {updatedList,listTotal} = calculateItemDepth(
        props.menuItems,
        props.submenuIndentConfig.indentValue,
        props.submenuIndentConfig.currentIndent
      )
      afterConversionMenu.value = updatedList
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
      if(props.isTheHeightSet){
        setMenuHeight();
      }
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
