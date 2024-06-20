<script lang="ts">
import {defineComponent,PropType,h} from 'vue'
import {catalogue} from"./effect.type"
import type {menuItem as MenuItemType} from "../xy-menu/xy-menu.type";
import{calculateItemDepth}from "../../tools";
export default defineComponent({
  name: "xy-showcase-page",
  props: {
    catalogue:{
      type: Array as PropType<catalogue[]>,
      default: () => [],
      required: true
    },
    pageTitle:{
      type: String,
      default: '',
      required: true
    },
    introduction:{
      type: String,
      default: '',
      required: true
    }
  },
  components: {},
  setup(props, context) {

    return {}
  },
  render() {
    function renderCatalogue(catalogue:catalogue[]){
      return catalogue.map((item:catalogue) => {
        return h('div', { class: 'catalogue-item' }, [
          h('h2', {}, item.name),
          h('p', {}, item.explain),
        ])
      })
    }


    const improveCatalogue = calculateItemDepth(this.catalogue, 1, 2);

    console.log(improveCatalogue);

    // console.log(renderCatalogue(this.catalogue))
    let pageElement = [h('h1', {}, this.pageTitle),this.$slots[`customSlot`] ? this.$slots[`customSlot`]():'',]
    pageElement = pageElement.concat(renderCatalogue(this.catalogue))
    return h('div', { class: 'my-component' },pageElement);
  }
})
</script>

<style scoped lang="scss">

</style>