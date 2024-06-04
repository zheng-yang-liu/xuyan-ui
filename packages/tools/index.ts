import {
  dateListItem,
  dayContent,
  formatDateNum,
  formatDateStr,
  } from "../types/tools";
/*
  *获取某日期所在月份的日历天数
  *@param year 年份
  *@param month 月份
  * @param dayContent 日期内容
  *@param startDayOfMonday 是否以星期一开始，true为星期一开始，false为星期日开始
  *@returns 返回一个数组，包含当前月份的日历天数
  */
export const createCalendar = (
  year: number,
  month: number,
  dayContent: dayContent[] = [],
  startDayOfMonday: boolean = true
): dateListItem[] => {
  //当前月有多少天
  const daysInMonth:number = new Date(year, month + 1, 0).getDate();//下个月的第0天就是这个月的最后一天
  //上个月显示的天数
  const startDayOfWeek: 1|0 = startDayOfMonday ? 1 : 0;
  const monthStartOfWeek:number = new Date(year, month, 1).getDay();
  const daysInPrevMonth:number = new Date(year, month, 0).getDate();
  const prevMonthDays:number = monthStartOfWeek - startDayOfWeek;
  //下个月显示的天数
  const nextMonthDays:number = 42 - prevMonthDays - daysInMonth;

  // 创建一个数组，用于存放日历天数
  let calendar: dateListItem[] = [];
  // 上一个月的最后几天
  for (let i = prevMonthDays; i > 0; i--) {
    calendar.push({
      ifCurrentMonth: false,
      day: daysInPrevMonth - i + 1,
      date: convertTimeFormat("YYYY-MM-DD", {
        year: year,
        month: month,
        day: daysInPrevMonth - i + 1
      })
    });
  }
  // 当前月份的天数
  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({
      ifCurrentMonth: true,
      day: i,
      date: convertTimeFormat("YYYY-MM-DD", {
        year: year,
        month: month + 1,
        day: i
      })
    });
  }
  // 下一个月的前几天
  for (let i = 1; i <= nextMonthDays; i++) {
    calendar.push({
      ifCurrentMonth: false,
      day: i,
      date: convertTimeFormat("YYYY-MM-DD", {
        year: year,
        month: month + 2,
        day: i
      })
    });
  }
  dayContent.forEach((item):void => {
    let index:number = calendar.findIndex((value) => value.date === item.date);
    if (index !== -1) {
      calendar[index].content = item.content;
    }
  })
  return calendar;
}

/**
 * 转换时间格式
 *
 * @param format 时间格式
 * @param date 时间  formatDate对象 | Date对象 | 时间戳
 * @returns 返回一个字符串，格式为对应的时间格式
 * */
