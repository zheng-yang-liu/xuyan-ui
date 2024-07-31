<template>
<!--  <xy-menu-->
<!--    background-color="#545c64"-->
<!--    :show-all="false"-->
<!--  >-->
<!--    <xy-menu-item>首页</xy-menu-item>-->
<!--    <xy-sub-menu subMenuId="1">-->
<!--      <template v-slot:title>功能</template>-->
<!--      <xy-menu-item>删除</xy-menu-item>-->
<!--      <xy-menu-item>查看</xy-menu-item>-->
<!--      <xy-sub-menu subMenuId="1-1" sub-menu-father-id="1">-->
<!--        <template v-slot:title>操作</template>-->
<!--        <xy-menu-item>增加操作</xy-menu-item>-->
<!--        <xy-menu-item>修改操作</xy-menu-item>-->
<!--      </xy-sub-menu>-->
<!--      <xy-sub-menu subMenuId="1-2" sub-menu-father-id="1">-->
<!--        <template v-slot:title>查询</template>-->
<!--        <xy-menu-item>基础查询</xy-menu-item>-->
<!--        <xy-menu-item>高级查询</xy-menu-item>-->
<!--      </xy-sub-menu>-->
<!--    </xy-sub-menu>-->
<!--    <xy-sub-menu subMenuId="2">-->
<!--      <template v-slot:title>工具</template>-->
<!--      <xy-menu-item>动画</xy-menu-item>-->
<!--      <xy-menu-item>绘图</xy-menu-item>-->
<!--      <xy-sub-menu subMenuId="2-1" sub-menu-father-id="2">-->
<!--        <template v-slot:title>函数</template>-->
<!--        <xy-menu-item>一般函数</xy-menu-item>-->
<!--        <xy-menu-item>复杂函数</xy-menu-item>-->
<!--      </xy-sub-menu>-->
<!--    </xy-sub-menu>-->
<!--  </xy-menu>-->
  <xy-menu-left :menuItems="menuItems"></xy-menu-left>
</template>

<script setup lang="ts">
import XyMenuLeft from './xy-menu-left.vue';
const menuItems = [
  {
    title: '首页',
    id: '1',
  },
  {
    title: '组件预览',
    id: '7ee90288e34fa07d8b0cde520d152ddf',
    icon: 'iconfont icon-donghua',
    children: [
      {
        title: '基础组件预览',
        id: 'f0f40927fb775042ec340c68d85d3cd9',
        fatherId: '7ee90288e34fa07d8b0cde520d152ddf',
        path: '/component/componentPreview',
        children: [
          {
            title: '按钮',
            id: 'bc039873416411b993abded52050266c',
            fatherId: 'f0f40927fb775042ec340c68d85d3cd9',
            path: '/component/componentPreview',
            children:[
              {
                title: '按钮1',
                id: 'ertcyvubihjokpldcfvgbhnjmkfv',
                fatherId: 'bc039873416411b993abded52050266c',
              }
            ]
          },
          {
            title: '图标',
            id: 'sdfgxgjhghgfdfgkjhgfd66666',
            fatherId: 'f0f40927fb775042ec340c68d85d3cd9',
            path: '/component/componentPreview',
          }
        ]
      },
      {
        title: '数据组件预览',
        id: 'b3eda810068053e4189e00c61b000888',
        fatherId: '7ee90288e34fa07d8b0cde520d152ddf',
        path: '/component/componentPreview',
      }
    ]
  },
  {
    title: '工具函数',
    id: '2',
    icon: 'iconfont icon-donghua',
    children: [
      {
        title: '图标动画',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        id: '2-1',
        fatherId: '2',
        children: [
          {
            title: 'svg动画',
            id: '2-1-1',
            icon: 'iconfont icon-dian',
            fatherId: '2-1',
            children: [
              {
                title: 'svg描边',
                id: '2-1-1-1',
                icon: 'iconfont icon-kuaidiyuan-xianxing',
                fatherId: '2-1-1',
                children: [
                  {
                    title: 'svg白的描边',
                    path: '/svgAnimation',
                    id: '2-1-1-1-1',
                    fatherId: '2-1-1-1',
                  },
                  {
                    title: 'svg黑的描边',
                    path: '/system/user/list',
                    icon: 'iconfont icon-dian',
                    id: '2-1-1-1-2',
                    fatherId: '2-1-1-1',
                  }
                ]
              },
              {
                title: 'svg填充',
                icon: 'iconfont icon-kuaidiyuan-xianxing',
                id: '2-1-1-2',
                fatherId: '2-1-1',
                children: [
                  {
                    title: 'svg白的填充',
                    id: '2-1-1-2-1',
                    icon: 'iconfont icon-dian',
                    path: '/system/user/list',
                    fatherId: '2-1-1-2',
                  },
                  {
                    title: 'svg黑的填充',
                    id: '2-1-1-2-2',
                    icon: 'iconfont icon-dian',
                    path: '/system/user/add',
                    fatherId: '2-1-1-2',
                  }
                ]
              }
            ]
          },
          {
            title: 'canvas动画',
            path: '/system/user/add',
            id: '2-1-2',
            fatherId: '2-1',
          }
        ]
      },
      {
        title: '防抖函数',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        id: '2-2',
        fatherId: '2',
        children: [
          {
            title: '节流',
            path: '/system/role/list',
            icon: 'iconfont icon-dian',
            id: '2-2-1',
            fatherId: '2-2',
          },
          {
            title: '防抖',
            path: '/system/role/add',
            icon: 'iconfont icon-dian',
            id: '2-2-2',
            fatherId: '2-2',
          }
        ]
      },
      {
        title: '深拷贝',
        path: '/system/menu',
        id: '2-3',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        fatherId: '2',
      }
    ]
  },
  {
    title: '数据类型',
    id: '3',
    icon: 'iconfont icon-kuaidiyuan-xianxing',
    children: [
      {
        title: '基本数据类型',
        id: '3-1',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        fatherId: '3',
        children: [
          {
            title: 'string',
            id: '3-1-1',
            path: '/system/user/list',
            icon: 'iconfont icon-dian',
            fatherId: '3-1',
          },
          {
            title: 'number',
            path: '/system/user/add',
            icon: 'iconfont icon-dian',
            fatherId: '3-1',
          }
        ]
      },
      {
        title: 'object',
        path: '/system/menu',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        id: '3-2',
        fatherId: '3',
      }
    ]
  },
];

</script>

<style scoped>
/* Add your styles here */
</style>
