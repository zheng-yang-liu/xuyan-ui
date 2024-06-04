<template>
  <img ref="baseImg" src="../../assets/defaultPicture.png" alt="Placeholder Image" style="display: none"/>
  <el-dialog
    v-model="state.diaVisible"
    :title="title"
    width="600"
    align-center
    :close-on-press-escape="false"
    @close="closeAfter"
  >
    <div class="croppingBox">
      <input type="file" @change="onFileChange" style="display: none" ref="fileInput"/>
      <div class="cropping-left">
        <div class="cropping-left-relative">
          <canvas
            ref="imgCanvas"
            :width="canvasWidth" :height="canvasHeight"
            style="width: 300px;height: 300px;border:1px black solid"
            class="canvas"
          ></canvas>
          <div class="mask"></div>
<!--          <img :src="state.croppedImageUrl" class="croppedImage" ref="croppedImage">-->
        </div>

      </div>
      <div class="cropping-right">
        <div>预览</div>
        <img :src="state.previewUrl">
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
import {defineComponent,ref,reactive,watch,onMounted} from 'vue'
export default defineComponent({
  name: "xy-img-cropping",
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:'图片裁剪'
    }
  },
  emits:['update:visible'],
  setup(props, context) {
    const state = reactive({
      showCanvas: false,
      diaVisible: false,
      previewUrl:null
    })
    const ratio = ref(1)
    const baseImg = ref<HTMLElement | null>(null)
    const imgCanvas = ref<HTMLCanvasElement | null>(null);
    const fileInput = ref<HTMLCanvasElement | null>(null);
    const canvasWidth = ref<number>(600);
    const canvasHeight = ref<number>(600);

    watch(()=>props.visible,(newVal)=>{
      state.diaVisible = newVal;
      if (baseImg.value&&newVal){
        setTimeout(()=>{
          drawImage(baseImg.value.src);
        },0)
      }
    })
    const onFileChange = (event:any)=> {
      const file = event.target.files[0];
        file&&convertToBase64(file);
    }
    const convertToBase64 = (file:File)=> {
      const reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e)
        state.showCanvas = true;
        drawImage(e.target.result)

      };
      reader.readAsDataURL(file);
    }
    const closeAfter = ()=>{
      context.emit("update:visible",false);
    }
    const confirm = ()=>{
      // console.log('确定的逻辑')
      context.emit("update:visible",false);
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
            const imgMinLong = Math.min(scaledWidth, scaledHeight);
            console.log(scaledWidth,scaledHeight,imgMinLong)
            // 计算图片绘制位置，使图片居中
            const x = (canvasWidth.value - scaledWidth) / 2;
            const y = (canvasHeight.value - scaledHeight) / 2;
            console.log(x,y)
            // 清除画布
            ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

            // 绘制缩放和居中的图片
            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
            //绘制蒙层
            // state.croppedImageUrl = imgCanvas.value.toDataURL();
          };
        }
      }
    };
    const drawAMaskLayer = (imgInfo:object)=>{

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
      baseImg,
      imgCanvas,
      canvasWidth,
      canvasHeight,
      fileInput


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
    position: relative;
    padding: 20px;
    width: 400px;
    .cropping-left-relative{
      position: relative;
      width: 300px;
      height: 300px;
      .canvas{
        @include absoluteCanvas;
      }
      .mask{
        @include absoluteCanvas;
        background-color: rgba(0,0,0,0.5);
      }
      .croppedImage{
        @include absoluteCanvas;
        }
    }
  }
  .cropping-right{
    width: 33%;
    text-align: center;
    img{
      margin-top: 10px;
      width: 100px;
      height: 100px;
    }
  }
}
</style>