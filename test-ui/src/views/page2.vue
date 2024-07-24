<template>
  <div id="page2" class="page2">
    <div id="page2_sticky" class="page2_sticky">
      <video id="page2_video"
             class="page2_video"
             src="@/assets/video/vivo.webm"></video>
      <div id="page2_text"
           class="page2_text">
        <p class="p1">IP68 级防尘抗水</p>
        <p>实力抗水，不放水</p>
        <p class="p3">出色的防尘抗水能力,从容应对更多生活挑战。</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {AnimationUtils} from "yanyan-ui"

console.log(AnimationUtils, 'AnimationUtils')

const elementId = ['page2', 'page2_sticky', 'page2_video', 'page2_text'];

//当前页面的id和根元素id
const currentPlatingElement = {
  currentID: 'page2',
  rootId: 'app',
}

//动画配置列表  -- 均匀变化
let animationList = [
  {
    element: {elType: 'video', el: 'page2_video'},
    config: {},
  },
  {
    element: {elType: 'page2_text', el: 'page2_text'},
    config: {},
  }
]
//动画配置列表  -- 临界点变化
const animationCriticalList = [
  {
    elementID: 'page2_text',
    config: {
      critical: 80,
      exceed: [],
      noExceed: [{styleName: 'opacity', value: 0}]
    }
  }
]
//动画帧配置列表
const framesConfig = {
  page2_video: {
    currentTime: {
      start: 0,
      end: 5,
    }
  },
  page2_text: {
    opacity: {
      start: 0,
      end: 1,
    },
    marginTop: {
      start: 20,
      end: 0,
      ifNumber: false
    }
  }
}
//动画帧生效的范围
const animationRange = {
  page2_video: {
    start: 0,
    end: 80
  },
  page2_text: {
    start: 80,
    end: 100
  }
}


const newAnimationList = AnimationUtils.setAnimationListConfig(animationList, framesConfig, animationRange);
console.log(newAnimationList, 'newAnimationList---page2')
onMounted(() => {
  AnimationUtils.animationObserver(
    'page2_sticky',
    elementId,
    currentPlatingElement,
    newAnimationList,
    animationCriticalList
  );
})

</script>

<style scoped lang="scss">
  .page2{
    width:100%;
    height:600vh;
    .page2_sticky{
      width:100%;
      height:100vh;
      position:sticky;
      top:0;
      .page2_video{
        width:100%;
        height:100vh;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        object-fit: cover;
      }
      .page2_text{
        position: absolute;
        color: white;
        top:50%;
        left: 25%;
        transform: translate(-50%,-25%);
        margin-top: -20%;
        opacity: 0;
        font-size: 45px;
        font-family: 黑体：,serif;
        .p1{
          margin-bottom: 0.75rem;
          font-size: 24px;
        }
        .p3{
          font-size: 15px;
          color:#c6c6c6;
          margin-top: 0.75rem;
          padding-top: 0.375rem
        }
      }
    }
  }
</style>
