<template>
  <div>
    <xy-classic-page v-model:direction="direction">
      <template #header>
        <el-button @click="dianji">header</el-button>
        <el-button @click="dddddddd">header2</el-button>
        <i class="iconfont icon-kuaidiyuan-xianxing"></i>
        <xy-icon icon="fuzhi" @click="dianjitwo"></xy-icon>
        <xy-dialog
          v-model:visible="dialogVie"
          :defaultBottom="false"
          :drag="false"
          :dragRange="false"
          :escClose="false"
        >
          去微软推
          <template #footer>
            <xy-button @click="cancel">取消w</xy-button>
            <xy-button style="margin-left: 10px" type="primary" @click="confirm">确定</xy-button>
          </template>
        </xy-dialog>
      </template>
      <template #aside>
        <div style="background-color: #ffffff;width: 100%;height: 100%">
          <xy-menu-left
            :expandAll="false"
            :isTheHeightSet="true"
            :menuItems="menuItems"
          >
            <!--            <template #logo>-->
            <!--              <div style="height: 40px;width: 100%;background-color: red"></div>-->
            <!--            </template>-->
          </xy-menu-left>
        </div>
      </template>
      <template #main>
        <div class="mainBox"
             style="background-color: #f6f6f6;width: 100%;height: 100%;padding: 0 10px;overflow: hidden;overflow-y: auto">
<!--          <xy-menu-catalog :catalogue="catalogue" @clickItem="catalogueClickItem"></xy-menu-catalog>-->
          <testInput></testInput>
          <xy-effect-preview :code="vueComponentString">
<!--            <preIcon></preIcon>-->
            <testInput></testInput>
          </xy-effect-preview>
          <xy-attribute-table :columnsNoDefault="false" :data="data"></xy-attribute-table>
          <div style="width: 100%;height: 1000px;background-color: red">
            <div style="width: 100%;height: 100px;background-color: #e0f0ff"></div>
            <div style="width: 100%;height: 100px;background-color: white"></div>
            <div style="width: 100%;height: 100px;background-color: black"></div>
            <div style="width: 100%;height: 100px;background-color: #fae7e7"></div>
            <div style="width: 100%;height: 100px; background-color: green;position: sticky;bottom: 0"></div>
          </div>

          <xy-showcase-page
            :catalogue="catalogue"
            :showCatalogue="true"
            introduction="Divider分割线"
            pageTitle="区隔内容的分割线"
          >
            <template #pageExplain>44444444444444444444</template>
            <template #basicUsage>
              <div class="nnnnnnnSlot">基础用法qqq</div>
              <xy-tooltip content="这是一段被隐藏的文字" :hover-show="false">
                <p>显示更多</p>
              </xy-tooltip>
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
import preIcon from "./preIcon.vue"
import testInput from "@/views/testInput.vue";

