<template>
  <div class="xyClassicPage">
    <header class="xy-header" :style="headerStyle">
      <slot name="header"></slot>
    </header>
    <section class="xy-section" :style="sectionStyle">
      <aside class="xy-aside" :style="asideStyle">
        <slot name="aside"></slot>
      </aside>
      <main class="xy-main" :style="mainStyle">
        <slot name="main"></slot>
      </main>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,computed} from 'vue'
import {direction} from './xy-classic-page.type'
export default defineComponent({
  name: "xy-classic-page",
  props:{
    direction:{
      type: String as () => direction,
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
  },
  setup(props, content){
    const sectionHeight = computed(()=>{
      return props.direction === 'horizontal' ? `calc(100vh - ${props.headerHeight}px)` : ''
    })
    const headerStyle = computed(()=>({
        height: props.headerHeight? `${props.headerHeight}px` : '50px'
    }))
    const asideStyle = computed(()=>({
        width: props.direction === 'horizontal' ? `${props.asideWidth}px` : '100%',
        height: sectionHeight.value,
    }))
    const mainStyle = computed(()=>({
        width: props.direction === 'horizontal' ? `calc(100% - ${props.asideWidth}px)` : '100%',
        height: sectionHeight.value,
    }))
    const sectionStyle = computed(()=>({
        display: props.direction === 'horizontal' ? 'flex' : 'block'
    }))
    onMounted(()=>{

    })
    return{
      asideStyle,
      mainStyle,
      sectionStyle,
      headerStyle
    }
  }
})
</script>
