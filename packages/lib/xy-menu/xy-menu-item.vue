<template>
  <li>
    <div @click="toggle(index)">
      {{ item.title }}
    </div>
    <ul v-if="item.children && isOpen && index===currentIndex" class="submenu">
      <template v-if="childIfSwitchClose">
        <xy-menu-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        />
      </template>
      <template v-else >
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
import { defineComponent, ref ,watch ,PropType} from 'vue';
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
    index:{
      type: Number,
    },
    currentIndex:{
      type: Number,
    },
    childIfSwitchClose:{
      type:Boolean,
      default: true
    }
  },
  emits: ['update:currentIndex'],
  setup(props,context) {
    const isOpen = ref(false);
    const childCurrentIndex = ref(0);
    const toggle = (clickIndex:number) => {
      isOpen.value = !isOpen.value;
      console.log(clickIndex,isOpen.value);
      context.emit('update:currentIndex',clickIndex)
    };
    const init = () =>{
      isOpen.value = props.index === props.currentIndex;
    };
    watch(()=>props.currentIndex,init);
    return {
      isOpen,
      toggle,
      childCurrentIndex
    };
  }
});
</script>

<style scoped>
.submenu {
  list-style-type: none;
  padding-left: 20px;
}
</style>
