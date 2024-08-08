<template>
  <xy-dialog
    :title="title"
    :esc-close="false"
    v-model:visible="state.diaVisible"
    :width="previewSizeFixed ? 600 : 800"
    :clickOnExternalClose="clickOnExternalClose"
    @handleClose="closeAfter"
  >
    <div class="croppingBox">
      <input type="file" @change="onFileChange" style="display: none" ref="fileInput" />
      <div class="cropping-left" :style="{ width: '400px' }">
        <div class="canvas-container" @wheel.stop.prevent="sizeWheel">
          <canvas
            ref="imgCanvas"
            :width="canvasWidth"
            :height="canvasHeight"
            class="cropping-canvas"
            @mousedown.stop.prevent="onHoleMouseDownCanvas"
          ></canvas>
          <div
            class="hole"
            :style="holeStyle"
            @mousedown.stop.prevent="onHoleMouseDown"
          >
            <p class="selectBoxSize" v-show="!previewSizeFixed&&showSizePrompt" ref="selectBoxSize">
              {{hole.width}}*{{hole.height}}
            </p>
            <div class="resize-handle" @mousedown.stop.prevent="onHandleMouseDown"></div>
          </div>
        </div>
      </div>
      <div class="cropping-right" :style="previewSizeFixed ? { width: '200px' } : { width: '400px' }">
        <div style="margin-bottom: 10px">预览</div>
        <img
          ALT="预览图像"
          :src="state.previewUrl"
          @mousedown.stop.prevent
          class="preview-img" ref="previewImg"
          :class="previewSizeFixed ? 'itSAFixedSize' : ''"
        />
        <p v-if="!previewSizeFixed">{{previewSize.width}}*{{previewSize.height}}</p>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="uploadFile">上传</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </xy-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue';
import { base64ToFile, fileToBase64 ,showMsg} from "../../Utils/Tools";
import { initBaseImg } from "./initBaseImg";
import xyDialog from "../xy-dialog/xy-dialog.vue"

