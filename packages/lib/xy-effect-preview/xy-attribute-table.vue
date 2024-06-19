<template>
  <div class="attribute-box">
    <template v-for="(item,index) in columns" :key="index">
      <div class="attribute-columns cells">{{item.name}}</div>
    </template>
    <template v-for="(item,index) in data" :key="index">
      <template v-for="(itemColumns,index) in columns" :key="itemColumns.key">
        <div class="attribute-line cells" v-if="itemColumns.key!=='type'">
          {{item[itemColumns.key]?item[itemColumns.key]:'-'}}
        </div>
        <div class="attribute-line cells" v-else-if="typeof(item[itemColumns.key])!=='string'">
          <tamplate
            v-for="(itemType,indexType) in item[itemColumns.key]"
            v-if="itemColumns"
            :key="indexType"
            style="display: flex;align-items: center"
          >
            <span v-if="indexType!==0" style="margin: 0 5px">/</span>
            <code>{{itemType.value}}</code>
            <xyTooltip v-if="showComplexType(itemType.value)"
                       :hoverShow="false"
                       :XOffset="promptXOffset"
                       :topOffset="promptTopOffset">
              <template #display>
                <i class="iconfont icon-zhuyi"></i>
              </template>
              <template #prompt>
                <div class="complexType">{{itemType.complexType}}</div>
              </template>
            </xyTooltip>

          </tamplate>
        </div>
        <div class="attribute-line cells" v-else style="display: flex;align-items: center">
          <code>{{item[itemColumns.key]}}</code>
          <xyTooltip v-if="showComplexType(item[itemColumns.key])"
                     :hoverShow="false"
                     :XOffset="promptXOffset"
                     :topOffset="promptTopOffset">
            <template #display>
              <i class="iconfont icon-zhuyi"></i>
            </template>
            <template #prompt>
              <div class="complexType">{{item[itemColumns.key]}}</div>
            </template>
          </xyTooltip>
        </div>
      </template>
    </template>

  </div>
</template>

<script lang="ts">
import {defineComponent,PropType} from 'vue'
import {columns,data} from "./effect.type"
import xyTooltip from "../xy-tooltip/xy-tooltip.vue";
import xyCodePreview from "./xy-code-preview.vue";
export default defineComponent({
  name: "xy-attribute-table",
  props: {
    columns: {
      type: Array as PropType<columns[]>,
      default: () => [
        {
          name: '属性名',
          key: 'name',
        },
        {
          name: '说明',
          key: 'explain',
        },
        {
          name: '类型',
          key: 'type',
        },
        {
          name: 'Default',
          key: 'default',
        }
      ]
    },
    data: {
      type: Array as PropType<data[]>,
      default: () => []
    },
    promptTopOffset: {
      type: Number,
      default: 5
    },
    promptXOffset: {
      type: Number,
      default: 0
    }
  },
  components: {
    xyCodePreview,
    xyTooltip
  },
  setup(props, context) {
    const basicType = ['string','number','boolean','undefined','null','symbol','bigint']
    const showComplexType = (type:string):boolean=>{
      return !basicType.includes(type)
    }
    return {
      showComplexType
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";
.attribute-box{
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  .cells{
    border-bottom: 1px solid #d8d8d8;
    min-height: 40px;
    @include display-flex(center);
    padding: 5px 10px;
    width: 100%;
    height: 100%;
  }
  .attribute-columns{
    font:{
      weight:600;
    }
  }
  .attribute-line{
    code{
      background-color: #f5f7fa;
      padding: 3px 6px;
      border-radius: 5px;
      margin-right: 5px;
    }
    i{
      &:hover{
        color: #3c9cff;
        cursor: pointer;
      }
    }
    .complexType{
    padding: 0 10px;
    background-color: #f5f7fa;
    border-radius: 5px;
    color: #0c61c9;
      font-size: 14px;
    }
  }
}
</style>