<template>
  <div class="parent-container">
    <li class="xy-sub-menu" :aria-expanded="isCollapsed" aria-haspopup="true">
      <div class="sub-menu-title" @click="toggleMenu">
        <slot name="title"></slot>
      </div>
      <transition
        name="showChild"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <ul class="sub-menu-content" v-if="isCollapsed" >
          <slot></slot>
        </ul>
      </transition>
    </li>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject, watch } from 'vue';
export default defineComponent({
  name: 'xy-sub-menu',
  props: {
    subMenuId: {
      type: String,
      required: true,
    },
    subMenuFatherId: {
      type: String,
      default: Math.random().toString(36).slice(2),
    },
    indentValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const currentSubMenuId = inject('currentSubMenuId');
    const setCurrentSubMenuId = inject('setCurrentSubMenuId');
    const currentSubMenuFatherId = inject('currentSubMenuFatherId');
    const setCurrentSubMenuFatherId = inject('setCurrentSubMenuFatherId');
    const showAll = inject('showAll');
    const isCollapsed = ref(showAll);



    const toggleMenu = () => {
      if (showAll) {
        return;
      }
      isCollapsed.value = !isCollapsed.value;
    };

    watch(() => isCollapsed.value, (newVal) => {
      if (showAll) {
        return;
      }
      if (newVal) {
        setCurrentSubMenuId(props.subMenuId);
        props.subMenuFatherId && setCurrentSubMenuFatherId(props.subMenuFatherId);
        isCollapsed.value = props.subMenuId === currentSubMenuId.value || props.subMenuId === currentSubMenuFatherId.value;
      }
    });

    watch(() => currentSubMenuId.value, () => {
      if (showAll) {
        return;
      }
      isCollapsed.value = props.subMenuId === currentSubMenuId.value || props.subMenuId === currentSubMenuFatherId.value;
    });

    const beforeEnter = async (el: HTMLElement) => {
      el.style.height = '0';
    };

    const enter = async (el: HTMLElement) => {
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', () => {
        el.style.height = 'auto';
      }, { once: true });
    };

    const leave = async (el: HTMLElement) => {
      el.style.height = `${el.scrollHeight}px`;
      setTimeout(() => {
        el.style.height = '0';
      });
    };

    return {
      isCollapsed,
      toggleMenu,
      beforeEnter,
      enter,
      leave,
    };
  },
});
</script>
<style scoped>
.xy-sub-menu {

}

.sub-menu-title {
  cursor: pointer;
  user-select: none;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

.sub-menu-content {
  list-style-type: none;
  overflow: hidden;
  transition: height 0.5s ease;
}

.showChild-enter-active,
.showChild-leave-active {
  transition: height 0.5s ease;
}

.parent-container {

}
</style>
