<script lang="ts">
import {defineComponent,PropType,h,ref,onMounted,onBeforeUnmount} from 'vue'
import {catalogueType,introductionType} from"./effect.type"
import{calculateItemDepth,deepLookup,throttle,debounce,setCssVar}from "../../Utils/Tools"
import xyMenuCatalog from "../xy-menu/xy-menu-catalog.vue";
import xyCode from "./xy-code.vue";
export default defineComponent({
  name: "xy-showcase-page",
  props: {//目录列表
    catalogue:{
      type: Array as PropType<catalogueType[]>,
      default: () => [],
      required: true
    },//页面标题
    pageTitle:{
      type: String,
      default: '',
      required: true
    },//页面介绍
    introduction:{
      type: [String, Array] as PropType<introductionType>,
      required: true,  // 如果需要该 prop 必须传递
      validator: (value: unknown): boolean => {
        // 确保 value 是字符串或字符串数组
        return typeof value === 'string' || (Array.isArray(value) && value.every(item => typeof item === 'string'));
      },
    },//是否显示目录
    showCatalogue:{
      type: Boolean,
      default: true
    },//标题触发范围的height,从顶部开始计算
    titleTriggerRange:{
      type: Number,
      default: 0
    },//动态显示目录的宽度
    showCatalogueWidth:{
      type: Number,
      default: 1075
    },//只有全屏状态下才显示目录
    screenMaxCatalogue:{
      type: Boolean,
      default: false
    },//currentTitleID
    currentTitleID:{
      type: String,
      default: ''
    }
  },
  emits:['update:currentTitleID'],
  components: {
  },
  setup(props, content) {
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

    const ifMaximizing = ()=>{
      return window.outerHeight === screen.availHeight && window.outerWidth === screen.availWidth;
    }

    if(props.showCatalogue){
      if(props.screenMaxCatalogue){//最大化时显示
        displayCatalogue.value = ifMaximizing();
      }else{
        displayCatalogue.value = originalWidth > props.showCatalogueWidth;
      }
    }
    const clickItemToTitle = (item:any) => {
      const tempATag = document.createElement('a');
      tempATag.href = `#${item.id?item.id:item.title}`;
      tempATag.click();
      showPromptBlock.value = true;
      promptBlockTop.value = menuItemHeight * item.listPosition
    }

    const debounceResize = throttle(() => {
      const currentWidth = window.innerWidth;
      if(props.showCatalogue){
        if(props.screenMaxCatalogue){
          displayCatalogue.value = ifMaximizing();
        }else{
          displayCatalogue.value = currentWidth > props.showCatalogueWidth;
        }
      }
    },100)

    const setDirectory = ()=>{
      //获取可视区域的高度
      const viewHeight = document.documentElement.clientHeight;
      const hTagList = document.getElementsByClassName('hTag');
      let options = {
        root: null,
        rootMargin: `0px 0px -${viewHeight*3/4 + props.titleTriggerRange}px 0px`,
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
            content.emit('update:currentTitleID',startID.value)
            setCssVar('--current-titleID',startID.value)
          }else{
            // showPromptBlock.value=false;
            // startID.value= '';
          }
        })
      };
      const observer = new IntersectionObserver(titleTriggerCallback, options);
      for(let item of hTagList){
        observer.observe(item)
      }
    }

    const setDirectoryDebounce = debounce(setDirectory,1000);

    onMounted(()=>{
      window.addEventListener('resize', debounceResize);
      window.addEventListener('resize', setDirectoryDebounce);
      setCssVar('--current-titleID','')
      setDirectory();
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', debounceResize);
      window.removeEventListener('resize', setDirectoryDebounce)
    });
    return {
      startID,
      updatedList,
      promptBlockTop,
      menuItemHeight,
      showPromptBlock,
      displayCatalogue,
      clickItemToTitle

    }
  },
  render() {
    const that = this;
    function createSlot(slotName:string){
      return that.$slots[slotName] ? that.$slots[slotName]():'';
    }
    function setCodeP (text:string){
      const parts = text.split(/(`[^`]+`)/g);
      return parts.map(part => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return h(xyCode, {code:part.slice(1, -1)})
        }
        return part;
      })
    }
    function createP(PData:string|Array<string>){
      if(!PData){
        return ''
      }
      if(Array.isArray(PData)){
        return PData.map(item=>h('p',{class:'xy-showcase-page-p'},setCodeP(item)))
      }else{
        return h('p',{class:'xy-showcase-page-p'},setCodeP(PData))
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
                if (e.target.children.length > 0) {
                  e.target.children[0].style.opacity = 1;
                }
              },
              onMouseleave:(e)=>{
                if (e.target.children.length > 0) {
                  e.target.children[0].style.opacity = 0;
                }
              },
            }, [
              item.title,
              h('a',{
                style:{cursor:'pointer'},
                id:item.id?item.id:item.title,
                onMouseover: (e:any) => {
                  e.target.style.opacity = 1;
                },
                onMouseleave: (e:any) => {
                  e.target.style.opacity = 0;
                },
                onMousedown: (e:any) => {
                  e.preventDefault();
                  e.target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                },
              },'#')
            ]),
            createP(item.explain),
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
              onMouseover: (e:any) => {
                if (e.target.children.length > 0) {
                  e.target.children[0].style.opacity = 1;
                }
              },
              onMouseleave: (e:any) => {
                if (e.target.children.length > 0) {
                  e.target.children[0].style.opacity = 0;
                }
              },
            }, [
              item.title,
              h('a',{
                style:{cursor:'pointer'},
                id:item.id?item.id:item.title,
                onMouseover: (e:any) => {
                  e.target.style.opacity = 1;
                },
                onMouseleave: (e:any) => {
                  e.target.style.opacity = 0;
                },
                onMousedown: (e:any) => {
                  e.preventDefault();
                  e.target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                },
              },'#'),
            ]),
            createP(item.explain),
            createSlot(item.slot),
          ]);
        }
      });
    }

    let pageElement = [
      h('h1', {style:{margin:'0 0 32px'}}, this.pageTitle),
      createP(this.introduction),
      createSlot('pageExplain')
    ]

    pageElement = pageElement.concat(renderCatalogue(this.catalogue))
    //@ts-ignore
    const catalogueCom = h(xyMenuCatalog,{
        startID:this.startID,
        promptBlockTop:this.promptBlockTop,
        catalogue:this.updatedList,
        onClickItem:this.clickItemToTitle,
        showPromptBlock:this.showPromptBlock,
      },{
        logo:()=>h('div',{
          style:{
            position:'relative',
            width:'4px',
            height:'15px',
          }
        },'')
      }
    )

    return h('div', { class: 'xy-showcase' },[
      h('div',{class:'xy-showcase-left'},[pageElement]),
      this.displayCatalogue?h('div',{style:{width:'40px'}}):'',
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
    line-height: 1.7;
  }
  .xy-showcase-left{
    width: 100%;
    //padding-right: 40px;
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