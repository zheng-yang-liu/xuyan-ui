<template>
  <div>
    <xy-classic-page v-model:direction="direction">
      <template #header>
        <el-button @click="dianji">header</el-button>
        <el-button @click="dddddddd">header2</el-button>
        <i class="iconfont icon-kuaidiyuan-xianxing"></i>
      </template>
      <template #aside>
        <div style="background-color: #3c9cff;width: 100%;height: 100%">
          <xy-menu :menuItems="menuItems"></xy-menu>
        </div>
      </template>
      <template #main>
        <div style="background-color: green;width: 100%;height: 100%"></div>
      </template>
    </xy-classic-page>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuItems = [
  {
    title: '系统管理1',
    path: '/system',
    icon: 'iconfont icon-kuaidiyuan-xianxing',
    children: [
      {
        title: '用户管理1-1',
        path: '/system/user',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        children: [
          {
            title: '用户列表1-1-1',
            path: '/system/user/list',
            icon: 'iconfont icon-kuaidiyuan-xianxing',
            children: []
          },
          {
            title: '用户添加1-1-2',
            path: '/system/user/add',
            icon: 'iconfont icon-kuaidiyuan-xianxing',
            children: []
          }
        ]
      },
      {
        title: '角色管理1-2',
        path: '/system/role',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        children: [
          {
            title: '角色列表1-2-1',
            path: '/system/role/list',
            icon: 'iconfont icon-kuaidiyuan-xianxing',
            children: []
          },
          {
            title: '角色添加1-2-2',
            path: '/system/role/add',
            icon: 'iconfont icon-kuaidiyuan-xianxing',
            children: []
          }
        ]
      },
      {
        title: '菜单管理1-3',
        path: '/system/menu',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        children: []
      }
    ]
  },
  {
    title: '系统管理2',
    path: '/system',
    icon: 'iconfont icon-kuaidiyuan-xianxing',
    id: "2",
    children: [
      {
        title: '用户管理2-1',
        path: '/system/user',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        children: [
          {
            title: '用户列表2-1-1',
            path: '/system/user/list',
            icon: 'iconfont icon-kuaidiyuan-xianxing',
            children: []
          },
          {
            title: '用户添加2-1-2',
            path: '/system/user/add',
            icon: 'iconfont icon-kuaidiyuan-xianxing',
            children: []
          }
        ]
      },
      {
        title: '角色管理2-2',
        path: '/system/role',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        children: []
      },
      {
        title: '菜单管理2-3',
        path: '/system/menu',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        children: []
      }
    ]
  }
]
const direction = ref('horizontal')
const dianji = () => {
  direction.value = 'vertical'
}
const dddddddd = () => {
  direction.value = 'horizontal'
}

</script>