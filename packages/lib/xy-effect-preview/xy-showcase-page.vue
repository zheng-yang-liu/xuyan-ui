<script lang="ts">
import {defineComponent,PropType,h,provide} from 'vue'
import {catalogue} from"./effect.type"
import xyMenuLeft from "../xy-menu/xy-menu-left.vue";
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
    },
    showCatalogue:{
      type: Boolean,
      default: true
    }
  },
  components: {
    xyMenuLeft
  },
  setup(props, context) {
    const clickItemToTitle = (item) => {
      console.log(item);
      const tempATag = document.createElement('a');
      console.log('#' + item.id)
      tempATag.href = '#' + item.id;
      tempATag.click();
    }
    return {
      clickItemToTitle
    }
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
              class:'hTag',
              style:{
                margin:`${marginTop-(8*(depth>=3?depth-2:0))}px 0 ${marginBottom-(5*(depth>=3?depth-2:0))}px`
              },
              onMouseover:(e)=>{
                e.target.children[0].style.opacity = 1;
              },
              onMouseleave:(e)=>{
                e.target.children[0].style.opacity = 0
              },
            }, [
              item.title,
              h('a',{name:item.id,},'#')
            ]),
            createSlot(item.slot),
            renderCatalogue(item.children, depth + 1,true)
          ]);
        } else {
          // 没有子元素，直接渲染标题和解释
          return h('div', {}, [
            h('h' + (depth>=6?6:depth), {
              class:'hTag',
              style:{
                margin:subelement?'24px 0 0':`${marginTop-(8*(depth>=3?depth-2:0))}px 0 ${marginBottom-(5*(depth>=3?depth-2:0))}px`
              },
              onMouseover:(e)=>{
                e.target.children[0].style.opacity = 1;
              },
              onMouseleave:(e)=>{
                e.target.children[0].style.opacity = 0
              },
            }, [
              item.title,
              h('a',{name:item.id,},'#')
            ]),
            createP(item.explain),
            createSlot(item.slot),
          ]);
        }
      });
    }
    const createAssembly = () =>{
      let result = []
      if(this.showCatalogue){
        result.push(
          h(xyMenuLeft,{
            menuItems:this.catalogue,
            isTheHeightSet:false,
            expandAll:true,
            selfJump:false,
            fillingDefaultIcon:false,
            defaultStyle:false,
            needPath:false,
            mouseOverStyle:{color:'#409eff',cursor:'pointer'},
            selectStyle:{color:'#409eff'},
            onClickItem:this.clickItemToTitle,
            areAllClickable:true,
            menuLeftStyle:{position:"sticky",top:'50px'}
          }),
        )
      }
      return result
    }

    let pageElement = [
      h('h1', {style:{margin:'0 0 32px'}}, this.pageTitle),
      h('p',{},this.introduction),
      createSlot('pageExplain')
    ]

    pageElement = pageElement.concat(renderCatalogue(this.catalogue))

    const assemblyList = createAssembly()

    return h('div', { class: 'xy-showcase' },[
      h('div',{class:'xy-showcase-left'},[pageElement]),
      ...assemblyList
    ]);
  }
})
</script>

<style scoped lang="scss">
.xy-showcase{
  display: flex;
  p{
    margin: 16px 0;
  }
  .xy-showcase-left{
    width: 100%;
  }
  .hTag{
    position: relative;
    a{
      position: absolute;
      left: -15px;
      color: #409eff;
      opacity: 0;
      //下划线
      text-decoration: none;
    }
  }
}
</style>