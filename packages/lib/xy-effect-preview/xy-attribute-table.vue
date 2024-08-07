<template>
  <div class="attribute-box" ref="attributeBox">
    <template v-for="(item,index) in columnsCH" :key="index">
      <div class="attribute-columns cells">{{item.name}}</div>
    </template>
    <template v-for="(item,index) in data" :key="index">
      <template v-for="(itemColumns,index) in columnsCH" :key="itemColumns.key">
        <div
          class="attribute-line cells"
          v-if="itemColumns.key!=='type'"
        >
          <p
            class="explain"
            v-html="setCodeP(item[itemColumns.key]?item[itemColumns.key]:'-')"
          ></p>
        </div>

        <div
          class="attribute-line cells"
          v-else-if="typeof(item[itemColumns.key])!=='string'"
          style="display: inline-block"
        >
          <div style="width: 100%;height: 100%;display: flex;align-items: center;flex-wrap: wrap;">
            <template
              v-for="(itemType,indexType) in item[itemColumns.key]"
              :key="indexType"
            >
              <div
                v-if="itemColumns"
                :key="indexType"
                :class="`attribute-type${indexType}`"
                :style="{display: 'inline-block',marginBottom:'5px'}"
              >
                <span v-if="indexType!==0" style="margin: 0 5px">/</span>
                <xy-code :code="itemType.value"></xy-code>
                <xyTooltip
                  v-if="showComplexType(itemType.value)"
                  :hoverShow="false"
                  :XOffset="promptXOffset"
                  :topOffset="promptTopOffset">
                    <i class="iconfont icon-zhuyi"></i>
                  <template #prompt>
                    <div class="complexType">{{itemType.complexType}}</div>
                  </template>
                </xyTooltip>
              </div>
            </template>
          </div>

        </div>
        <div class="attribute-line cells" v-else style="display: flex;align-items: center">
          <xy-code :code="item[itemColumns.key]"></xy-code>
          <xyTooltip
            v-if="showComplexType(item[itemColumns.key])"
            :hoverShow="false"
            :XOffset="promptXOffset"
            :topOffset="promptTopOffset">
              <i class="iconfont icon-zhuyi"></i>
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
import {defineComponent,PropType,ref,onMounted,h} from 'vue'
import {dataType} from "./effect.type"
import xyTooltip from "../xy-tooltip/xy-tooltip.vue";
import xyCodePreview from "./xy-code-preview.vue";
import xyCode from "./xy-code.vue";
import XyCode from "./xy-code.vue";
export default defineComponent({
  name: "xy-attribute-table",
  props: {
    data: {
      type: Array as PropType<dataType[]>,
      default: () => []
    },
    promptTopOffset: {
      type: Number,
      default: 5
    },
    promptXOffset: {
      type: Number,
      default: 0
    },
    columnsNoDefault:{
      type:Boolean,
      default:false
    }
  },
  components: {
    XyCode,
    xyCodePreview,
    xyTooltip
  },
  setup(props, context) {
    const basicType = ['string','number','boolean','undefined','null','symbol','bigint']
    const showComplexType = (type:string):boolean=>{
      return !basicType.includes(type)
    }
    const columns = [
      {
        name: '属性名',
        key: 'name',
        width: '1fr'
      },
      {
        name: '说明',
        key: 'explain',
        width: '2fr'
      },
      {
        name: '类型',
        key: 'type',
        width: '1.2fr'
      },
      {
        name: 'Default',
        key: 'default',
        width: '1fr'
      }
    ]
    const columnsCH = props.columnsNoDefault?columns.filter(item=>item.key!=='default'):columns;
    const attributeBox = ref<HTMLElement | null>(null);
    const initGridColumns = ()=>{
      let gridColumns = '';
      columnsCH.forEach((item)=>{
        gridColumns += `${item.width} `
      })
      if(attributeBox.value) {

        attributeBox.value.style.gridTemplateColumns = gridColumns
      }
    }
    const setCodeP = (text)=>{
      return text.replace(/`([^`]+)`/g,`<code>$1</code>`)
    }
    onMounted(()=>{
      initGridColumns();
    })
    return {
      showComplexType,
      attributeBox,
      columnsCH,
      setCodeP
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";
.attribute-box{
  background-color: #fff;
  display: grid;
  font-size: 14px;
  .cells{
    border-bottom: 1px solid #d8d8d8;
    min-height: 40px;
    @include display-flex(center);
    padding: 5px 10px;
    width: 100%;
    height: 100%;
  }
  .attribute-columns{
    font-weight:600;
  }
  .attribute-line{
    .explain{
      line-height: 23px;
      ::v-deep(code){
        background-color: #f5f7fa;
        padding: 3px 6px;
        border-radius: 5px;
        font-weight: 600;
      }
    }
    i{
      &:hover{
        color: #3c9cff;
        cursor: pointer;
      }
    }
    .complexType{
      padding: 4px 8px;
      background-color: #f5f7fa;
      border-radius: 5px;
      color: #0c61c9;
        font-size: 14px;
      }
  }
}

</style>