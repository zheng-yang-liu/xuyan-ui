<script lang="ts">
import {defineComponent,h,reactive} from 'vue'
export default defineComponent({
  name: "renderTemplate",
  components:{},
  props: {},
  setup(props, content) {
    const state = reactive({})
    const showChild = (even)=>{}
    return {
      showChild
    }
  },
  render() {
    // 通过 this 访问组件的 props和setup返回的数据
    const { width,menuItemHeight ,menuData,showChild} = this;
    const totalMenu = [];
    return h('div', { class: 'xy-menu' }, totalMenu);
  }
})
</script>

<style scoped lang="scss">

</style>