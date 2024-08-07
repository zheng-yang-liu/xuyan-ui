<template>
  <div :style="[{width:width},cssValue]" class="effect-preview">
    <div class="effect-box" :style="{minHeight:`${effectHeight}px`}"><slot></slot></div>
    <div class="effect-tools">

      <i class="iconfont icon-fuzhi" title="复制" @click="copy"></i>
      <i class="iconfont icon-zhankai" title="查看源代码" @click="showCode=!showCode"></i>
    </div>
    <transition
      name="showCode"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
    >
      <div class="effect-code" v-if="showCode">
        <xy-code-preview :code="code" :language="language" :round="false"></xy-code-preview>
      </div>
    </transition>
    <div class="effect-code-close" @click="showCode=!showCode" v-if="showCode" :style="graduallyAppearing">
      <i class="iconfont icon-insert-right-full"></i>
      <p>隐藏源代码</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,watch} from 'vue'
import xyCodePreview from "./xy-code-preview.vue";
import{copyText}from "../../Utils/Tools"
import animationAPI from"../../Utils/AnimationAPI/AnimationUtils"
export default defineComponent({
  name: "xy-effect-preview",
  props: {
    width:{
      type:String,
      default:'100%'
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'xml'
    },
    effectHeight:{
      type:Number,
      default:85,
    }
  },
  components: {
    xyCodePreview
  },
  setup(props, context) {
    const showCode = ref<Boolean>(false);
    const graduallyAppearing = ref<Object>({opacity:0});
    const cssValue = ref({
      '--effect-preview-overflow':'hidden'
    })
    const beforeEnter = (el: HTMLElement) => {
      el.style.height = '0';
    };

    const enter = (el: HTMLElement) => {
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', () => {
        el.style.height = 'auto';
      }, { once: true });
    };

    const leave = (el: HTMLElement) => {
      el.style.height = `${el.scrollHeight}px`;
      setTimeout(() => {
        el.style.height = '0';
      });
    };

    const copy = async ()=>{
      await copyText(props.code);
    }
    cssValue.value['--effect-preview-overflow']='hidden'
    watch(()=>showCode.value,(newValue)=>{
      if(newValue){
        setTimeout(
          ()=> {
            cssValue.value['--effect-preview-overflow']='visible'
            animationAPI.numberAnimate(400,0,1,(value:number)=>{
              graduallyAppearing.value.opacity=value;
            },"ease")
          },
          400);
      }else{
        cssValue.value['--effect-preview-overflow']='hidden'
      }
    })
    return {
      showCode,
      beforeEnter,
      enter,
      leave,
      copy,
      graduallyAppearing,
      cssValue
    }
  }
})
</script>

<style scoped lang="scss">
@import"../../assets/style/mixin.scss";
$bgColor: #ffffff;
$borderSolid: 1px solid #cdcdcd;
$animationLaunch:height 0.5s ease;
$radius: 4px;
.effect-preview{
  background-color: $bgColor;
  border: $borderSolid;
  border-radius: $radius;
  overflow: var(--effect-preview-overflow);
  .effect-box{
    padding: 24px;
    border-bottom: $borderSolid;

  }
  .effect-tools{
    padding: 8px;
    @include display-flex(center,flex-end);
    i{
      font-size: 17px;
      padding: 0 5px;
      cursor: pointer;
    }
  }
  .effect-code{

  }
  .effect-code-close{
    width: 100%;
    height: 40px;
    cursor: pointer;
    background-color: $bgColor;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    border-bottom-right-radius: $radius;
    border-bottom-left-radius: $radius;
    transition: $animationLaunch;

    @include display-flex(center,center);
    i{
      display: inline-block;
      transform: rotate(-90deg);
    }
    &:hover{
      color: #3c9cff;
    }
  }
  .showCode-enter-active,
  .showCode-leave-active {
    transition: $animationLaunch;
  }
}
</style>