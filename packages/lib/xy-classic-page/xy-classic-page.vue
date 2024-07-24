<template>
  <div class="xyClassicPage">
    <header class="xy-header" :style="getHeaderStyle">
      <slot name="header"></slot>
    </header>
    <section class="xy-section" :style="getSectionStyle">
      <aside class="xy-aside" :style="getAsideStyle">
        <slot name="aside"></slot>
      </aside>
      <main class="xy-main" :style="getMainStyle">
        <slot name="main"></slot>
      </main>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,computed} from 'vue'
import {directionType} from './xy-classic-page.type'
export default defineComponent({
  name: "xy-classic-page",
  props:{
    direction:{
      type: String as () => directionType,
      default: 'horizontal'
    },
    asideWidth:{
      type: Number,
      default: 200
    },
    headerHeight:{
      type: Number,
      default: 50
    },
    headerStyle:{
      type: CSSStyleValue,
      default:()=>({})
    },
    sectionStyle:{
      type: CSSStyleValue,
      default:()=>({})
    },
    asideStyle:{
      type: CSSStyleValue,
      default:()=>({})
    },
    mainStyle:{
      type: CSSStyleValue,
      default:()=>({})
    },
  },
  setup(props, content){
    const sectionHeight = computed(()=>{
      return props.direction === 'horizontal' ? `calc(100vh - ${props.headerHeight}px)` : ''
    })
    const getHeaderStyle = computed(()=>({
        height: props.headerHeight? `${props.headerHeight}px` : '50px',
        ...props.headerStyle
    }))
    const getAsideStyle = computed(()=>({
        width: props.direction === 'horizontal' ? `${props.asideWidth}px` : '100%',
        height: sectionHeight.value,
        ...props.asideStyle
    }))
    const getMainStyle = computed(()=>({
        width: props.direction === 'horizontal' ? `calc(100% - ${props.asideWidth}px)` : '100%',
        height: sectionHeight.value,
        ...props.mainStyle
    }))
    const getSectionStyle = computed(()=>({
        display: props.direction === 'horizontal' ? 'flex' : 'block',
        ...props.sectionStyle
    }))
    return{
      getAsideStyle,
      getMainStyle,
      getSectionStyle,
      getHeaderStyle
    }
  }
})
</script>
