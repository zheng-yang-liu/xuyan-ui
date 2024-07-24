<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,onBeforeUnmount} from 'vue';
import {Tools} from "yanyan-ui"

const canvas = ref<HTMLCanvasElement | null>(null);
const speed = 1;

const init = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.value.width = window.innerWidth * devicePixelRatio;
  canvas.value.height = window.innerHeight * devicePixelRatio;
  canvas.value.style.width = `${window.innerWidth}px`;
  canvas.value.style.height = `${window.innerHeight}px`;
  console.log(devicePixelRatio);
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    // ctx.scale(devicePixelRatio, devicePixelRatio);
    class Point {
      constructor(){
        this.r = 6;
        this.x = Tools.randomInterval(0,canvas.value.width - this.r/2);
        this.y = Tools.randomInterval(0,canvas.value.height - this.r/2);
        this.vx = Tools.randomInterval(-speed,speed);
        this.vy = Tools.randomInterval(-speed,speed);
      }

      draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fillStyle = "rgb(200,200,200)";
        ctx.fill();
      }

      update(){
        if(this.vx === 0 || this.vy === 0){
          this.vx = Tools.randomInterval(-speed,speed);
          this.vy = Tools.randomInterval(-speed,speed);
        }
        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0 || this.x > canvas.value.width){
          this.vx *= -1;
        }

        if(this.y < 0 || this.y > canvas.value.height){
          this.vy *= -1;
        }
      }
    }

    class Graph{
      constructor(pointNumber=50,mixDis = 300){
        this.points = new Array(pointNumber).fill(0).map(()=>new Point());
        this.maxDis = mixDis;
      }

      draw(){
        // 清除canvas
        ctx.fillStyle = "#191919";
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
        for(let i=0 ;i<this.points.length;i++){
          const p1 = this.points[i];
          p1.update();
          p1.draw();
          for(let j = i+1;j<this.points.length;j++){
            const p2 = this.points[j];
            const d = Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2);
            if(d>this.maxDis) continue;
            ctx.beginPath();
            ctx.moveTo(p1.x,p1.y);
            ctx.lineTo(p2.x,p2.y);
            ctx.strokeStyle = `rgba(200,200,200,${1-d/this.maxDis})`;
            ctx.stroke();
          }
        }
        requestAnimationFrame(()=>this.draw());
      }
    }
    // 设置背景颜色
    ctx.fillStyle = "#191919";
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

    const g = new Graph();
    g.draw();
  }
};

onMounted(() => {
  init();
  window.addEventListener('resize',init);
});
//组件销毁时移除resize监听
onBeforeUnmount(()=>{
  window.removeEventListener('resize',init);
})

</script>

<style lang="scss" scoped>
canvas {
  display: block;
}
</style>
