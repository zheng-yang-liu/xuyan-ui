<template>
  <li>
    <div @click="toggle(index, item)" class="xyMenuItem">
      {{ item.title }}
    </div>
    <transition
      name="showChild"
      v-if="useAnimation"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <ul v-if="item.children && isOpen && index === currentIndex" class="submenu">
        <template v-if="childIfSwitchClose">
          <xy-menu-item
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
          />
        </template>
        <template v-else>
          <xy-menu-item
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
            :index="index"
            v-model:currentIndex="childCurrentIndex"
          />
        </template>
      </ul>
    </transition>
    <ul v-else v-if="item.children && isOpen && index === currentIndex" class="submenu">
      <template v-if="childIfSwitchClose">
        <xy-menu-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        />
      </template>
      <template v-else>
        <xy-menu-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :index="index"
          v-model:currentIndex="childCurrentIndex"
        />
      </template>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import { MenuItem as MenuItemType } from './xy-menu.type';

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
    childIfSwitchClose: {
      type: Boolean,
      default: true
    },
    useAnimation: {
      type: Boolean,
      default: true // 默认启用动画
    }
  },
  emits: ['update:currentIndex'],
  setup(props, context) {
    const isOpen = ref(false);
    const childCurrentIndex = ref(0);

    const toggle = (clickIndex: number, item: MenuItemType) => {
      isOpen.value = !isOpen.value;
      context.emit('update:currentIndex', clickIndex);
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
      leave
    };
  }
});
</script>

<style scoped>
.xyMenuItem {
  cursor: pointer;
}
.submenu {
  list-style-type: none;
  padding-left: 20px;
  overflow: hidden;
  transition: height 0.5s ease;
}

.showChild-enter-active,
.showChild-leave-active {
  transition: height 0.5s ease;
}
</style>
