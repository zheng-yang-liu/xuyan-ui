<template>
  <div style="width: 500px;height: 500px;background-color: red;display: flex;align-items:center;justify-content:center">
    <div style="position:relative;background-color: green;overflow: hidden;width: 300px;height: 300px">
      <img src="@/assets/defaultPicture.png" style="width: 300px;height: 300px;position:absolute;top: 0;left: 0">
          <div
            class="hole"
            :style="holeStyle"
            @mousedown.stop.prevent="onHoleMouseDown"
          >
            <div
              class="resize-handle"
              @mousedown.stop.prevent="onHandleMouseDown"
            ></div>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';

export default defineComponent({
  setup() {
    const hole = reactive({
      width: 100,
      height: 100,
      top: 100,
      left: 100,
    });

    const overlayWidth = 300;
    const overlayHeight = 300;

    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startTop = 0;
    let startLeft = 0;
    let resizing = false;
    let dragging = false;
    //改变位置
    const onHoleMouseDown = (e: MouseEvent) => {
      if (resizing) return;
      console.log('onHoleMouseDown',e)
      startX = e.clientX;
      startY = e.clientY;
      startTop = hole.top;
      startLeft = hole.left;
      dragging = true;

      document.addEventListener('mousemove', onHoleMouseMove);
      document.addEventListener('mouseup', onHoleMouseUp);
    };

    const onHoleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      hole.top = Math.min(Math.max(startTop + dy, 0), overlayHeight - hole.height);
      hole.left = Math.min(Math.max(startLeft + dx, 0), overlayWidth - hole.width);
    };

    const onHoleMouseUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onHoleMouseMove);
      document.removeEventListener('mouseup', onHoleMouseUp);
    };
    //改变宽度
    const onHandleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = hole.width;
      startHeight = hole.height;
      resizing = true;

      document.addEventListener('mousemove', onHandleMouseMove);
      document.addEventListener('mouseup', onHandleMouseUp);
    };

    const onHandleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      hole.width = Math.min(Math.max(50, startWidth + dx), overlayWidth - hole.left);
      hole.height = Math.min(Math.max(50, startHeight + dy), overlayHeight - hole.top);
      //宽高保持1：1
      hole.width = hole.height = Math.min(hole.width, hole.height);
    };

    const onHandleMouseUp = () => {
      resizing = false;
      document.removeEventListener('mousemove', onHandleMouseMove);
      document.removeEventListener('mouseup', onHandleMouseUp);
    };

    const holeStyle = computed(() => ({
      width: `${hole.width}px`,
      height: `${hole.height}px`,
      top: `${hole.top}px`,
      left: `${hole.left}px`,
      position: 'absolute',
      background: 'transparent',
      boxShadow: `0 0 0 300px rgba(0, 0, 0, 0.5), inset 0 0 0 2px transparent`,
    }));

    return {
      hole,
      holeStyle,
      onHoleMouseDown,
      onHandleMouseDown,
    };
  },
});
</script>

<style scoped>
.hole {
  position: absolute;
  background: transparent;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0;
  right: 0;
  background-color: black;
  cursor: se-resize;
}
</style>
