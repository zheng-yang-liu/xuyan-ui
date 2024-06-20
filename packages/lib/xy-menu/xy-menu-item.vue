<template>
  <li>
    <div class="xy-menuItem"
         @click="toggle(index, item)"
         @mouseover.stop.prevent="mouseOver"
         @mouseleave.stop.prevent="mouseLeave"
         :style="[{height:`${height}px`},
           currentID===item.id?selectStyle:itemStyle,mouseOverItemStyle,]"
         :class="expandAll&&item.path?'noJustTitle':expandAll?'justTitle':''"
    >
      <i :class="item.icon?item.icon:fillingDefaultIcon?'iconfont icon-dian':''"
         :style="indent?{paddingLeft:`${item.indentValue}px`}:{}"
      ></i>
      <p>{{ item.title }}</p>
      <div class="imgBox">
        <i class="iconfont icon-insert-right-full"
           v-if="item.children?.length>0&&!expandAll"
           :class="[isOpen?'rotate':'rotateTwo','showIcon']"
        ></i>
      </div>
    </div>
    <transition
      @enter="enter"
      @leave="leave"
      name="showChild"
      @before-enter="beforeEnter"
    >
      <ul class="xy-submenu"
          v-if="expandAll||(item.children && isOpen && index === currentIndex)">
        <template v-if="showOnlyOneSubmenu">
          <xy-menu-item
            :key="index"
            :item="child"
            :height="height"
            :indent="indent"
            :selfJump="selfJump"
            :expandAll="expandAll"
            :itemStyle="itemStyle"
            :selectStyle="selectStyle"
            :mouseOverStyle="mouseOverStyle"
            v-for="(child, index) in item.children"
            :fillingDefaultIcon="fillingDefaultIcon"
          />
        </template>
        <template v-else>
          <xy-menu-item
            :key="index"
            :item="child"
            :index="index"
            :height="height"
            :indent="indent"
            :selfJump="selfJump"
            :itemStyle="itemStyle"
            :expandAll="expandAll"
            :selectStyle="selectStyle"
            :mouseOverStyle="mouseOverStyle"
            v-for="(child, index) in item.children"
            v-model:currentIndex="childCurrentIndex"
            :fillingDefaultIcon="fillingDefaultIcon"
          />
        </template>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">

import { defineComponent, ref, watch, PropType ,inject} from 'vue';
import { menuItem as MenuItemType } from './xy-menu.type';
import{showMsg}from "../../tools"
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
    currentIndex: {
      type: Number,
    },
    showOnlyOneSubmenu: {
      type: Boolean,
      default: false
    },
    height:{
      type:Number,
      default:40
    },
    selectStyle:{
      type:Object,
      default:()=>({})
    },
    itemStyle:{
      type:Object,
      default:()=>({})
    },
    mouseOverStyle:{
      type:Object,
      default:()=>({})
    },
    indent:{
      type:Boolean,
      default:true
    },
    expandAll:{
      type:Boolean,
      default:false
    },
    selfJump:{
      type:Boolean,
      default:true
    },
    fillingDefaultIcon:{
      type:Boolean,
      default:true
    }
  },
  emits: ['update:currentIndex'],
  setup(props, context) {
    const router = useRouter();
    const isOpen = ref(false);
    const childCurrentIndex = ref(0);
    const currentID = inject('currentID');
    const mouseOverItemStyle = ref({});
    const clickItem = inject('xyMenuClickItem');
    const toggle = (clickIndex: number, item: MenuItemType) => {
      // 切换状态
      isOpen.value = !isOpen.value;
      mouseOverItemStyle.value = {};

      // 发送事件
      context.emit('update:currentIndex', clickIndex);

      // 点击事件处理
      if (typeof clickItem === 'function') {
        clickItem(item);
      }

      // 检查是否自动跳转或有子项
      if (props.selfJump && (!item.children || item.children.length === 0)) {
        // 跳转到指定路径
        if (!item.path) {
          showMsg('error', '路径不存在');
        } else {
          // router.push(item.path.trim());
        }

        // 更新当前ID
        if(!item.children?.length){
          currentID.value = item.id;
        }
      }
    };

    const init = () => {
      isOpen.value = props.index === props.currentIndex;
    };

    watch(() => props.currentIndex, init);

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
    const mouseOver = () => {
      if (props.item.id === currentID.value) return;
      if(props.expandAll&&!props.item.path) return;
      mouseOverItemStyle.value = props.mouseOverStyle;
    };
    const mouseLeave = () => {
      mouseOverItemStyle.value = {};
    };

    return {
      isOpen,
      toggle,
      childCurrentIndex,
      beforeEnter,
      enter,
      leave,
      currentID,
      mouseOver,
      mouseLeave,
      mouseOverItemStyle
    };
  }
});
</script>

<style scoped lang="scss">
.xy-menuItem {
  display: flex;
  align-items: center;
  padding: 0 15px 0 10px;
  position: relative;
  .imgBox{
    position: absolute;
    right: 10px;
  }
  .showIcon {
    font-size: 12px;
  }
  p{
    width: 80%;
    padding-left: 2px;
    //一行显示不下的文字显示省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 14px;
  }
}
.noJustTitle{
  cursor: pointer;
}
.justTitle{
  p{
    font-weight: 600;
  }
}

.rotate {
  display: inline-block;
  transform: rotate(90deg);
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}
.rotateTwo{display: inline-block;
  transform: rotate(0deg);
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
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
