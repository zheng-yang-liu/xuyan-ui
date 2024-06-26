<template>
  <div class="tooltipBox" ref="tooltipBox">
    <div
      @click.stop.prevent="clickShow"
      @mouseover.stop.prevent="mouseOver"
      @mouseleave.stop.prevent="mouseLeave"
    >
      <slot name="display"></slot>
    </div>
    <div class="tooltipContent" ref="tooltipContent">
      <div v-if="content" class="contentText" ref="contentText">{{ content }}</div>
      <template v-if="!content">
        <slot name="prompt" style="width: 100px"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue';
import emitter from '../../tools/mitt';

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
    }
  },
  setup(props) {
    const tooltipBox = ref<HTMLElement | null>(null);
    const tooltipContent = ref<HTMLElement | null>(null);
    const contentText = ref<HTMLElement | null>(null);
    const isVisible = ref(false);

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
        tooltipContent.value.style.left = (vertexX - contentRect.width / 2) + props.XOffset + 'px';
        tooltipContent.value.style.top = vertexY + props.topOffset + 'px';
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

    onMounted(() => {
      initTooltipContent();
      emitter.on('closeAll', closeTooltip);
    });

    onUnmounted(() => {
      emitter.off('closeAll', closeTooltip);
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      tooltipBox,
      tooltipContent,
      mouseOver,
      mouseLeave,
      clickShow,
      contentText
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
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-bottom-color: #dcdfe6;
      z-index: 9999;
    }
    &:after {
      content: '';
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-bottom-color: #ffffff;
      z-index: 9999;
    }
  }
}
</style>
