<template>
  <li>
    <div @click="toggle">
      {{ item.title }}
    </div>
    <ul v-if="item.children && isOpen" class="submenu">
      <xy-menu-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    }
  },
  setup(props,context) {
    const isOpen = ref(false);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    console.log(props.item)
    return {
      isOpen,
      toggle
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
