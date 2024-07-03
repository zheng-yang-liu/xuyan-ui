<template>
  <div style="display: inline-block">
    <div
      :style="[initialStyle]"
      @click="buttonClick"
      class="xy-button"
      ref="xyButton"
      @mouseover.stop.prevent="buttonMouseOver"
      @mouseleave.stop.prevent="buttonMouseLeave"
    >
      <div class="xy-button-text">
        <i :class="`iconfont icon-${frontIcon}`" class="frontIcon"></i>
        <slot></slot>
        <i :class="`iconfont icon-${postIcon}`" class="postIcon"></i>
      </div>

    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, ref,PropType} from 'vue'
import {buttonType} from "./xy-button-type"
import{deepCopy}from"../../tools"
export default defineComponent({
  name: "xy-button",
  props: {
    width: {
      type: Number,
      default: "84"
    },
    height: {
      type: Number,
      default: "32"
    },
    color:{
      type: String,
      default: "#fff"
    },
    type:{
      type: String as PropType<buttonType>,
      default: "default"
    },
    frontIcon:{
      type: String,
      default: ""
    },
    postIcon:{
      type: String,
      default: ""
    }
  },
  emits: ['click'],
  components: {},
  setup(props, context) {
    const tempStyle = {
      color:'#3e3e3e',
      padding:"0 14px",
      border:'1px solid #dcdfe6',
      height: `${props.height}px`,
      minWidth: `${props.width}px`,
      backgroundColor: props.color,
      lineHeight: `${props.height}px`,
    };
    const initialStyle = ref(deepCopy(tempStyle))
    const xyButton = ref<HTMLElement|null>(null);

    const buttonClick = () => {
      context.emit('click')
    }

    const init = () => {
      if(props.frontIcon){
        initialStyle.value.padding = "0 14px 0 28px";
      }
      if(props.postIcon){
        initialStyle.value.padding = "0 28px 0 14px";
      }
      if(props.frontIcon && props.postIcon){
        initialStyle.value.padding = "0 28px";
      }
      const baseStyle = ()=>{
        initialStyle.value.border = "0";
        initialStyle.value.color = "#fff";
      }
      switch (props.type){
        case "primary":
          baseStyle();
          initialStyle.value.backgroundColor = "#409EFF";
          break;
        case "success":
          baseStyle();
          initialStyle.value.backgroundColor = "#67c23a";
          break;
        case "info":
          baseStyle();
          initialStyle.value.backgroundColor = "#b1b3b8";
          break;
        case "warning":
          baseStyle();
          initialStyle.value.backgroundColor = "#e6a23c";
          break;
        case "danger":
          baseStyle();
          initialStyle.value.backgroundColor = "#f56c6c";
          break;
      }
    }

    const buttonMouseOver = () => {
      if(props.type === "default"){
        initialStyle.value.border = "1px solid #c6e2ff";
        initialStyle.value.backgroundColor = "#ecf5ff";
        initialStyle.value.color = "#409eff";
        return;
      }
      initialStyle.value.opacity = "0.6";
    }
    const buttonMouseLeave = () => {
      if(props.type === "default"){
        initialStyle.value = deepCopy(tempStyle);
        return;
      }
      initialStyle.value.opacity = "1";
    }
    init()
    return {
      buttonClick,
      initialStyle,
      xyButton,
      buttonMouseOver,
      buttonMouseLeave
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin";
.xy-button{
  @include display-flex(center,center);
  border-radius: 4px;
  cursor: pointer;
  .xy-button-text{
    font-size: 14px;
    position: relative;
    text-align: center;
    //不允许换行
    white-space: nowrap;
    i{
      font-size: 14px;
    }
    .frontIcon{
      position: absolute;
      left: -17px;
    }
    .postIcon{
      position: absolute;
      right: -17px;
    }
  }
}
</style>