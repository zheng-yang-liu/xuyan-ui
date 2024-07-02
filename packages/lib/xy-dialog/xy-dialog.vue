<template>
  <dialog ref="xyDialog">
    <div class="xy-dialog" :style="{minWidth:`${width}px`,width:`${width}px`,minHeight:`${height}px`}">
      <div class="dialog-header">
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
    },
  },
  emits: ['update:visible','handleClose'],
  components: {
    xyButton
  },
  setup(props, context) {
    const xyDialog = ref<HTMLElement|null>(null);
    const dialogX = ref(0);
    const dialogEndX = ref(0);
    const dialogY = ref(0);
    const dialogEndY = ref(0);

    watch(()=>props.visible,(val)=>{
      if(val){
        show();
      }else{
        close();
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
    const confirm = () => {
      console.log(props.confirmCallback)
      if(props.confirmCallback){
        const res = props.confirmCallback();
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
      console.log(e.x,e.y)
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
      console.log('close')
      if(e.key === "Escape"){
        context.emit('update:visible',false);
        context.emit('handleClose',false,-1);
      }
    }
    onMounted(()=>{
    })
    return {
      xyDialog,
      closeDialog,
      cancel,
      confirm
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";
$upAndDownHeight: 40px;
dialog{
  border: none;
  padding: 16px;
  position: fixed;
  outline: none; /* 去除可能存在的焦点轮廓线 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999;
  border-radius: 4px;
  .xy-dialog{
    min-width: 500px;
    min-height: 122px;
    background-color: #fff;
    border: none;
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
      height: $upAndDownHeight;
      @include display-flex(center,end);
    }
  }
}

</style>