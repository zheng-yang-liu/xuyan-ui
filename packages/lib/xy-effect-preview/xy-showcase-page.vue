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


    return h('div', { class: 'my-component' }, [
      h('h1', {}, this.pageTitle), // 显示组件的标题
      // 插入具名插槽内容
      this.$slots[`customSlot`] ? this.$slots[`customSlot`]():'',
    ]);
  }
})
</script>

<style scoped lang="scss">

</style>