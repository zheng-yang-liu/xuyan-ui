<template>
  <div class="menu-item-box">
<!--    头部-->
    <div class="xy-menu-item" :style="{height:height}" @click="showChild">
      <i :class="itemData.icon"></i>
      <p>{{itemData.title}}</p>
      <img v-if="itemData.children.length>0 &&! state.showDowIcon" src="../../assets/icon/leftTriangle.png" >
      <img v-if="state.showDowIcon" src="../../assets/icon/dowTriangle.png" >
    </div>
<!--    孩子-->
    <template v-if="itemData.children.length>0 &&state.showChild">
      <template v-for="(item,index) in itemData.children" :key="index">
        <div class="xy-menu-item" :style="{height:height,padding:'0 10px 0 20px'}">
          <i :class="item.icon"></i>
          <p>{{item.title}}</p>
          <img v-if="itemData.children.length>0 &&! state.showDowIcon" src="../../assets/icon/leftTriangle.png" >
          <img v-if="state.showDowIcon" src="../../assets/icon/dowTriangle.png" >
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive} from 'vue'
import {menuData} from "./xy-menu.type"
export default defineComponent({
  name: "xy-menu-item",
  props: {
    itemData:{
      type:Object as () => menuData,
      default:{}
    },
    height:{
      type:String,
      default:"40px"
    }
  },
  components:{
  },
  setup(props, content) {
    const state = reactive({
      showDowIcon:false,
      showChild:false
    })
    const showChild = ()=>{
      state.showChild = !state.showChild
      state.showDowIcon = !state.showDowIcon
    }
    return {
      state,
      showChild
    }
  }
})
</script>
<script lang="ts">




</script>
<style scoped lang="scss">
.xy-menu-item{
  padding: 0 10px;
  display: flex;
  align-items: center;
  i{
    font-size: 16px;
  }
  p{
    width: 140px;
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img{
    width: 10px;
    height: 10px;
  }
}
.xy-menu-item-child {
  @extend .xy-menu-item;
}
</style>