<template>
  <div class="tooltipBox" ref="tooltipBox">
    <div
      @click.stop.prevent="clickShow"
      @mouseover.stop.prevent="mouseOver"
      @mouseleave.stop.prevent="mouseLeave"
    >
      <slot></slot>
    </div>
    <div :class="tooltipContentType[position]" ref="tooltipContent">
      <div v-if="content" class="contentText" ref="contentText">{{ content }}</div>
      <template v-if="!content">
        <slot name="prompt" style="width: 100px"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onUnmounted, nextTick, PropType} from 'vue';
import emitter from '../../Utils/mitt';
import {positionType}from"./xy-tooltip.type"

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
    inTime: {
      type: Number,
      default: 0.3
    },
    outTime: {
      type: Number,
      default: 0.3
    },
    topOffset: {
      type: Number,
      default: 10
    },
    XOffset: {
      type: Number,
      default: 0
    },
    position: {
      type: String as PropType<positionType>,
      default: 'bottom'
    }
  },
  setup(props) {
    const tooltipBox = ref<HTMLElement | null>(null);
    const tooltipContent = ref<HTMLElement | null>(null);
    const contentText = ref<HTMLElement | null>(null);
    const isVisible = ref(false);
    const tooltipContentType = {
      top: 'tooltipContentBottom',
      right: 'tooltipContentLeft',
      bottom: 'tooltipContentTop',
      left: 'tooltipContentRight'
    };

    const initTooltipContent = async () => {
      await nextTick(); // 确保 DOM 已更新
      if (tooltipContent.value && tooltipBox.value) {
        const tooltipBoxRect = tooltipBox.value.getBoundingClientRect();
        const tooltipBoxX = tooltipBoxRect.left;

        const maxWidth = Math.min(tooltipBoxX, window.innerWidth - tooltipBoxX);
        tooltipContent.value.style.maxWidth = `${maxWidth}px`;

        tooltipContent.value.style.whiteSpace = 'normal';
        tooltipContent.value.style.wordBreak = 'break-all';

        const vertexX = tooltipBoxRect.left + tooltipBoxRect.width / 2;
        const vertexY = tooltipBoxRect.top + tooltipBoxRect.height;
        const contentRect = tooltipContent.value.getBoundingClientRect();

        const setupAndDown = (distance:number)=>{
          tooltipContent.value.style.left = (vertexX - contentRect.width / 2) + props.XOffset + 'px';

          tooltipContent.value.style.top = distance + 'px';
        }
        const setLeftAndRight = (distance:number)=>{
          tooltipContent.value.style.left = distance + 'px';
          tooltipContent.value.style.top = tooltipBoxRect.top -contentRect.height/4  + 'px';
        }

        switch (props.position){
          case 'top':
            const topVertexY = tooltipBoxRect.top - tooltipBoxRect.height - 12;
            setupAndDown(topVertexY - props.topOffset);
            break;
          case 'right':
            setLeftAndRight(tooltipBoxRect.right + 12 + props.XOffset);
            break;
          case 'bottom':
            setupAndDown(vertexY + props.topOffset);
            break;
          case 'left':
            setLeftAndRight(tooltipBoxRect.left - contentRect.width -12 + props.XOffset);
            break;
        }
      }
    };

    const animateIN = () => {
      if (tooltipContent.value) {
        tooltipContent.value.style.zIndex = '9999';
        tooltipContent.value.style.transition = `opacity ${props.inTime}s`;
        tooltipContent.value.style.opacity = '1';
      }
    };

    const animateOUT = () => {
      if (tooltipContent.value) {
        tooltipContent.value.style.transition = `opacity ${props.outTime}s`;
        tooltipContent.value.style.opacity = '0';
        setTimeout(() => {
          tooltipContent.value && (tooltipContent.value.style.zIndex = '-9999');
        }, props.outTime*1000);
      }
    };

    const mouseOver = () => {
      if (!props.hoverShow) return;
      animateIN();
      initTooltipContent(); // 确保位置计算在鼠标移入时进行
    };

    const mouseLeave = () => {
      if (!props.hoverShow) return;
      animateOUT();
    };

    const clickShow = () => {
      if (props.hoverShow) return;

      if (!isVisible.value) {
        emitter.emit('closeAll');
        animateIN();
        document.addEventListener('click', handleClickOutside);
      } else {
        animateOUT();
        document.removeEventListener('click', handleClickOutside);
      }

      isVisible.value = !isVisible.value;
      nextTick(initTooltipContent); // 确保位置计算在 DOM 更新完成后进行
    };

    const closeTooltip = () => {
      if (isVisible.value) {
        animateOUT();
        isVisible.value = false;
        document.removeEventListener('click', handleClickOutside);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipContent.value && !tooltipContent.value.contains(e.target as Node)) {
        closeTooltip();
      }
    };

    const handleScroll = () => {
      if (isVisible.value) {
        initTooltipContent(); // 重新计算tooltip位置
      }
    };

    onMounted(() => {
      initTooltipContent();
      emitter.on('closeAll', closeTooltip);
      window.addEventListener('scroll', handleScroll, true);
    });

    onUnmounted(() => {
      emitter.off('closeAll', closeTooltip);
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    });

    return {
      tooltipBox,
      tooltipContent,
      mouseOver,
      mouseLeave,
      clickShow,
      contentText,
      tooltipContentType
    };
  }
});
</script>

<style scoped lang="scss">
.tooltipBox {
  display: inline-block;
  position: relative;
  .tooltipContent {
    padding: 6px 11px;
    border-radius: 5px;
    display: inline-block;
    background-color: #fff;
    z-index: -9999;
    position: fixed;
    opacity: 0;
    border: 1px solid #dcdfe6;

    &::before,
    &::after {
      content: '';
      position: absolute;
      border: 5px solid transparent;
      z-index: 9999;
    }

    &::before {
      border-bottom-color: #dcdfe6;
    }

    &::after {
      border-bottom-color: #ffffff;
    }
  }

  .tooltipContentTop {
    @extend .tooltipContent;

    &::before {
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
    }

    &::after {
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tooltipContentBottom {
    @extend .tooltipContent;

    &::before {
      top: 34px;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: #dcdfe6;
      border-bottom-color: transparent;
    }

    &::after {
      top: 33px;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: #ffffff;
      border-bottom-color: transparent;
    }
  }

  .tooltipContentLeft {
    @extend .tooltipContent;

    &::before {
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
      border-right-color: #dcdfe6;
      border-bottom-color: transparent;
    }

    &::after {
      top: 50%;
      left: -9px;
      transform: translateY(-50%);
      border-right-color: #ffffff;
      border-bottom-color: transparent;
    }
  }

  .tooltipContentRight {
    @extend .tooltipContent;

    &::before {
      top: 50%;
      right: -10px;
      transform: translateY(-50%);
      border-left-color: #dcdfe6;
      border-bottom-color: transparent;
    }

    &::after {
      top: 50%;
      right: -9px;
      transform: translateY(-50%);
      border-left-color: #ffffff;
      border-bottom-color: transparent;
    }
  }
}
</style>
