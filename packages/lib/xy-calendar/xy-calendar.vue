<template>
  <div :style="{width:width+'px'}" class="calendar" :class="[showOutsideBorder?'showOutsideBorder':'']">
    <div class="calendarTop" v-if="showTop">
      <img src="../../assets/icon/previous.png" @click="previous" alt=""/>
      <div>{{currentYear}}年{{currentMonth+1}}月</div>
      <img src="../../assets/icon/next.png" @click="nextMonth" alt=""/>
      <div class="returnNow" @click="returnNow" v-show="!ifToday">
        <img src="../../assets/icon/return.png" alt=""/>
        <span>返回今天</span>
      </div>
    </div>
    <template v-for="item in calendarTitle" :key="item">
      <div class="calendarTitle"
           :style="{minHeight:minHeight/2+'px'}"
      >{{`周${item}`}}</div>
    </template>
    <template v-for="(item,index) in dateListItem" :key="index">
      <div class="calendarDay"
           :style="{minHeight:minHeight+'px'}"
           :class="[item.date === baseDate ? 'baseFontColor':'',
              item.date === currentDate&&item.ifCurrentMonth ? 'currentDate' : '',
              item.ifCurrentMonth?'':'noCurrentMonth']"
           @click="changeDate(item)"
      >
        <div>{{item.day}}</div>
        <div>{{item.content}}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,computed,watch,reactive,toRefs} from 'vue'
import {createCalendar,convertTimeFormat} from "../../Utils/Tools"
import {dateListItemType,dayContentType} from "../../types/tools";


export default defineComponent({
  name: "xy-calendar",
  props: {
    //是否区分不同月份
    ifDivisionMonth:{
      type: Boolean,
      default: true
    },
    //是否星期一开始
    startDayOfMonday:{
      type: Boolean,
      default: true
    },
    width:{
      type:Number,
      default: 500
    },
    minHeight:{
      type:Number,
      default: 80
    },
    dayContent:{
      type: Array as () => dayContentType[],
      default: ()=>[]
    },
    showTop:{
      type: Boolean,
      default: true
    },
    showOutsideBorder:{
      type: Boolean,
      default: false
    }
  },
  emits:['changeDate'],
  setup(props, context) {
    const tempDate = new Date();
    const state = reactive({
      dateListItem:[] as dateListItemType[],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDate(),
      currentDate:convertTimeFormat("YYYY-MM-DD",{
        year:tempDate.getFullYear(),
        month:tempDate.getMonth()+1,
        day:tempDate.getDate()
      }),
      ifToday: true,
      ifCurrentMonth: true
    })
    const baseDate = convertTimeFormat("YYYY-MM-DD",{
      year:tempDate.getFullYear(),
      month:tempDate.getMonth()+1,
      day:tempDate.getDate()
    })

    const calendarTitle = computed(()=>{
      initCalendar();
      return props.startDayOfMonday ? ['一','二','三','四','五','六','日'] : ['日','一','二','三','四','五','六'];
    })

    const initCalendar = () =>{
      state.dateListItem = createCalendar(state.currentYear,state.currentMonth,props.dayContent,props.startDayOfMonday)
    }
    watch(()=>[state.currentYear,state.currentMonth],()=>{
      initCalendar();
    })
    const changeDate = (item:dateListItem) =>{
      if(!item.ifCurrentMonth)return;
      state.currentDate = item.date;
      context.emit('changeDate',item);
      state.ifToday = item.date === baseDate;
    }
    const returnNow = () => {
      state.currentDate = baseDate;
      state.ifToday = true;
      if(!state.ifCurrentMonth){
        state.currentYear = new Date().getFullYear();
        state.currentMonth = new Date().getMonth();
        state.ifCurrentMonth = true;
        initCalendar();
      }
    }
    const previous = () =>{
      if(state.currentMonth === 0){
        state.currentYear -= 1;
        state.currentMonth = 11;
      }else{
        state.currentMonth -= 1;
      }
      state.ifToday = false;
      state.ifCurrentMonth = false;
      initCalendar();
    }
    const nextMonth = () =>{
      if (state.currentMonth === 11) {
        state.currentYear += 1;
        state.currentMonth = 0;
      } else {
        state.currentMonth += 1;
      }
      state.ifToday = false;
      state.ifCurrentMonth = false;
      initCalendar();
    }

    onMounted(()=>{
      initCalendar();
    })
    return {
      ...toRefs(state),
      calendarTitle,
      changeDate,
      returnNow,
      previous,
      nextMonth,
      baseDate
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";
$iconSize:15px;
.showOutsideBorder{
  border: 1px solid #ccc;
}
.calendar{
  display:grid;
  grid-template-columns: repeat(7,1fr);
  .calendarTop{
    @include flexCenter;
    grid-column-start: span 7;
    min-height: 50px;
    border-bottom: 1px solid #ccc;
    position:relative;
    .returnNow{
      @include flexCenter;
      position: absolute;
      right: 10px;
      &:hover{
        cursor: pointer;
      }
    }
    img{
      width: $iconSize;
      height: $iconSize;
      padding : 0 5px;
      cursor:pointer;
    }
  }
  .calendarTitle{
    @include flexCenter;
  }
  .calendarDay{
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    &:hover{
      cursor: pointer;
    }
  }
  .baseFontColor{
    color:#3c9cff;
  }
  .currentDate{
    background-color: #3c9cff;
    color: #fff;
    border-radius:10px;
  }
  .noCurrentMonth{
    color: #ccc;
  }
}
</style>