export default defineComponent({
  name: "xy-img-cropping",
  props:{//是否显示弹框
    visible:{
      type:Boolean,
      default:false
    },//弹框标题
    title:{
      type:String,
      default:'图像裁剪'
    },//预览窗口是否固定大小
    previewSizeFixed:{
      type:Boolean,
      default:false
    },//上传的数据是否为file对象
    uploadParamIsFile:{
      type:Boolean,
      default:true
    },//点击外部关闭弹框
    clickOnExternalClose:{
      type:Boolean,
      default:false
    },//文件大小MB
    fileSize:{
      type:Number,
      default:4
    },//是否立即关闭
    immediateClose:{
      type:Boolean,
      default:false
    }
  },
  emits:['update:visible','confirmReturn'],
  components:{
    xyDialog
  },
  setup(props, context) {
    const state = reactive({
      diaVisible: false,
      previewUrl: null,
      currentBase64: initBaseImg,
    });

    const hole = reactive({
      width: 100,
      height: 100,
      top: 100,
      left: 100,
    });

    const previewSize = ref<object>({
      width: 100,
      height: 100,
    })
    const imgCanvas = ref<HTMLCanvasElement | null>(null);
    const fileInput = ref<HTMLInputElement | null>(null);
    const selectBoxSize = ref<HTMLInputElement | null>(null);
    const canvasWidth = ref<number>(600);
    const canvasHeight = ref<number>(600);
    const fileName = ref<string>('');
    const showSizePrompt = ref<boolean>(false);
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startTop = 0;
    let startLeft = 0;
    let resizing = false;
    let dragging = false;
    let canvasMove = false;

    let canvasMoveX = 0; // 添加变量用于存储canvas移动的当前位置
    let canvasMoveY = 0;

    const holeStyle:any= computed(() => ({
      width: `${hole.width}px`,
      height: `${hole.height}px`,
      top: `${hole.top}px`,
      left: `${hole.left}px`,
      position: 'absolute',
      background: 'transparent',
      boxShadow: `0 0 0 300px rgba(0, 0, 0, 0.5), inset 0 0 0 2px transparent`,
    }));

    const wheelScale = ref<number>(1);
    const overlayWidth = 300;
    const overlayHeight = 300;

    watch(() => props.visible, (newVal) => {
      state.diaVisible = newVal;
      if (newVal) {
        resetHole();
        wheelScale.value = 1;
        canvasMoveX = 0; // 初始化canvas移动的当前位置
        canvasMoveY = 0;
        state.currentBase64 = initBaseImg;
        setTimeout(() => {
          drawImage(initBaseImg);
        }, 0);
      }
    });
    watch(()=>state.diaVisible,(newVal)=>{
      context.emit("update:visible", newVal);
    })

    const resetHole = () => {
      hole.width = 100;
      hole.height = 100;
      hole.top = 100;
      hole.left = 100;
    };

    const onFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      const size = file.size / 1024 / 1024;
      //判断文件是否为图片
      if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg'){
        showMsg('error','请上传图片文件');
        return;
      }
      if(size>props.fileSize){
        showMsg('error',`文件大小不能超过${props.fileSize}MB`);
        return;
      }
      fileName.value = file.name;
      if (file) fileToBase64(file, (base64:string) => {
        state.currentBase64 = base64;
        wheelScale.value = 1;
        canvasMoveX = 0;
        canvasMoveY = 0;
        drawImage(base64);
      });
    };

    const closeAfter = () => {
      // context.emit("update:visible", false);
    };

    const confirm = async () => {
      const file = base64ToFile(state.previewUrl, fileName.value);
      if(props.uploadParamIsFile){
        context.emit("confirmReturn", file);
        if(!props.immediateClose)return;
        context.emit("update:visible", false);
      }else{
        context.emit("confirmReturn", state.previewUrl);
        if(!props.immediateClose)return;
        context.emit("update:visible", false);
      }
    };

    const uploadFile = () => {
      fileInput.value?.click();
    };

    const drawImage = (imgUrl: string) => {
      const ctx = imgCanvas.value?.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;
          const scale = Math.min(canvasWidth.value / imgWidth, canvasHeight.value / imgHeight);
          const scaledWidth = imgWidth * scale;
          const scaledHeight = imgHeight * scale;
          const x = (canvasWidth.value - scaledWidth) / 2 + canvasMoveX; // 使用canvasMoveX
          const y = (canvasHeight.value - scaledHeight) / 2 + canvasMoveY; // 使用canvasMoveY
          ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
          ctx.save();
          ctx.translate(300 + canvasMoveX, 300 + canvasMoveY); // 使用canvasMoveX和canvasMoveY
          ctx.scale(wheelScale.value, wheelScale.value);
          ctx.translate(-(300 + canvasMoveX), -(300 + canvasMoveY)); // 使用canvasMoveX和canvasMoveY
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
          ctx.restore();
          drawPreview();
        };
      }
    };

    const drawPreview = () => {
      const canvas = document.createElement('canvas');
      const ctxPreview = canvas.getContext('2d');
      if (ctxPreview) {
        canvas.width = hole.width;
        canvas.height = hole.height;
        ctxPreview.clearRect(0, 0, hole.width, hole.height);
        ctxPreview.drawImage(
          imgCanvas.value,
          hole.left * 2,
          hole.top * 2,
          hole.width * 2,
          hole.height * 2,
          0,
          0,
          hole.width,
          hole.height
        );
        state.previewUrl = canvas.toDataURL();
      }
    };

    const sizeWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY) * -0.1;
      wheelScale.value += delta;
      wheelScale.value = Math.max(0.1, Math.min(5, wheelScale.value));
      drawImage(state.currentBase64);
    };

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
      if(hole.top<=24){
        if(selectBoxSize.value){
          selectBoxSize.value.style.top = '0px';
        }
      }else{
        if(selectBoxSize.value){
          selectBoxSize.value.style.top = '-20px';
        }
      }
    };

    const onHoleMouseUp = () => {
      dragging = false;
      drawPreview();
      document.removeEventListener('mousemove', onHoleMouseMove);
      document.removeEventListener('mouseup', onHoleMouseUp);
    };

    const onHandleMouseDown = (e: MouseEvent) => {
      showSizePrompt.value = true;
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
      if (props.previewSizeFixed) hole.width = hole.height = Math.min(hole.width, hole.height);
    };

    const onHandleMouseUp = () => {
      resizing = false;
      showSizePrompt.value = false;
      previewSize.value.width = hole.width;
      previewSize.value.height = hole.height;
      drawPreview();
      document.removeEventListener('mousemove', onHandleMouseMove);
      document.removeEventListener('mouseup', onHandleMouseUp);
    };

    const onHoleMouseDownCanvas = (event: MouseEvent) => {
      canvasMove = true;
      startX = event.clientX; // 初始化起始位置为鼠标按下位置
      startY = event.clientY;
      document.addEventListener('mousemove', onHoleMouseMoveCanvas);
      document.addEventListener('mouseup', onHoleMouseUpCanvas);
    };

    const onHoleMouseMoveCanvas = (e: MouseEvent) => {
      if (!canvasMove) return;
      const dx = e.clientX - startX; // 计算移动距离
      const dy = e.clientY - startY;
      canvasMoveX += dx; // 更新canvas移动的当前位置
      canvasMoveY += dy;
      startX = e.clientX; // 更新起始位置为当前鼠标位置
      startY = e.clientY;
      drawImage(state.currentBase64);
    };

    const onHoleMouseUpCanvas = () => {
      canvasMove = false;
      drawPreview();
      document.removeEventListener('mousemove', onHoleMouseMoveCanvas);
      document.removeEventListener('mouseup', onHoleMouseUpCanvas);
    };

    return {
      state,
      hole,
      holeStyle,
      imgCanvas,
      canvasWidth,
      canvasHeight,
      fileInput,
      wheelScale,
      onFileChange,
      closeAfter,
      confirm,
      uploadFile,
      onHoleMouseDown,
      onHandleMouseDown,
      onHoleMouseDownCanvas,
      sizeWheel,
      previewSize,
      selectBoxSize,
      showSizePrompt

    };
  },
});
</script>

<style lang="scss" scoped>
$border: 1px solid #ebeef5;

.croppingBox {
  display: flex;
  border-bottom: $border;
  border-top: $border;

  .cropping-left {
    padding: 20px;
    .canvas-container {
      position: relative;
      overflow: hidden;
      width: 300px;
      height: 300px;
    }
    .cropping-canvas {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px black solid;
      cursor: move;
    }
    .hole {
      position: absolute;
      background: transparent;
      cursor: move;
      .selectBoxSize{
        position: absolute;
        top: -20px;
        left: 0;
        color: #ffca1e;
        padding: 2px;
        font-size: 10px;
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
    }
  }

  .cropping-right {
    text-align: center;
    .itSAFixedSize {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .preview-img {
      border: 1px black solid;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>