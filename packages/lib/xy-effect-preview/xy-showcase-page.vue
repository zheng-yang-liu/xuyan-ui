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
    function createP(PData:string|Array<string>){
      if(!PData){
        return ''
      }
      if(Array.isArray(PData)){
        return PData.map(item=>h('p',{},item))
      }else{
        return h('p',{},PData)
      }
    }
    function renderCatalogue(catalogue, depth = 2,subelement:boolean = false) {
      let marginTop = 32;
      let marginBottom = 20;
      return catalogue.map(item => {
        if (item.children) {
          // 如果有子元素，递归渲染子元素
          return h('div', {}, [
            h('h' + (depth>=6?6:depth), {
              style:{
                margin:`${marginTop-(8*(depth>=3?depth-2:0))}px 0 ${marginBottom-(5*(depth>=3?depth-2:0))}px`
              }
            }, item.name),
            createSlot(item.slot),
            renderCatalogue(item.children, depth + 1,true)
          ]);
        } else {
          // 没有子元素，直接渲染标题和解释
          return h('div', {}, [
            h('h' + (depth>=6?6:depth), {
              style:{
                margin:subelement?'24px 0 0':`${marginTop-(8*(depth>=3?depth-2:0))}px 0 ${marginBottom-(5*(depth>=3?depth-2:0))}px`
              }
            }, item.name),
            createP(item.explain),
            createSlot(item.slot),
          ]);
        }
      });
    }

    let pageElement = [
      h('h1', {style:{margin:'0 0 32px'}}, this.pageTitle),
      h('p',{},this.introduction),
      createSlot('pageExplain')
    ]

    pageElement = pageElement.concat(renderCatalogue(this.catalogue))

    return h('div', { class: 'xy-showcase' },pageElement);
  }
})
</script>

<style scoped lang="scss">
.xy-showcase{
  p{
    margin: 16px 0;
  }
}
</style>