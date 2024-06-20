<script lang="ts">
import {defineComponent,PropType,h} from 'vue'
import {catalogue} from"./effect.type"
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
    const that = this;
    function createSlot(slotName:string){
      return that.$slots[slotName] ? that.$slots[slotName]():'';
    }
    function renderCatalogue(catalogue, depth = 1) {
      return catalogue.map(item => {
        if (item.children) {
          // 如果有子元素，递归渲染子元素
          return h('div', {}, [
            h('h' + (depth + 1), {}, item.name),
            createSlot(item.slot),
            renderCatalogue(item.children, depth + 1)
          ]);
        } else {
          // 没有子元素，直接渲染标题和解释
          return h('div', {}, [
            h('h' + (depth + 1), {}, item.name),
            h('p', {}, item.explain),
            createSlot(item.slot),
          ]);
        }
      });
    }

    let pageElement = [
      h('h1', {}, this.pageTitle),
      h('p',{},this.introduction),
      createSlot('pageExplain')
    ]

    pageElement = pageElement.concat(renderCatalogue(this.catalogue))

    return h('div', { class: 'my-component' },pageElement);
  }
})
</script>

<style scoped lang="scss">

</style>