export const convertTimeFormat = (format:string,date:formatDateNum|Date|number):string =>{
  //参数归一化=>formatDate对象
  const paramUnify = (date):formatDateStr =>{
    let result:object = {};
    function formatDate(date:Date|number):formatDateStr {
      let result:formatDateStr = { year: null, month: null, day: null, hour: null, minute: null, second: null, };
      function assignment(date:Date):void {
        result.year = String(date.getFullYear());
        result.month = String(date.getMonth() + 1).padStart(2,"0");
        result.day = String(date.getDate()).padStart(2,"0");
        result.hour = String(date.getHours()).padStart(2,"0");
        result.minute = String(date.getMinutes()).padStart(2,"0");
        result.second = String(date.getSeconds()).padStart(2,"0");
      }
      if (typeof (date) === 'object') {//Date对象
        assignment(date);
      } else {//时间戳
        date = typeof (date) === "string" ? parseInt(date) : date;
        assignment(new Date(date));
      }
      return result;
    }
    switch (typeof date) {
      case 'object':
        let flag:boolean = false;
        const key:string[] = ["year", "month", "day", "hour", "minute", "second"]
        for (let i:number = 0; i < key.length; i++) {
          if (key[i] in date) {
            flag = true;
            break;
          }
        }
        if(flag){
          for(const item in date){
            if(item!="year"){
              date[item] = String(date[item]).padStart(2,"0");
            }
          }
          result = date;
        }else{
          result = formatDate(new Date(date));
        }
        break;
      case 'number':
        //转换Date | 时间戳
        result = formatDate(new Date(date));
        break;
    }
    return result;
  }

  const afterConvertDate:formatDateStr = paramUnify(date);
  // 替换格式字符串中的占位符
  return format
    .replace('YYYY', afterConvertDate.year)
    .replace('MM', afterConvertDate.month)
    .replace('M', Number(afterConvertDate.month) < 10 ? afterConvertDate.month[1] : afterConvertDate.month)
    .replace('DD', afterConvertDate.day)
    .replace('D', Number(afterConvertDate.day) < 10 ? afterConvertDate.day[1] : afterConvertDate.day)
    .replace('HH', afterConvertDate.hour)
    .replace('H', Number(afterConvertDate.hour) < 10 ? afterConvertDate.hour[1] : afterConvertDate.hour)
    .replace('mm', afterConvertDate.minute)
    .replace('m', Number(afterConvertDate.minute) < 10 ? afterConvertDate.minute[1] : afterConvertDate.minute)
    .replace('ss', afterConvertDate.second)
    .replace('s', Number(afterConvertDate.second) < 10 ? afterConvertDate.second[1] : afterConvertDate.second);
}
/**
 * 数组分类函数
 *
 * @param array 需要分类的数组
 * @param rules 分类规则
 * @returns 返回一个对象，包含分类后的数组
 */
export const groupBy = (array:object[], rules: string | Function):object|{true:[],false:[]} =>{
  function paramUnify(rules:Function | string):Function{
    if(typeof rules === "string"){
      return eval(`(item)=>item.${rules}`);
    }
    return rules;
  }
  rules = paramUnify(rules);
  const result:object = {};
  for (const item of array) {
    const key = rules(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
/**
 * 数字动画函数
 *
 * @param duration 动画持续时间 ms
 * @param from 起始值
 * @param to 结束值
 * @param callback 回调函数
 */
export const figureAnimate = (duration:number, from:number, to:number, callback:Function):void=> {
  const speed:number = (to - from) / duration;
  const startTime:number = Date.now();
  let value:number = from;
  function _run():void {
    const now:number = Date.now();
    const time:number = now - startTime;
    if (time >= duration) {
      value = to;
      callback && callback(value);
      return;
    }
    value = from + speed * time;
    callback && callback(value);
    requestAnimationFrame(_run);
  }
  _run();
}
/**
 * 深拷贝
 * @param data 需要拷贝的元素
 * @returns 深拷贝后的元素
 */
export const deepCopy = (data:Array<any>|object):Array<any>|object=>{
  let newData:any = null;
  if(typeof(data) === 'object' && data != null){
    newData = data instanceof Array ? [] : {};
    for( const key in data){
      newData[key] = deepCopy(data[key]);
    }
  }else{
    newData = data;
  }
  return newData;
}
/**
 * 根据key数组去重
 * @param array 需要去重的数组
 * @param key 去重的key
 * @returns  {*}
 */
export const accordingToKeyUnique = (array:Array<any>, key?:string):Array<any>=>{
  let newArray:Array<any> = [],obj:Object = {};
  if(key){
    newArray = array.reduce((preVal:any,curVal:any):any=>{
      obj[curVal[key]] ? "" : obj[curVal[key]] = preVal.push(curVal);
      return preVal;
    },[])
  }else{
    newArray = array.filter((val:any):Boolean=>{
      return obj.hasOwnProperty(typeof val + JSON.stringify(val)) ? false : obj[typeof val + JSON.stringify(val)] = true;
    })
  }
  return newArray;
}
/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 防抖时间
 */
export const debounce = (fn:Function, delay:number):Function=>{
  let timer = null;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(()=>{
      fn.apply(this,args);
    },delay)
  }
}














