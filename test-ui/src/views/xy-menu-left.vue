<script lang="ts">
import xyMenu from "@/views/xy-menu.vue";
import xySubMenu from "@/views/xy-sub-menu.vue";
import xyMenuItem from "@/views/xy-menu-item.vue";
import { defineComponent, h, PropType } from 'vue';
import {Tools} from "../../../packages";
export default defineComponent({
  name: 'xy-menu-left',
  props: {
    menuItems: {
      type: Array as PropType<Array<any>>,
      default: () => []
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },
  setup(props,content) {

    const {updatedList,listTotal} = Tools.calculateItemDepth(
      props.menuItems,
      10,
      0
    )
    console.log(updatedList)
    const renderMenu = (items: any[]) => {
      return items.map(item => {
        if (item.children && item.children.length > 0) {
          return h(
            xySubMenu,
            {
              subMenuId: item.id,
              subMenuFatherId: item.fatherId,
            }, {
            title: () => item.title,
            default: () => renderMenu(item.children)
          });
        } else {
          console.log(item)
          return h(
            xyMenuItem,
            {
              indentValue:item.indentValue,
              onClick: () => {
                console.log(item.title);
              }
            },
            item.title,
          );
        }
      });
    };

    return {
      renderMenu
    };
  },
  render() {
    return h(xyMenu, {
      backgroundColor: this.backgroundColor
    }, {
      default: () => this.renderMenu(this.menuItems)
    });
  }
});
</script>
