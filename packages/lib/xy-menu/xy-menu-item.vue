<template>
  <li>
    <div @click="toggle(index, item)"
         class="xy-menuItem"
         :style="[{height:`${height}px`},item.children?.length>0?{}:item.id == currentID?selectStyle:{}]">
      <i :class="item.icon"></i>
      <p>{{ item.title }}</p>
      <div class="imgBox">
        <img
          :class="{ 'rotate': isOpen }"
          src="../../assets/icon/leftTriangle.png"
          alt=""
          v-if="item.children?.length>0">
      </div>
    </div>
    <transition
      name="showChild"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <ul v-if="item.children && isOpen && index === currentIndex"
          class="xy-submenu"
          :style="{paddingLeft:`${submenuIndent}px`}"
      >
        <template v-if="showOnlyOneSubmenu">
          <xy-menu-item
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
            :index="index"
            v-model:currentIndex="childCurrentIndex"
            v-model:currentID="childCurrentID"
            :height="height"
            :submenuIndent="submenuIndent"
            :selectStyle="selectStyle"
          />
        </template>
        <template v-else>
          <xy-menu-item
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
            v-model:currentID="childCurrentID"
            :height="height"
            :submenuIndent="submenuIndent"
            :selectStyle="selectStyle"
          />
        </template>
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
    currentIndex: {
      type: Number,
    },
    currentID: {
      type: String,
    },
    showOnlyOneSubmenu: {
      type: Boolean,
      default: true
    },
    height:{
      type:Number,
      default:40
    },
    submenuIndent:{
      type:Number,
      default:0
    },
    selectStyle:{
      type:Object,
      default:()=>({})
    }
  },
  emits: ['update:currentIndex', 'update:currentID'],
  setup(props, context) {

    const router = useRouter();
    const isOpen = ref(false);
    const childCurrentIndex = ref(0);
    const childCurrentID = ref('');
    const toggle = (clickIndex: number, item: MenuItemType) => {
      isOpen.value = !isOpen.value;
      context.emit('update:currentIndex', clickIndex);
      context.emit('update:currentID', item.id);
      console.log(item)
      if(item.children?.length>0) return;
      // router.push(item.path);
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
    return {
      isOpen,
      toggle,
      childCurrentIndex,
      beforeEnter,
      enter,
      leave,
      childCurrentID

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
