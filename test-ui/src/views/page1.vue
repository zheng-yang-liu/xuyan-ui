<template>
  <div id="page1" class="page1">
    <div id="page1_sticky" class="page1_sticky">
      <video id="page1_video"
             class="page1_video"
             src="@/assets/video/vivo.webm"></video>
      <div id="page1_text"
           class="page1_text">
        <p class="p1">IP68 级防尘抗水</p>
        <p>实力抗水，不放水</p>
        <p class="p3">出色的防尘抗水能力,从容应对更多生活挑战。</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {AnimationUtils} from "../../../packages"

const elementId = ['page1', 'page1_sticky', 'page1_video', 'page1_text'];

//当前页面的id和根元素id
const currentPlatingElement = {
  currentID: 'page1',
  rootId: 'app',
}

//动画配置列表  -- 均匀变化
let animationList = [
  {
    element: {elType: 'video', el: 'page1_video'},
    config: {},
  },
  {
    element: {elType: 'page1_text', el: 'page1_text'},
    config: {},
  }
]
//动画配置列表  -- 临界点变化
const animationCriticalList = [
  {
    elementID: 'page1_text',
    config: {
      critical: 80,
      exceed: [],
      noExceed: [{styleName: 'opacity', value: 0}]
    }
  }
]
//动画帧配置列表
const framesConfig = {
  page1_video: {
    currentTime: {
      start: 0,
      end: 5,
    }
  },
  page1_text: {
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
  page1_video: {
    start: 0,
    end: 80
  },
  page1_text: {
    start: 80,
    end: 100
  }
}

const newAnimationList = AnimationUtils.setAnimationListConfig(animationList, framesConfig, animationRange);
console.log(newAnimationList, 'newAnimationList---page1')
onMounted(() => {
  AnimationUtils.animationObserver(
    'page1_sticky',
    elementId,
    currentPlatingElement,
    newAnimationList,
    animationCriticalList
  );
})

</script>

<style scoped lang="scss">
  .page1{
    width:100%;
    height:600vh;
    .page1_sticky{
      width:100%;
      height:100vh;
      position:sticky;
      top:0;
      .page1_video{
        width:100%;
        height:100vh;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        object-fit: cover;
      }
      .page1_text{
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
