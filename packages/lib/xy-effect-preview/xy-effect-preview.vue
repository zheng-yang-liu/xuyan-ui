<template>
  <div :style="{width:width}" class="effect-preview">
    <div class="effect-box" :style="{minHeight:`${effectHeight}px`}"><slot></slot></div>
    <div class="effect-tools">
      <i class="iconfont icon-fuzhi" title="复制" @click="copyCode"></i>
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
        <div class="effect-code-close" @click="showCode=!showCode">
          <i class="iconfont icon-insert-right-full"></i>
          <p>隐藏源代码</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'
import xyCodePreview from "./xy-code-preview.vue";
import{showMsg}from "../../tools"
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
    const showCode = ref<Boolean>(false)

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
    const copyCode = () => {
      if(navigator.clipboard){
        navigator.clipboard.writeText(props.code)
          .then(() => {
            showMsg('success', '代码已复制')
          })
          .catch(err => {
            showMsg('error', '复制失败'+err)
          });
      }else{
        //Document.execCommand() 方法实现
        const codeElement = document.createElement('pre');
        codeElement.style.position = 'absolute';
        codeElement.style.left = '-9999px';
        codeElement.textContent = props.code;
        document.body.appendChild(codeElement);

        const range = document.createRange();
        range.selectNodeContents(codeElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            showMsg('success', '代码已复制');
          } else {
            showMsg('error', '复制失败');
          }
        } catch (err) {
          showMsg('error', '复制失败: ' + err);
        }

        document.body.removeChild(codeElement);
        selection.removeAllRanges();
      }

    }
    return {
      showCode,
      beforeEnter,
      enter,
      leave,
      copyCode
    }
  }
})
</script>

<style scoped lang="scss">
@import"../../assets/style/mixin.scss";
$bgColor: #ffffff;
$borderSolid: 1px solid #cdcdcd;
$animationLaunch:height 0.5s ease;
.effect-preview{
  background-color: $bgColor;
  border: $borderSolid;
  border-radius: 5px;
  overflow: hidden;
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
    .effect-code-close{
      width: 100%;
      height: 40px;
      cursor: pointer;
      //background-color: $bgColor;

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
  }
  .showCode-enter-active,
  .showCode-leave-active {
    transition: $animationLaunch;
  }
}
</style>