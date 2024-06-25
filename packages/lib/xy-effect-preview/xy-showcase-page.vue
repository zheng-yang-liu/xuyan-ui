<script lang="ts">
import {defineComponent,PropType,h,ref,onMounted,onBeforeUnmount} from 'vue'
import {catalogue} from"./effect.type"
import xyMenuLeft from "../xy-menu/xy-menu-left.vue";
import{calculateItemDepth,deepLookup,throttle}from"../../tools"
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
    },//标题触发范围height
    titleTriggerRange:{
      type: Number,
      default: 200
    }
  },
  components: {
    xyMenuLeft
  },
  setup(props, context) {
    const promptBlockTop = ref(0);
    const menuItemHeight = 30;
    const showPromptBlock = ref<Boolean>(false);
    const {updatedList,listTotal} = calculateItemDepth(
      props.catalogue,
      10,
      0
    );
    const startID = ref<string>('');
    const displayCatalogue = ref<Boolean>(props.showCatalogue);
    const originalWidth = window.innerWidth;
    if(props.showCatalogue){
      displayCatalogue.value = originalWidth > 1075;
    }
    const clickItemToTitle = (item) => {
      const tempATag = document.createElement('a');
      tempATag.href = `#${item.id?item.id:item.title}`;
      tempATag.click();
      showPromptBlock.value = true;
      promptBlockTop.value = menuItemHeight * item.listPosition
    }
    console.log(originalWidth)
    
    const debounceResize = throttle(() => {
      const currentWidth = window.innerWidth;
      if(props.showCatalogue){
        if (currentWidth !== originalWidth) {
          displayCatalogue.value = currentWidth > 1075;
        }
      }
    }, 500);

    onBeforeUnmount(() => {
      window.removeEventListener('resize', debounceResize);
    });

    onMounted(()=>{
      window.addEventListener('resize', debounceResize);
      //获取可视区域的高度
      const viewHeight = document.documentElement.clientHeight;
      const hTagList = document.getElementsByClassName('hTag');
      let options = {
        root: null,
        rootMargin: `0px 0px -${viewHeight/2 + props.titleTriggerRange}px 0px`,
        threshold: 1.0,
      };
      const titleTriggerCallback = (e) =>{
        e.forEach(item=>{
          if(item.isIntersecting){
            showPromptBlock.value=true;
            //获取target的name属性
            const targetName = item.target.getAttribute('name');
            const resultLook = deepLookup(updatedList,(item)=>item.id===targetName);
            promptBlockTop.value = menuItemHeight * resultLook[0].listPosition
            startID.value = targetName;

          }else{
            showPromptBlock.value=false;
            startID.value= '';
          }
        })
      };
      const observer = new IntersectionObserver(titleTriggerCallback, options);
      for(let item of hTagList){
        observer.observe(item)
      }
    })
    return {
      clickItemToTitle,
      promptBlockTop,
      menuItemHeight,
      updatedList,
      startID,
      showPromptBlock,
      displayCatalogue

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
              name:item.id,
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
              h('a',{name:item.id?item.id:item.title,},'#')
            ]),
            createSlot(item.slot),
            renderCatalogue(item.children, depth + 1,true)
          ]);
        } else {
          // 没有子元素，直接渲染标题和解释
          return h('div', {}, [
            h('h' + (depth>=6?6:depth), {
              class:'hTag',
              name:item.id,
              style:{
                margin:subelement?'24px 0 0':`${marginTop-(8*(depth>=3?depth-2:0))}px 0 ${marginBottom-(5*(depth>=3?depth-2:0))}px`
              },
              onMouseover: (e) => {
                if (e.target.children.length > 0) {
                  e.target.children[0].style.opacity = 1;
                }
              },
              onMouseleave: (e) => {
                if (e.target.children.length > 0) {
                  e.target.children[0].style.opacity = 0;
                }
              },
            }, [
              item.title,
              h('a',{name:item.id?item.id:item.title,},'#')
            ]),
            createP(item.explain),
            createSlot(item.slot),
          ]);
        }
      });
    }
    const createAssembly = () =>{
      let result = []
      if(this.displayCatalogue){
        result.push(

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

    const catalogueCom = h(xyMenuLeft,{
        startID:this.startID,
        expandAll:true,
        selfJump:false,
        needPath:false,
        defaultStyle:false,
        isTheHeightSet:false,
        areAllClickable:true,
        menuItems:this.updatedList,
        fillingDefaultIcon:false,
        height:this.menuItemHeight,
        selectStyle:{color:'#409eff'},
        onClickItem:this.clickItemToTitle,
        menuLeftStyle:{position:"sticky",top:'50px'},
        itemTitleStyle:{fontWeight:500,fontSize:'12px'},
        mouseOverStyle:{color:'#409eff',cursor:'pointer'},
        submenuIndentConfig:{autoIndent:false,indentValue:10,currentIndent:0},
        logoSlotStyle:{position:"sticky",top:'50px',display:"flex",alignItems:"center"}
      },{
        logo:()=>h('div',{
          style:{
            position:'relative',
            width:'4px',
            height:'15px',
          }
        },[
          this.showPromptBlock?h("div",{
            style:{
              position:'absolute',
              width:'4px',
              height:'15px',
              backgroundColor:'#409eff',
              borderRadius:'3px',
              top:`${this.promptBlockTop}px`,
              left:0,
            }
          },''):''
        ])
      })

    return h('div', { class: 'xy-showcase' },[
      h('div',{class:'xy-showcase-left'},[pageElement]),
      this.displayCatalogue?catalogueCom:''
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