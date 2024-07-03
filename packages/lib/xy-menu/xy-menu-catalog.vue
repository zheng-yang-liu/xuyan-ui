<template>
  <div
    class="menu-catalog"
    :style="[
      {
        position:'sticky',
        top:`${stickyTop}px`,
        height:'100%'
      }
      ,stickyStyle
    ]"
  >
    <xy-menu-left
      :height="height"
      :selfJump="false"
      :needPath="false"
      :expandAll="true"
      :showPrompt="false"
      :startID="currentID"
      :defaultStyle="false"
      :isTheHeightSet="false"
      :areAllClickable="true"
      :menuItems="menuItems"
      :fillingDefaultIcon="false"
      @clickItem="clickItemToTitle"
      :selectStyle="{color:'#409eff'}"
      :itemTitleStyle="{fontWeight:500,fontSize:'12px'}"
      :mouseOverStyle="{color:'#409eff',cursor:'pointer'}"
      :submenuIndentConfig="{autoIndent:false,indentValue:10,currentIndent:0}"
      :menuLeftStyle="{position:'relative'}"
      :logoSlotStyle="{position: 'absolute',top:`${height/2-promptBlockHeight/2}px`,display:'flex',alignItems:'center'}"
    >
      <template #logo>
        <div class="promptBlockBox">
          <div v-if="showPromptBlockCH" :style="{top:`${promptBlockTopCH}px`,height:`${promptBlockHeight}px`}" class="promptBlock"></div>
        </div>
      </template>
    </xy-menu-left>
  </div>
</template>

<script lang="ts">
import {defineComponent,PropType,ref,watch} from 'vue'
import{calculateItemDepth}from"../../tools"
import{targetListItem}from"./xy-menu.type"
import xyMenuLeft from "./xy-menu-left.vue";
export default defineComponent({
  name: "xy-menu-catalog",
  props: {
    catalogue: {
      type: Array as PropType<targetListItem[]>,
      default: () => [],
      required: true
    },
    startID: {
      type: String,
      default: ''
    },
    height:{
      type:Number,
      default:30
    },
    showPromptBlock:{
      type:Boolean,
      default:false
    },
    promptBlockTop:{
      type:Number,
      default:0
    },
    stickyTop:{
      type:Number,
      default:50
    },
    stickyStyle:{
      type:Object,
      default:()=>({})
    },
    completeData:{
      type:Boolean,
      default:false
    },
    totalQuantity:{
      type:Number,
      default:0
    },//提示框的高度
    promptBlockHeight:{
      type:Number,
      default:15
    }
  },
  components: {
    xyMenuLeft
  },
  emits: ['clickItem'],
  setup(props, context) {
    const menuItems = ref(props.catalogue);
    const currentID = ref(props.startID);
    const totalQuantityCH = ref(props.totalQuantity);
    const showPromptBlockCH = ref(props.showPromptBlock);
    const promptBlockTopCH = ref(props.promptBlockTop);
    watch(() => props.startID,
      (val) => {
        currentID.value = val;
      }
    );
    watch(()=>props.showPromptBlock,
      (val) => {
        showPromptBlockCH.value = val;
      }
    );
    watch(()=>props.promptBlockTop,
      (val) => {
        promptBlockTopCH.value = val;
      }
    );
    const init = () =>{
      if(props.completeData){
        const {updatedList,nextPos} = calculateItemDepth(
          props.catalogue,
          10,
          0
        );
        totalQuantityCH.value = nextPos;
        menuItems.value = updatedList;
      }
    }
    init();
    const clickItemToTitle = (item: targetListItem) => {
      currentID.value = item.id;
      showPromptBlockCH.value = true;
      promptBlockTopCH.value = props.height * item.listPosition
      context.emit('clickItem', item);
    };
    return {
      currentID,
      menuItems,
      totalQuantityCH,
      promptBlockTopCH,
      clickItemToTitle,
      showPromptBlockCH
    }
  }
})
</script>

<style scoped lang="scss">
.menu-catalog{
  display: flex;
  .promptBlockBox{
    position:relative;
    width:4px;
    height:15px;
    .promptBlock{
      position:absolute;
      width:4px;
      background-color:#409eff;
      border-radius:3px;
      left:0;
    }
  }
}
</style>