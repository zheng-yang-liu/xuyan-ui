<template>
  <div>
    <xy-classic-page v-model:direction="direction">
      <template #header>
        <el-button @click="dianji">header</el-button>
        <el-button @click="dddddddd">header2</el-button>
        <i class="iconfont icon-kuaidiyuan-xianxing"></i>
      </template>
      <template #aside>
        <div style="background-color: #ffffff;width: 100%;height: 100%">
          <xy-menu-left
            :defaultStyle="true"
            :expandAll="false"
            :menuItems="menuItems"
            @clickItem="clickItem"
          >
          </xy-menu-left>
        </div>
      </template>
      <template #main>
        <div class="mainBox"
             style="background-color: #f6f6f6;width: 100%;height: 100%;padding: 0 10px;overflow: hidden;overflow-y: auto">
          <xy-effect-preview :code="vueComponentString">
            <template #effect>
              <div style="width: 100%;height: 100%;background-color: #ffffff">
                <el-button>按钮</el-button>
              </div>
            </template>
          </xy-effect-preview>
          <xy-attribute-table :data="data"></xy-attribute-table>
          <xy-showcase-page
            :catalogue="catalogue"
            introduction="Divider分割线"
            pageTitle="区隔内容的分割线"
          >
            <template #pageExplain>
              <div class="nnnnnnnSlot">自定义插槽内容</div>
            </template>
            <template #basicUsage>
              <div class="nnnnnnnSlot">基础用法</div>
            </template>
            <template #setWords>
              <div class="nnnnnnnSlot">设置文案</div>
            </template>
            <template #props>
              <div class="nnnnnnnSlot">props</div>
            </template>
            <template #slots>
              <div class="nnnnnnnSlot">slots</div>
            </template>
            <template #slotsname>
              <div class="nnnnnnnSlot">slotsname</div>
            </template>
          </xy-showcase-page>
        </div>
      </template>
    </xy-classic-page>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import vueComponentString from "@/views/codeTest";
const catalogue = [
  {
    name:'基础用法',
    explain:'基础用法',
    slot: 'basicUsage',
  },
  {
    name:"设置文案",
    explain:["可以在分割线上自定义文本内容","测试多个P元素"],
    slot: 'setWords',
  },
  {
    name:"API",
    children:[
      {
        name:"Props",
        explain:"Divider 分割线的属性",
        slot:'props',
        children:[
          {
            name:"name",
            explain:"名称",
            type:"string",
            slot:'slotsname'
          },
          {
            name:"age",
            explain:"年龄",
            type:["number","array","array","array"]
          },
          {
            name:"address",
            explain:"地址",
            type:["address"]
          }
        ]
      },
      {
        name:"Slots",
        explain:"Divider 分割线的插槽",
        slot:'slots'
      }
    ]
  }
]
const menuItems = [
  {
    title: '工具函数',
    id: '2',
    icon: 'iconfont icon-donghua',
    children: [
      {
        title: '图标动画',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        id: '2-1',
        children: [
          {
            title: 'svg动画',
            id: '2-1-1',
            icon: 'iconfont icon-dian',
            children: [
              {
                title: 'svg描边',
                id: '2-1-1-1',
                icon: 'iconfont icon-kuaidiyuan-xianxing',
                children: [
                  {
                    title: 'svg白的描边',
                    path: '/svgAnimation',
                    id: '2-1-1-1-1',
                  },
                  {
                    title: 'svg黑的描边',
                    path: '/system/user/list',
                    icon: 'iconfont icon-dian',
                    id: '2-1-1-1-2',
                  }
                ]
              },
              {
                title: 'svg填充',
                icon: 'iconfont icon-kuaidiyuan-xianxing',
                id: '2-1-1-2',
                children: [
                  {
                    title: 'svg白的填充',
                    id: '2-1-1-2-1',
                    icon: 'iconfont icon-dian',
                    path: '/system/user/list',
                  },
                  {
                    title: 'svg黑的填充',
                    id: '2-1-1-2-2',
                    icon: 'iconfont icon-dian',
                    path: '/system/user/add',
                  }
                ]
              }
            ]
          },
          {
            title: 'canvas动画',
            path: '/system/user/add',
            id: '2-1-2',
          }
        ]
      },
      {
        title: '防抖函数',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        id: '2-2',
        children: [
          {
            title: '节流',
            path: '/system/role/list',
            icon: 'iconfont icon-dian',
            id: '2-2-1',
          },
          {
            title: '防抖',
            path: '/system/role/add',
            icon: 'iconfont icon-dian',
            id: '2-2-2',
          }
        ]
      },
      {
        title: '深拷贝',
        path: '/system/menu',
        id: '2-3',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
      },

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
        children: [
          {
            title: 'string',
            id: '3-1-1',
            path: '/system/user/list',
            icon: 'iconfont icon-dian'
          },
          {
            title: 'number',
            path: '/system/user/add',
            icon: 'iconfont icon-dian'
          }
        ]
      },
      {
        title: 'object',
        path: '/system/menu',
        icon: 'iconfont icon-kuaidiyuan-xianxing',
        id: '3-2',
      }
    ]
  },
]
const direction = ref('horizontal')
const dianji = () => {
  direction.value = 'vertical'
}
const dddddddd = () => {
  direction.value = 'horizontal'
}
const selectStyle = {
  backgroundColor: '#417ff2',
  color: '#ffffff'
}
const itemStyle = {
  backgroundColor: '#f9f9fc',
  color: '#2c2c2c',
  border: '1px solid #e8e8e8'
}
const codeTest =
  `console.log("hello world");
let name = '张三';
`

const clickItem = (item) => {
  console.log(item)
}
const data = [
  {
    name: 'name',
    explain: '名称',
    type: 'string'
  },
  {
    name: 'age',
    explain: '年龄',
    type: [{value: "number"},{value: 'array', complexType: 'object[]'},{value: 'array', complexType: 'object[]'},{value: 'array', complexType: 'object[]'}]
  },
  {
    name: 'address',
    explain: '地址',
    type: [{value: 'address', complexType: "'beijing' | 'shanghai' | 'sichuan' | 'beijing' | 'shanghai' | 'sichuan'"}],
  }
]
</script>

<style lang="scss" scoped>
.mainBox {
  background-color: red;
}

@include scrollbar()
</style>