<template>
  <div class="tooltipBox"
       ref="tooltipBox"
  >
    <div
      @click.stop.prevent="clickShow"
      @mouseover.stop.prevent="mouseOver"
      @mouseleave.stop.prevent="mouseLeave"
    >
      <slot name="display"></slot>
    </div>
    <div class="tooltipContent" ref="tooltipContent">
      <p v-if="content" class="contentText">{{content}}</p>
      <template v-if="!content">
        <slot name="prompt"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: "xy-tooltip",
  props: {
    content: {
      type: String,
      default: ''
    },
    hoverShow: {
      type: Boolean,
      default: true
    },
    inTime:{
      type: Number,
      default: 0.3
    },
    outTime:{
      type: Number,
      default: 0.3
    }
  },
  setup(props) {
    const tooltipBox = ref<HTMLElement | null>(null);
    const tooltipContent = ref<HTMLElement | null>(null);

    const intiTooltipContent = () => {
      if (tooltipContent.value) {
        const tooltipBoxRect = tooltipBox.value?.getBoundingClientRect();
        const vertexX = tooltipBoxRect.left + tooltipBoxRect.width / 2;
        const vertexY = tooltipBoxRect.top + tooltipBoxRect.height + 5;
        const contentRect = tooltipContent.value.getBoundingClientRect();
        tooltipContent.value.style.left = (vertexX - contentRect.width / 2) + 'px';
        tooltipContent.value.style.top = vertexY + 'px';
      }
    };

    const animateIN = () => {
      if (tooltipContent.value) {
        tooltipContent.value.style.transition = `opacity ${props.inTime}s`;
        tooltipContent.value.style.opacity = 1;
      }
    };
    const animateOUT = () => {
      if (tooltipContent.value) {
        tooltipContent.value.style.transition = `opacity ${props.outTime}s`;
        tooltipContent.value.style.opacity = 0;
      }
    };
    const mouseOver = () => {
      if(!props.hoverShow) return;
      animateIN();
    };
    const mouseLeave = () => {
      if(!props.hoverShow) return;
     animateOUT();
    };
    let tempClickShow = true;
    const clickShow = () => {
      if(props.hoverShow) return;
      if(tempClickShow){
        animateIN();
        tempClickShow = false;
      }else{
        animateOUT();
        tempClickShow = true;
      }
      // 点击其他地方隐藏
      document.addEventListener('click', (e) => {
        //阻止事件冒泡
        e.stopPropagation();
        if(e.target !== tooltipContent.value){
         if(!tooltipContent.value?.contains(e.target as Node)){
           animateOUT();
           tempClickShow = true;
         }
        }
      });
    };


    onMounted(() => {
      intiTooltipContent();
    });

    return {
      tooltipBox,
      tooltipContent,
      mouseOver,
      mouseLeave,
      clickShow
    };
  }
});
</script>

<style scoped lang="scss">
.tooltipBox {
  position: relative;
  .tooltipContent {
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
    background-color: #fff;
    z-index: 9999;
    position: fixed;
    opacity: 0;
    //transition: opacity 0.3s; // 设置过渡效果
    &:before {
      content: '';
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-bottom-color: #fff;
      z-index: 9999;
    }
  }
}
</style>
