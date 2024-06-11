<script lang="ts">
import {defineComponent,h,reactive} from 'vue'
import {menuData} from "./xy-menu.type"
import xyMenuItem from './xy-menu-item.vue'
import leftTriangle from '../../assets/icon/leftTriangle.png'
import downTriangle from '../../assets/icon/dowTriangle.png'
export default defineComponent({
  name: "xy-menu",
  components:{
    xyMenuItem
  },
  props: {
    width:{
      type:String,
      default:"200px"
    },
    menuData:{
      type:Array as () => menuData[],
      default:[]
    },
    menuItemHeight:{
      type:Number,
      default:40
    }
  },
  setup(props, content) {
    const state = reactive({
      showDowIcon:false,
      showChild:false
    })
    const showChild = (even)=>{
      const currentTarget = even.currentTarget
      //获得当前点击的元素的父元素
      const parentElement = currentTarget.parentElement

      //获取所有的class=xy-menu-item-box的元素
      let menuItems = document.getElementsByClassName('xy-menu-item-box');
      //遍历所有的元素将其高度设置为props.menuItemHeight
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].style.height = props.menuItemHeight+'px'
      }
      // 设置currentTarget的高度为props.menuItemHeight*currentTarget.children.length,动画时间为1s
      const childrenLength = parentElement.children.length
      parentElement.style.height = props.menuItemHeight*parentElement.children.length+'px'
      parentElement.style.transition = 'height 1s'
    }
    return {
      showChild
    }
  },
  render() {
    // 通过 this 访问组件的 props
    const { width,menuItemHeight ,menuData,showChild} = this;
    const establishMenuItemBox = (menuItem) => {
      const menuTotalItem = [];
      const firstMenuItem = establishMenuItem(menuItem);
      menuTotalItem.push(firstMenuItem);

      if (menuItem.children.length > 0) {
        for (let i = 0; i < menuItem.children.length; i++) {
          const menuOtherItem = establishMenuItemBox(menuItem.children[i]);
          menuTotalItem.push(menuOtherItem);
        }

        return h('div', {
          id: menuItem.id,
          class: "xy-menu-item-box",
          style: {
            width: width,
            backgroundColor: 'red'
          }
        }, menuTotalItem);
      } else {
        return menuTotalItem; // 如果没有子菜单项，直接返回菜单项内容，不包裹在额外的 div 中
      }
    }

    const establishMenuItem = (menuItem?)=>{
      return h('div',{
        class:"xy-menu-item",
        style:{
          width:width,
          height:menuItemHeight+'px',
          backgroundColor:'red',
          cursor:'pointer'
        }
      },[
        h('p',menuItem.title),
      ])
    }
    const establishMenu = (menuData:menuData[]) =>{
      const menu = [];
      for (let i = 0; i < menuData.length; i++) {
        const menuItem = establishMenuItemBox(menuData[i])
        menu.push(menuItem)
      }
      console.log(menu)
      return menu
    }
    const totalMenu = establishMenu(menuData)
    return h('div', { class: 'xy-menu' }, totalMenu);
  }
})
</script>

<style scoped lang="scss">
.xy-menu-item-box {
  //padding:0 10px;
  div {
    padding: 0 10px;
  }
}

</style>