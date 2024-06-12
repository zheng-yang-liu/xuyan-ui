<template>
  <li>
    <div @click="toggle(item)"
         class="xy-menuItem"
         :style="[{height:`${height}px`},mouseOverStyle]"
         @mouseover.stop.prevent="handleMouseOver"
         @mouseout.stop.prevent="handleMouseOut"
    >
      <i :class="item.icon"></i>
      <p>{{ item.title }}</p>
      <div class="imgBox">
        <img
          :class="{'rotate':isOpen}"
          src="../../assets/icon/leftTriangle.png"
          alt=""
          v-if="item.children?.length>0&&!expandAll">
      </div>
    </div>
    <transition
      name="showChild"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <ul v-if=" expandAll || (item.children && item.id === currentId && isOpen)"
          class="xy-submenu"
          :style="{paddingLeft:`${submenuIndent}px`}"
      >
        <xy-menu-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :index="index"
          :id="item.id"
          :height="height"
          :submenuIndent="submenuIndent"
          :mouseOverColor="mouseOverColor"
          :expandAll="expandAll"
        />
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType ,computed} from 'vue';
import { MenuItem as MenuItemType } from './xy-menu.type';

import {useRouter} from "vue-router";
export default defineComponent({
  name: 'xy-menu-item',
  components: {
    xyMenuItem: () => import('./xy-menu-item.vue')
  },
  props: {
    item: {
      type: Object as PropType<MenuItemType>,
      required: true
    },
    index: {
      type: Number,
    },
    id:{
      type:String
    },
    height:{
      type:Number,
      default:40
    },//子菜单缩进量
    submenuIndent:{
      type:Number,
      default:0
    },
    mouseOverColor:{
      type:String,
      default:'#abcaec'
    },
    expandAll:{
      type:Boolean,
      default:false
    }
  },
  emits: [],
  setup(props, context) {

    const router = useRouter();
    const isOpen = ref<boolean>(false);
    const currentId = ref<string>('')
    const toggle = (item: MenuItemType) => {
      console.log(item)
      isOpen.value = !isOpen.value;
      currentId.value = item.id;
      console.log('currentId',currentId.value)
      if(item.children?.length>0) return;
      // if (item.path) router.push(item.path);
    };

    const beforeEnter = (el: HTMLElement) => {
      el.style.height = '0';
    };

    const enter = (el: HTMLElement) => {
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', () => {
        el.style.height = 'auto';
      }, { once: true });
    };

    const leave = (el: HTMLElement) => {
      el.style.height = `${el.scrollHeight}px`;
      setTimeout(() => {
        el.style.height = '0';
      });
    };
    const currentMenu = ref<object>({
      backgroundColor: 'red'
    })
    const mouseOverStyle = ref<object>({})
    const handleMouseOver = () => {
      mouseOverStyle.value = {
        backgroundColor:props.mouseOverColor
      }
    }
    const handleMouseOut = () => {
      mouseOverStyle.value = {}
    }
    return {
      toggle,
      beforeEnter,
      enter,
      leave,
      currentMenu,
      mouseOverStyle,
      handleMouseOver,
      handleMouseOut,
      currentId,
      isOpen

    };
  }
});
</script>

<style scoped lang="scss">
.xy-menuItem {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding:0 10px;
  position: relative;
  .imgBox{
    position: absolute;
    right: 10px;
  }
  img {
    float: right;
    width: 10px;
    height: 10px;
    transition: transform 0.5s;
  }
  p{
    width: 80%;
    padding-left: 2px;
    //一行显示不下的文字显示省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.rotate {
  transform: rotate(90deg);
}

.xy-submenu {
  list-style-type: none;
  overflow: hidden;
  transition: height 0.5s ease;
}

.showChild-enter-active,
.showChild-leave-active {
  transition: height 0.5s ease;
}
</style>
