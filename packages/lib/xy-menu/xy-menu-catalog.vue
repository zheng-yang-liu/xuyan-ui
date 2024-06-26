<template>
  <div class="menu-catalog" :style="[{position:'sticky',top:`${stickyTop}px`},stickyStyle]">
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
      :logoSlotStyle="{position:'sticky',top:'50px',display:'flex',alignItems:'center'}"
    >
      <template #logo>
        <div class="promptBlockBox">
          <div v-if="showPromptBlockCH" :style="{top:`${promptBlockTopCH}px`}" class="promptBlock"></div>
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
      default:true
    }
  },
  components: {
    xyMenuLeft
  },
  emits: ['clickItem'],
  setup(props, context) {
    const menuItems = ref(props.catalogue);
    const currentID = ref(props.startID);
    const showPromptBlockCH = ref(props.showPromptBlock);
    const promptBlockTopCH = ref(props.promptBlockTop);
    watch(() => props.startID,
      (val) => {
        currentID.value = val;
      }
    );
    const init = () =>{
      if(props.completeData){
        const {updatedList,listTotal} = calculateItemDepth(
          props.catalogue,
          10,
          0
        );
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
      promptBlockTopCH,
      showPromptBlockCH,
      clickItemToTitle
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
      height:15px;
      background-color:#409eff;
      border-radius:3px;
      left:0;
    }
  }
}
</style>