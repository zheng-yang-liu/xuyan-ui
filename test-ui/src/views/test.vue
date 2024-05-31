<template>
  <div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <button @click="drawImage">Draw Image</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'CanvasImageComponent',
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const canvasWidth = 800;
    const canvasHeight = 600;
    const imageSrc = 'https://via.placeholder.com/150'; // 替换为你的图片 URL

    const drawImage = () => {
      if (canvas.value) {
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          };
        }
      }
    };

    onMounted(() => {
      // 可以选择在组件挂载时就绘制图片
      drawImage();
    });

    return {
      canvas,
      canvasWidth,
      canvasHeight,
      drawImage
    };
  }
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
