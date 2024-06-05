<template>
  <el-dialog
    v-model="state.diaVisible"
    :title="title"
    :width="previewSizeFixed?600:800"
    align-center
    :close-on-press-escape="false"
    @closed="closeAfter"
    :close-on-click-modal="closeOnClickModal"
  >
    <div class="croppingBox">
      <input type="file" @change="onFileChange" style="display: none" ref="fileInput"/>
      <div class="cropping-left" :style="previewSizeFixed ? { width: '400px' } : {width:'400px'}">
        <div style="position:relative;overflow: hidden;width: 300px;height: 300px">
          <canvas
            ref="imgCanvas"
            :width="canvasWidth" :height="canvasHeight"
            style="width: 300px;height: 300px;position:absolute;top: 0;left: 0;border:1px black solid"
          ></canvas>
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
      <div class="cropping-right" :style="previewSizeFixed ? { width: '200px' } : {width:'400px'}">
        <div style="margin-bottom: 10px">预览</div>
        <img :src="state.previewUrl" :class="previewSizeFixed?'itSAFixedSize':''" style="border: 1px black solid" ref="previewImg"/>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="uploadFile">上传</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent,ref,reactive,watch,onMounted,computed} from 'vue'
import{base64ToFile,fileToBase64}from"../../tools"
import {initBaseImg} from "./initBaseImg"
export default defineComponent({
  name: "xy-img-cropping",
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:'图像编辑'
    },
    previewSizeFixed:{
      type:Boolean,
      default:true
    },
    uploadApi:{
      type:Function,
      default:null
    },
    uploadParamIsFile:{
      type:Boolean,
      default:true
    },
    closeOnClickModal:{
      type:Boolean,
      default:true
    }
  },
  emits:['update:visible','confirmReturn'],
  setup(props, context) {
    const state = reactive({
      showCanvas: false,
      diaVisible: false,
      previewUrl:null
    })
    const hole = reactive({
      width: 100,
      height: 100,
      top: 100,
      left: 100,
    });
    const ratio = ref(1)
    const imgCanvas = ref<HTMLCanvasElement | null>(null);
    const fileInput = ref<HTMLCanvasElement | null>(null);
    const previewImg = ref<HTMLCanvasElement | null>(null);
    const canvasWidth = ref<number>(600);
    const canvasHeight = ref<number>(600);
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
      drawPreview();
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
      if(props.previewSizeFixed) hole.width = hole.height = Math.min(hole.width, hole.height);
    };

    const onHandleMouseUp = () => {
      resizing = false;
      drawPreview();
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

    watch(()=>props.visible,(newVal)=>{
      state.diaVisible = newVal;
      if(newVal){
        hole.width = 100;
        hole.height = 100;
        hole.top = 100;
        hole.left = 100;
        setTimeout(()=>{
          drawImage(initBaseImg);
        },0)
      }
    })

    const onFileChange = (event:any)=> {
      const file = event.target.files[0];
        file&&convertToBase64(file);
    }
    const convertToBase64 = (file:File)=> {
      fileToBase64(file,(base64)=>{
        state.showCanvas = true;
        drawImage(base64);
      });
    }
    const closeAfter = ()=>{
      context.emit("update:visible",false);
    }
    const confirm = async()=>{
      // console.log('确定的逻辑')
      if(props.uploadParamIsFile){//上传的参数是文件file
        const file = base64ToFile(state.previewUrl);
        if(props.uploadApi){
          const res = await props.uploadApi(file);
          if(res.status === 200){

          }
        }
        context.emit("confirmReturn",file);
        context.emit("update:visible",false);
      }else{//上传的参数是文件base64
        if(props.uploadApi){
          const res = await props.uploadApi(state.previewUrl);
        }
        context.emit("confirmReturn",state.previewUrl);
        context.emit("update:visible",false);
      }
    }
    const uploadFile = ()=>{
        fileInput.value&&fileInput.value.click();
    }
    const drawImage = (imgUrl) => {
      if (imgCanvas.value) {
        const ctx = imgCanvas.value.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.src = imgUrl;
          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            // 计算适配 300x300 画布的比例
            const scale = Math.min(canvasWidth.value / imgWidth, canvasHeight.value / imgHeight);
            const scaledWidth = imgWidth * scale;
            const scaledHeight = imgHeight * scale;

            // 计算图片绘制位置，使图片居中
            const x = (canvasWidth.value - scaledWidth) / 2;
            const y = (canvasHeight.value - scaledHeight) / 2;

            // 清除画布
            ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

            // 绘制缩放和居中的图片
            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

            drawPreview();
          };
        }
      }
    };
    const canvas = document.createElement('canvas');
    const ctxPreview = canvas.getContext('2d');
    const drawPreview = ()=>{
      canvas.width = hole.width;
      canvas.height = hole.height;
      if (ctxPreview) {
        const Long = Math.max(hole.width, hole.height);
        ctxPreview.clearRect(0, 0, Long, Long);
        ctxPreview.drawImage(
          imgCanvas.value,
          hole.left*2,
          hole.top*2,
          hole.width*2,
          hole.height*2,
          0,
          0,
          Long,
          Long);
        state.previewUrl = canvas.toDataURL();
      }
    }
    onMounted(()=>{

    })
    return {
      state,
      onFileChange,
      closeAfter,
      confirm,
      uploadFile,
      ratio,
      imgCanvas,
      canvasWidth,
      canvasHeight,
      fileInput,
      hole,
      holeStyle,
      onHoleMouseDown,
      onHandleMouseDown,
      previewImg
    }
  },
})
</script>

<style lang="scss" scoped>
$border: 1px solid #ebeef5;
@mixin absoluteCanvas{
  position: absolute;
  top: 1px;
  left: 1px;
  width: 300px;
  height: 300px;
}
.croppingBox{
  display: flex;
  border-bottom: $border;
  border-top: $border;
  .cropping-left{
    padding: 20px;
    .hole{
      position: absolute;
      background: transparent;
      .resize-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        bottom: 0;
        right: 0;
        background-color: black;
        cursor: se-resize;
      }
    }
  }
  .cropping-right{
    text-align: center;
    //设置img样式居中撑满-不变形
    .itSAFixedSize{
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
}
</style>