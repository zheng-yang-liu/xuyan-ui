<template>
  <div
    class="xy-input" 
    :style="cssValue" 
    :class="{'disabledInput':disabled}"
    @click="getFocus"
  >
    <div
      class="prepend"
      v-if="showPrepend"
      ref="prepend"
      :style="prependStyle"
      @mousedown.prevent="prependDown"
    ><slot name="prepend"></slot></div>
    <div
      class="textareaBox"
      v-if="textarea">
      <textarea
        id="textareaInner"
        ref="textareaInner"
        v-model="inputValue"
        class="xy-input-textarea-inner"
        @focus="onFocus"
        @focusout="onFocusOut"
        @input="onInput"
      ></textarea>
      <p
        class="textareaLimit"
        v-if="minLength?minLength:maxLength?maxLength:false"
        ref="limit"
      >{{modelValue.length}}/{{ minLength?minLength:maxLength?maxLength:'' }}</p>
    </div>
    <div
      ref="inputBox"
      class="xy-input-box"
      @mouseover.stop.prevent="onMouseOver"
      @mouseleave.stop.prevent="onMouseLeave"
      v-else
    >
      <span class="icon" v-if="showBeforeIcon" @mousedown.prevent="beforeIconDown">
        <i :class="`iconfont icon-${beforeIconName}`" ></i>
      </span>
      <input
        :type="inputType"
        class="xy-input-inner"
        @mousedown="onMouseDown"
        @focus="onFocus"
        @focusout="onFocusOut"
        ref="inputInner"
        v-model="inputValue"
        :placeholder="placeholder"
      >
      <p
        class="limit"
        v-if="minLength?minLength:maxLength?maxLength:false"
        ref="limit"
      >{{modelValue.length}}/{{ minLength?minLength:maxLength?maxLength:'' }}</p>
      <span class="icon" v-if="showAfterIcon" @mousedown.prevent="afterIconDown">
        <i :class="`iconfont icon-${afterIconName}`" ></i>
      </span>
    </div>
    <div
      class="append"
      v-if="showAppend"
      ref="append"
      :style="appendStyle"
      @mousedown.prevent="appendDown"
    ><slot name="append"></slot></div>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted ,ref ,watch} from 'vue'
import { inputSize ,textChangeSizeType} from './xy-input.types'
import xyTooltip from "../xy-tooltip/xy-tooltip.vue"
import {changeColor}from"../../Utils/Tools"