const catalogue = [
  {
    title: '基础用法',
    explain: '基础用基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法基础用法法',
    slot: 'basicUsage',
    id: "4af1215ffa45b8245f055eb676fd6970",
  },
  {
    title: "设置文案",
    explain: ["可以在分割线上自定义文本内容", "测试多个P元素"],
    slot: 'setWords',
    id: 'ffb11a4fb28c94c976acf9cf672be273',
  },
  {
    title: "API",
    id: 'db974238714ca8de634a7ce1d083a14f',
    children: [
      {
        title: "Props",
        explain: "Divider 分割线的属性",
        slot: 'props',
        id: '9ad963167cc06bd9873a2821497492cd',
        children: [
          {
            title: "name",
            explain: "名称",
            type: "string",
            slot: 'slotsname',
            id: 'b068931cc450442b63f5b3d276ea4297',
          },
          {
            title: "age",
            explain: "年龄",
            type: ["number", "array", "array", "array"],
            id: "7d637d275668ed6d41a9b97e6ad3a556"
          },
          {
            title: "address",
            explain: "地址",
            type: ["address"],
            id: "884d9804999fc47a3c2694e49ad2536a"
          }
        ]
      },
      {
        title: "Slots",
        explain: "Divider 分割线的插槽",
        slot: 'slots',
        id: 'f573ad6f99732daf89b2f9dd79ba77e0'
      }
    ]
  }
]
const menuItems = [
  {
    title: '组件预览',
    id: '7ee90288e34fa07d8b0cde520d152ddf',
    icon: 'iconfont icon-donghua',
    children: [
      {
        title: '基础组件预览',
        id: 'f0f40927fb775042ec340c68d85d3cd9',
        path: '/component/componentPreview',
        children: [
          {
            title: '按钮',
            id: 'bc039873416411b993abded52050266c',
            path: '/component/componentPreview',
          },
          {
            title: '图标',
            id: 'sdfgxgjhghgfdfgkjhgfd66666',
            path: '/component/componentPreview',
          }

        ]
      },
      {
        title: '数据组件预览',
        id: 'b3eda810068053e4189e00c61b000888',
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
  }
]

const menuItemswewe = [
  {
    title: '地球',
    id: '1f02f411cf025aad163e96e6abbfa402',
    path: "",
    icon: 'iconfont icon-donghua',
  },
  {
    title: "河北省",
    icon: 'iconfont icon-kuaidiyuan-xianxing',
    children: [
      {
        title: "石家庄市",
        id: "7fdcacc36de34c4bca82db93fb9415bd",
        path: "",
        icon: 'iconfont icon-dian',
      },
      {
        title: "唐山市",
        id: "d6c0bb03d361ae960ccffe9dbb51989d",
        path: "",
        icon: 'iconfont icon-kuaidiyuan-zhuyi',
      },
      {
        title: "秦皇岛市",
        id: "ddb69689fd8964547edbdc82730573e9",
        icon: 'iconfont icon-kuaidiyuan-fuzhi',
        path: "",
      }
    ]
  },
  {
    title: "山西省",
    children: [
      {
        title: "太原市",
        id: "45bb8d54c3f987f413c4e489908bc181",
        path: "",
        icon: 'iconfont icon-kuaidiyuan-zhankai',
      },
      {
        title: "大同市",
        id: "155f872ef336eec2c5f2ee0460a1a3fb",
        path: "",
        icon: 'iconfont icon-kuaidiyuan-xiaogongju',
      }
    ]
  }
]
const direction = ref< "horizontal" | "vertical">('horizontal')
const menuLeftStyle = {
  borderRight: '1px solid #e8e8e8'
}
const dianjitwo = () => {
  console.log('ppppppp')
}
const dianji = () => {
  console.log('dianji1')
}
const dianji2 = () => {
  console.log('dianji2')
}
const dialogVie = ref(false)
const dddddddd = () => {
  direction.value = 'horizontal';
  dialogVie.value = true
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
const catalogueClickItem = (item) => {
  console.log(item)
}

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
    type: [
      {
        value: "object",
        complexType: `{
          autoIndent: boolean,
          indentValue: number,
          currentIndent: number
        }`
      },
      {
        value: "object",
        complexType: `{
          autoIndent: boolean,
          indentValue: number,
          currentIndent: number
        }`
      }
    ],
    default: `{
      autoIndent: true,
      indentValue: 10,
      currentIndent: 0
    }`
  },
  {
    name: 'address',
    explain: '地址',
    type: [{value: 'address', complexType: "'beijing' | 'shanghai' | 'sichuan' | 'beijing' | 'shanghai' | 'sichuan'"}],
  }
]

const cancel = () => {
  dialogVie.value = false
}
const confirm = () => {
  dialogVie.value = false
}

const confirmCallback = () => {

  console.log('confirmCallback')
  return false;
}

</script>

<style lang="scss" scoped>

@import "@/assets/base.scss";

.mainBox {
  background-color: red;
}

@include scrollbar()
</style>