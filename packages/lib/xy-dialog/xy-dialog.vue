<template>
  <dialog ref="xyDialog" class="xy-dialog" :style="dialogStyle">
    <div
      class="xy-dialog-content"
      :style="{minWidth:`${width}px`,width:`${width}px`,minHeight:`${height}px`}"
      ref="dialogContent"
    >
      <div
        class="dialog-header"
        :style="drag?{cursor:'move'}:{}"
        @mousedown.stop.prevent="onHoleMouseDown"
      >
        <div>{{title}}</div>
        <i class="iconfont icon-quxiao" @click="closeDialog"></i>
      </div>
      <div class="dialog-content"><slot></slot></div>
      <div class="dialog-bottom">
        <template v-if="defaultBottom">
          <xy-button @click="cancel">取消</xy-button>
          <xy-button type="primary" @click="confirm" style="margin-left: 10px">确定</xy-button>
        </template>
        <template v-else>
          <slot name="footer"></slot>
        </template>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts">
import {defineComponent, ref,watch,onMounted,PropType} from 'vue'
import xyButton from "../xy-button/xy-button.vue";
export default defineComponent({
  name: "xy-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: "500"
    },
    height: {
      type: Number,
      default: "122"
    },
    title: {
      type: String,
      default: "提示"
    },//是否显示默认底部按钮
    defaultBottom: {
      type: Boolean,
      default: false
    },//点击确定执行的回调函数,需要有一个返回值,返回值为true时关闭弹窗
    confirmCallback: {
      type: Function as PropType<()=>boolean>,
    },//点击外部关闭弹窗
    clickOnExternalClose: {
      type: Boolean,
      default: false
    },//esc关闭
    escClose: {
      type: Boolean,
      default: true
    },//拖动
    drag: {
      type: Boolean,
      default: false
    },//拖动范围限制
    dragRange: {
      type: Boolean,
      default: true
    },//dialog样式
    dialogStyle: {
      type: CSSStyleValue,
      default: ()=>({})
    }
  },
  emits: ['update:visible','handleClose'],
  components: {
    xyButton
  },
  setup(props, context) {
    const xyDialog = ref<HTMLElement|null>(null);
    const dialogContent = ref<HTMLElement|null>(null);
    const dialogX = ref(0);
    const dialogEndX = ref(0);
    const dialogY = ref(0);
    const dialogEndY = ref(0);
    let startX = 0;
    let startY = 0;
    let startTop = 0;
    let startLeft = 0;
    let halfWidth = 0;
    let halfHeight = 0;
    let dragging = false;
    const rectDialog = ref({})
    const rectContent = ref({})
    const dragAndDropNoHappen = ref(true);
    const disableScrolling=()=> {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollTop}px`;
      document.body.style.left = `-${scrollLeft}px`;
    }

    const enableScrolling=()=> {
      const scrollTop = -parseInt(document.body.style.top || '0', 10);
      const scrollLeft = -parseInt(document.body.style.left || '0', 10);


      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';

      window.scrollTo(scrollLeft, scrollTop);
    }

    watch(()=>props.visible,(val)=>{
      if(val){
        disableScrolling()
        show()
      }else{
        close()
        enableScrolling()
      }
    })
    const show = () => {
      if(xyDialog.value){
        xyDialog.value.showModal();

        const rect = xyDialog.value.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        dialogX.value = x;
        dialogEndX.value = x + rect.width;
        dialogY.value = y;
        dialogEndY.value = y + rect.height;

        setTimeout(()=>{
          window.addEventListener('click',mouseClick);
          window.addEventListener('keydown',monitorKeyboardPresses);
        },100)
      }
    }
    const close = () => {
      if(xyDialog.value){
        xyDialog.value.close();
        window.removeEventListener('click',mouseClick);
        window.removeEventListener('keydown',monitorKeyboardPresses);
        // console.log(top,left)
        console.log(props.drag)
        console.log(dragAndDropNoHappen.value)
        if(!props.drag || dragAndDropNoHappen.value)return;
        dialogContent.value.style.top = `${startTop+halfHeight}px`;
        dialogContent.value.style.left = `${startLeft+halfWidth}px`;
      }
    }
    const closeDialog = () => {
      context.emit('update:visible',false);
      //handleClose 点击flag0:右上角关闭/外部 -1:取消 1:确定
      context.emit('handleClose',false,-1);
    }
    const cancel = () => {
      context.emit('update:visible',false)
      context.emit('handleClose',false,0)
    }
    const confirm = async() => {
      if(props.confirmCallback){
        const res = await props.confirmCallback();
        if(res){
          context.emit('update:visible',false);
          context.emit('handleClose',false,1);
        }
      }else{
        context.emit('update:visible',false);
        context.emit('handleClose',false,1);
      }
    }
    const mouseClick = (e)=>{
      if(e.x < dialogX.value || e.x > dialogEndX.value || e.y < dialogY.value || e.y > dialogEndY.value){
        if(!props.clickOnExternalClose) return;
        context.emit('update:visible',false);
        context.emit('handleClose',false,-1);
      }
    }
    const monitorKeyboardPresses = (e)=>{
      if(e.key === "Escape"){
        e.preventDefault();
      }
      if(!props.escClose)return;
      if(e.key === "Escape"){
        context.emit('update:visible',false);
        context.emit('handleClose',false,-1);
      }
    }

    const onHoleMouseDown = (e: MouseEvent) => {
      if(!props.drag)return;
      rectDialog.value = xyDialog.value.getBoundingClientRect();
      rectContent.value = dialogContent.value.getBoundingClientRect();
      halfWidth = rectContent.value.width / 2;
      halfHeight = rectContent.value.height / 2;

      startX = e.clientX;
      startY = e.clientY;
      startTop = rectContent.value.top;
      startLeft = rectContent.value.left;


      dragging = true;
      document.addEventListener('mousemove', onHoleMouseMove);
      document.addEventListener('mouseup', onHoleMouseUp);
    };

    const onHoleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      dragAndDropNoHappen.value = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let top = startTop + dy + halfHeight;
      let left = startLeft + dx + halfWidth;
      if(props.dragRange){
        top = Math.min(Math.max(top,halfHeight),window.innerHeight-rectContent.value.height+halfHeight);
        left = Math.min(Math.max(left,halfWidth),window.innerWidth-rectContent.value.width+halfWidth);
      }

      // console.log(top,left)
      dialogContent.value.style.top = `${top}px`;
      dialogContent.value.style.left = `${left}px`;

    };

    const onHoleMouseUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onHoleMouseMove);
      document.removeEventListener('mouseup', onHoleMouseUp);
    };
    onMounted(()=>{


    })
    return {
      xyDialog,
      closeDialog,
      cancel,
      confirm,
      onHoleMouseDown,
      dialogContent
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";
$upAndDownHeight: 40px;
@include scrollbar();
.xy-dialog{
  width: 100vw;
  max-width:100vw ;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(184, 184, 184, 0.5);
  border: none;
  outline: none; /* 去除可能存在的焦点轮廓线 */
  position: relative;
  &::backdrop {
    background-color: transparent;
  }
  .xy-dialog-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    background-color: #fff;
    padding: 10px;
    .dialog-header{
      height: $upAndDownHeight;
      padding: 0 10px;
      @include display-flex(center,space-between);
      i{
        &:hover{
          cursor: pointer;
        }
      }
    }
    .dialog-content{
      height: calc(100% - 2*$upAndDownHeight);
      overflow: auto;
      padding: 10px;
    }
    .dialog-bottom{
      padding: 10px;
      height: $upAndDownHeight;
      @include display-flex(center,end);
    }
  }
}
</style>