export default defineComponent({
  name: 'xy-input',
  components: {xyTooltip},
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },//尺寸
    size: {
      type: String as PropType<inputSize>,
      default: 'default'
    },//禁用
    disabled: {
      type: Boolean,
      default: false
    },//失焦颜色
    focusoutColor: {
      type: String,
      default: '#c0c4cc'
    },//聚焦颜色
    focusColor: {
      type: String,
      default: '#409eff'
    },//是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: '',
      required: true
    },//默认值
    placeholder: {
      type: String,
      default: ''
    },//前置图标
    beforeIcon: {
      type: String,
      default: ''
    },//后置图标
    afterIcon: {
      type: String,
      default: ''
    },//图标可以点击
    iconCanClick:{
      type: Boolean,
      default: true
    },//密码输入框
    password: {
      type: Boolean,
      default: false
    },//多行文本
    textarea: {
      type: Boolean,
      default: false
    },//textarea尺寸的改变方式
    textChangeSize:{
      type:String as PropType<textChangeSizeType>,
      default:'both'
    },//textarea是否自动调改高度
    autoSize:{
      type:Boolean,
      default:false
    },//前置slot样式
    prependStyle:{
      type:CSSStyleValue,
      default:()=>({})
    },//后置slot样式
    appendStyle:{
      type:CSSStyleValue,
      default:()=>({})
    },//最小输入长度
    minLength:{
      type:Number,
      default:0
    },//最大输入长度
    maxLength:{
      type:Number,
      default:0
    }
  },
  emits: [
    'update:modelValue',
    'iconDown',
    'beforeIconDown',
    'afterIconDown',
    'prependDown',
    'appendDown'
  ],
  setup(props,content) {

    const sizes = {
      large: {
        width: 240,
        height: 37,
        padding: '1px 15px'
      },
      default: {
        width: 240,
        height: 29,
        padding: '1px 11px'
      },
      small: {
        width: 240,
        height: 21,
        padding: '1px 7px'
      },
      textarea: {
        width: 240,
        height: 50,
        padding: '5px 11px'
      }
    }
    const iconList = {
      quxiao:'quxiao1',
      sousuo:'sousuo',
      xianshi:"yanjing_yincang_o",
      yincang:"yanjing_xianshi_o",
    }
    const inputInner = ref<HTMLInputElement | null>(null)
    const textareaInner = ref<HTMLTextAreaElement | any>(null)
    const prepend = ref<HTMLDivElement | null>(null)
    const append = ref<HTMLDivElement | null>(null)
    const inputBox = ref<HTMLDivElement | null>(null)
    const limit = ref<HTMLParagraphElement | null>(null)
    const inputType = ref(props.password?'password':'text')
    const beforeIconName = ref('')
    const afterIconName = ref('')
    const showBeforeIcon = ref(false)
    const showAfterIcon = ref(false)
    const inputValue = ref('')
    const showPrepend = !!content.slots['prepend']
    const showAppend = !!content.slots['append']

    const cssValue = ref({
      '--xy-input-width': '240px',
      '--xy-input-height': '32px',
      '--xy-input-padding': '1px 11px',
      '--input-border-color': '#c0c4cc',
      '--xy-input-icon-cursor': 'pointer',
      '--xy-input-textarea-resize':'both',
      '--xy-input-hover-color':'#6a6b6e'
    })

    watch(()=>inputValue.value,(newVal)=>{
      if(props.maxLength){
        if(newVal.length > props.maxLength){
          inputValue.value = newVal.slice(0,props.maxLength)
        }
      }
      if(props.minLength){
        if(newVal.length < props.minLength){
          limit.value.style.color='#e84545'
        }else{
          limit.value.style.color='#00b8a9'
        }
      }
      content.emit('update:modelValue',newVal)
      props.clearable&&(showAfterIcon.value = newVal.length > 0)
    })
    const init = () => {
      let width = props.width || sizes[props.size].width
      let height = props.height || sizes[props.size].height
      let padding = sizes[props.size].padding
      if(props.textarea){
        width = sizes.textarea.width
        height = sizes.textarea.height
        padding = sizes.textarea.padding
      }

      cssValue.value["--xy-input-width"] = `${width}px`
      cssValue.value["--xy-input-height"] = `${height}px`
      cssValue.value["--xy-input-padding"] = padding
      cssValue.value["--input-border-color"] = props.focusoutColor
      props.iconCanClick|| (cssValue.value["--xy-input-icon-cursor"] = 'text')
      cssValue.value["--xy-input-textarea-resize"] = props.textChangeSize
      try {
        cssValue.value['--xy-input-hover-color'] = changeColor(props.focusoutColor,-60)
      }catch (e){
        console.error(props.focusoutColor,'颜色值不正确')
      }

      console.log(props.focusoutColor)
      console.log(changeColor(props.focusoutColor,-50))
      if(props.minLength){
        limit.value.style.color = 'red'
      }

      props.clearable && (afterIconName.value = iconList['quxiao'])
      if(props.password){
        afterIconName.value = iconList['xianshi']
        showAfterIcon.value = true
      }

      if(props.beforeIcon){
        beforeIconName.value = props.beforeIcon
        showBeforeIcon.value = true
      }
      if(props.afterIcon){
        afterIconName.value = props.afterIcon
        showAfterIcon.value = true
      }
      if(showPrepend){
        inputBox.value.style.borderTopLeftRadius = '0'
        inputBox.value.style.borderBottomLeftRadius = '0'
      }
      if(showAppend){
        inputBox.value.style.borderTopRightRadius = '0'
        inputBox.value.style.borderBottomRightRadius = '0'
      }
    }
    const onMouseDown = (e: MouseEvent) => {
      if(props.disabled){
        e.preventDefault()
      }
    }
    const getFocus = () => {
      if(props.disabled || showAppend || showPrepend)return
      inputInner.value?.focus()
    }
    const onFocus = () => {
      cssValue.value["--input-border-color"] = props.focusColor
    }
    const onFocusOut = () => {
      cssValue.value["--input-border-color"] = props.focusoutColor

    }
    const onMouseOver = () => {
      if(props.clearable){
        showAfterIcon.value = inputValue.value.length > 0
      }
    }
    const onMouseLeave = () => {
      if(props.clearable){
        showAfterIcon.value = false
      }
    }
    const afterIconDown = () => {
      if(props.clearable){
        inputValue.value = ''
        inputInner.value?.focus()
        return
      }
      if(props.password){
        inputInner.value?.focus()
        afterIconName.value = afterIconName.value === iconList['xianshi']?iconList['yincang']:iconList['xianshi']
        inputType.value = afterIconName.value === iconList['xianshi']?'password':'text'
      }
      if (!props.iconCanClick)return
      content.emit('iconDown')
      content.emit('afterIconDown')
    }
    const beforeIconDown = () => {
      if (!props.iconCanClick)return
      content.emit('iconDown')
      content.emit('beforeIconDown')
    }
    const onInput = (e:any)=>{
      if(!props.autoSize)return
      textareaInner.value.style.overflow = 'hidden'
      const height = props.height || sizes[props.size].height
      textareaInner.value.style.height=`${height}px`
      textareaInner.value.style.height=`${e.target.scrollHeight}px`
    }
    const prependDown = () => {
      content.emit('prependDown')
    }
    const appendDown = () => {
      content.emit('appendDown')
    }

    onMounted(()=>{
      init()
    })
    return {
      onMouseDown,
      cssValue,
      onFocus,
      onFocusOut,
      inputInner,
      getFocus,
      beforeIconName,
      afterIconName,
      showBeforeIcon,
      showAfterIcon,
      afterIconDown,
      beforeIconDown,
      inputValue,
      onMouseOver,
      onMouseLeave,
      inputType,
      onInput,
      textareaInner,
      showPrepend,
      showAppend,
      prepend,
      append,
      inputBox,
      prependDown,
      appendDown,
      limit
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";
$borderRadius:4px;
@include scrollbar();
.xy-input{
  width: var(--xy-input-width);
  cursor: text;
  display:flex;
  .xy-input-box {
    padding: var(--xy-input-padding);
    border-radius: $borderRadius;
    border: 1px solid var(--input-border-color);
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .xy-input-inner {
      width: 100%;
      height: var(--xy-input-height);
      line-height: var(--xy-input-height);
      border: none;
      outline: none;
      border-radius: 4px;
      padding: 0 2px;
      @mixin placeholderStyle(){
        color: #a8abb2;
        //font-weight: 600;
        font-style: normal;
        opacity: 0.6;
        //font-size: 16px;
      }
      /* 通用占位符样式 */
      &::placeholder {
        @include placeholderStyle();
      }

      /* 兼容WebKit浏览器 */
      &::-webkit-input-placeholder {
        @include placeholderStyle();
      }

      /* 兼容Mozilla浏览器 */
      &::-moz-placeholder {
        @include placeholderStyle();
      }

      /* 兼容Microsoft Edge */
      &:-ms-input-placeholder {
        @include placeholderStyle();
      }

      /* 兼容Internet Explorer */
      &::-ms-input-placeholder {
        @include placeholderStyle();
      }
    }
    .icon{
      width: calc(var(--xy-input-height)/2);
      height: calc(var(--xy-input-height)/2);
      min-width: 20px;
      line-height: calc(var(--xy-input-height)/2);
      text-align: center;
      //background-color: green;
      cursor: var(--xy-input-icon-cursor);
    }

    .limit{
      font: {
        size: calc(var(--xy-input-height) * 2 / 5);
      };
      color: #9e9e9e;
    }
    &:hover{
      border-color: var(--xy-input-hover-color);
    }
  }
  .textareaBox{
    position:relative;
    .xy-input-textarea-inner{
      border: 1px solid var(--input-border-color);
      border-radius: 4px;
      outline: none;
      padding: var(--xy-input-padding);
      width: var(--xy-input-width);
      height: var(--xy-input-height);
      min-height: var(--xy-input-height);
      resize: var(--xy-input-textarea-resize);
      word-wrap: break-word;
      overflow-wrap: break-word;
      &:hover{
        border-color: var(--xy-input-hover-color);
      }
    }
    .textareaLimit{
      position: absolute;
      right: 10px;
      bottom:10px;
      font-size: 12px;
    }
  }
  .slot{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    border-radius: $borderRadius;
    padding: 0 20px;
    white-space: nowrap;
    max-height: calc(var(--xy-input-padding) - 2px);
    cursor: pointer;
    border-top: 1px solid #c0c4cc;
    border-bottom: 1px solid #c0c4cc;
  }
  .prepend{
    @extend .slot;
    border-top-right-radius:0;
    border-bottom-right-radius:0;
    border-left: 1px solid #c0c4cc;
  }
  .append{
    @extend .slot;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
    border-right: 1px solid #c0c4cc;
  }
}

.disabledInput {
  background-color: #f5f5f5;
  color: #c0c4cc;
  cursor: not-allowed !important;
  border-radius: $borderRadius;
  box-shadow: 0 0 0 1px #e4e7ed;
  .xy-input-box{
    .xy-input-inner{
      background-color: #f5f5f5;
      cursor: not-allowed !important;
    }
  }
 }
</style>
