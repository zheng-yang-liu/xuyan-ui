import {
  dateListItem,
  dayContent,
  formatDateNum,
  formatDateStr,
  MessageTypes,
  targetListItem
  } from "../types/tools";

import {ElMessage, ElMessageBox, MessageBoxState} from "element-plus";
import type {Action} from 'element-plus';
import {VNode} from "vue"
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
/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param delay 节流时间
 */
export const throttle = (fn:Function, delay:number):Function=>{
  let oldTime:number = Date.now();
  return function(...args){
    let newTime:number = Date.now();
    if(newTime - oldTime >= delay){
      fn.apply(this,args);
      oldTime = newTime;
    }
  }
}
/**
 * base64转file
 * @param urlData base64数据
 * @param fileName 文件名
 * @returns  返回一个file对象
 * */
export const base64ToFile = (urlData:string, fileName:string):File => {
  fileName = fileName || 'test.png';
  let arr:string[] = urlData.split(',');
  let mime:string = arr[0].match(/:(.*?);/)[1];
  let bytes:string = atob(arr[1]); // 解码base64
  let n:number = bytes.length
  let ia:Uint8Array = new Uint8Array(n);
  while (n--) {
    ia[n] = bytes.charCodeAt(n);
  }
  return new File([ia], fileName, { type: mime });
};
/**
 * file转base64
 * @param file file对象
 * @param callBack 回调函数
 * */
export const fileToBase64 = (file:File,callBack):void=> {
  const reader:FileReader = new FileReader();
  reader.onload = (e:ProgressEvent<FileReader>):void => {
    callBack(e.target.result)
  };
  reader.readAsDataURL(file);
}
/**
 * 返回数据类型
 * @param sourceData 源数据
 * @returns 返回数据类型
 */
export const getType = <T>(sourceData: T): string => {
  //toString会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  const map: any = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
    "[object Blob]": "blob",
    "[object FormData]": "formData",
    "[object Promise]": "promise"
  }
  return map[toString.call(sourceData)];
}
/**
 * 显示消息框
 * @param type      消息类型（success / info / warning / error）
 * @param message   消息内容
 * @param offset    消息框距离窗口顶部的偏移量
 * @param duration  显示时间, 毫秒。设为 0 则不会自动关闭
 * @param grouping  合并内容相同的消息，不支持 VNode 类型的消息
 * @param dangerouslyUseHTMLString  是否将 message 属性作为 HTML 片段处理
 */
export const showMsg = (
  type: MessageTypes,
  message: string | VNode,
  offset: number = 60,
  duration: number = 3000,
  grouping: boolean = true,
  dangerouslyUseHTMLString?: boolean
):void => {
  ElMessage({
    type,
    message,
    offset,
    duration,
    grouping,
    dangerouslyUseHTMLString
  })
};
/**
 * 显示确认框
 * @param message                    消息内容
 * @param callback                   若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
 * @param title                      消息标题
 * @param type                       消息类型（success / info / warning / error）
 * @param cancel                     在外部自定义捕获异常时的回调
 * @param distinguishCancelAndClose  是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 Esc 键）进行区分
 * @param showCancelButton           是否显示取消按钮
 * @param showConfirmButton          是否显示确定按钮
 * @param confirmButtonText          确定按钮的文本内容
 * @param cancelButtonText           取消按钮的文本内容
 */
export const showConfirm = (
  message: string,
  callback: Function,
  title?: string,
  type?: MessageBoxState["type"],
  cancel?: Function,
  distinguishCancelAndClose: boolean = false,
  showCancelButton: boolean = true,
  showConfirmButton: boolean = true,
  confirmButtonText: string = "确定",
  cancelButtonText: string = "取消"
):void => {
  ElMessageBox.confirm(message, title ? title : "提示",
    {
      distinguishCancelAndClose: distinguishCancelAndClose,
      showCancelButton: showCancelButton,
      showConfirmButton: showConfirmButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type as MessageBoxState["type"] ? type as MessageBoxState["type"] : "warning"
    },
  ).then(() => {
    callback();
  }).catch((action: Action) => {
    if (cancel) {
      if (action === "cancel") {
        cancel();
        return;
      }
    }
    showMsg("info", "取消操作");
  });
};
/**
 * 消息提示框
 * @param message                    消息内容
 * @param showClose                  MessageBox 是否显示右上角关闭按钮
 * @param title                      消息标题
 * @param type                       消息类型（success / info / warning / error）
 * @param distinguishCancelAndClose  是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 Esc 键）进行区分
 * @param showCancelButton           是否显示取消按钮
 * @param showConfirmButton          是否显示确定按钮
 * @param confirmButtonText          确定按钮的文本内容
 * @param cancelButtonText           取消按钮的文本内容
 * @param callback                   若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
 * @param cancel                     在外部自定义捕获异常时的回调
 */
export const showAlert = (
  message: string,
  showClose: boolean = true,
  title: string = "提示",
  type: MessageBoxState["type"] = "error",
  distinguishCancelAndClose: boolean = false,
  showCancelButton: boolean = false,
  showConfirmButton: boolean = false,
  confirmButtonText: string = "确定",
  cancelButtonText: string = "取消",
  callback: Function,
  cancel?: Function,
):void => {
  ElMessageBox.alert(message, title,
    {
      showClose: showClose,
      distinguishCancelAndClose: distinguishCancelAndClose,
      showCancelButton: showCancelButton,
      showConfirmButton: showConfirmButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type
    },
  ).then(() => {
    callback();
  }).catch((action: Action) => {
    if (cancel) {
      if (action === "cancel") {
        cancel();
        return;
      }
    }
    showMsg("info", "取消操作");
  });
};
/**
 * svg描边动画
 * @param time 动画时间
 * @param lineClassName 类名
 * @param color 颜色
 * @param strokeWidth 线宽
 * @param strokeLinecap 线头样式
 * @param fill 填充
 */
export const svgAnimation = (
  time: number = 2,
  lineClassName: string = ".svgLine",
  color: string = "#000",
  strokeWidth: string = "6",
  strokeLinecap: string = "round",
  fill: string = "none"
): void => {
  // 定义关键帧动画
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
      @keyframes storke {
          to {
              stroke-dashoffset: 0;
          }
      }
  `, styleSheet.cssRules.length);
  const paths = document.querySelectorAll(lineClassName);
  paths.forEach((p: Element, key: number, parent: NodeListOf<Element>) => {
    const path = p as SVGPathElement;
    const l = path.getTotalLength() + 1;
    path.style.stroke = color;
    path.style.strokeWidth = strokeWidth;
    path.style.strokeDasharray = `${l}`;
    path.style.strokeDashoffset = `${l}`;
    path.style.animation = `storke ${time}s forwards`;
    path.style.strokeLinecap = strokeLinecap;
    path.style.fill = fill;
  });
}


/**
 * 列表各项添加深度和位置
 * @param targetList 目标列表
 * @param indentStep 缩进步进值
 * @param initialIndentValue 初始缩进值
 * @param currentPos 当前列表位置
 * @returns 处理后的列表和下一个位置
 */
export const calculateItemDepth = (
  targetList: any[],
  indentStep: number = 1,
  initialIndentValue: number = 2,
  currentPos: number = 0
): {
  nextPos: number;
  updatedList: { [p: string]: any; indentValue: number; children?: any[]; listPosition: number }[]
} => {
  let pos:number = currentPos;

  const updatedList = targetList.map(item => {
    let newItem = {
      ...item,
      indentValue: item.indentValue ? item.indentValue : initialIndentValue,
      listPosition: pos
    };
    pos += 1;

    if (newItem.children) {
      const result = calculateItemDepth(newItem.children, indentStep, initialIndentValue + indentStep, pos);
      // @ts-ignore
      newItem.children = result.updatedList;
      pos = result.nextPos;
    }

    return newItem;
  });

  return { updatedList, nextPos: pos };
};

/**
 * 深度搜索
 * @param dataList 目标数组
 * @param findRules 查找规则
 * @returns 返回一个数组，包含查找到的元素
 */
export const deepLookup = (dataList:Array<any>,findRules:Function)=>{
  let result: Array<any> = [];

  const search = (items: Array<any>) => {
    for (const item of items) {
      if (findRules(item)) {
        result.push(item);
      }
      if (item.children && item.children.length > 0) {
        search(item.children);
      }
    }
  };

  search(dataList);
  return result;
}
/**
 * 复制代码
 * @param codeText 代码文本
 * @param ifShowMsg 是否显示消息
 * @returns 返回一个Promise对象
 */
export const copyText = (codeText:string,ifShowMsg:Boolean=true):Promise<{code:number,message:string}> => {

  return new Promise((resolve, reject)=>{
    if(navigator.clipboard){
      navigator.clipboard.writeText(codeText)
        .then(() => {
          if(ifShowMsg){showMsg('success','代码已复制')}
          resolve({code:200,message:"代码已复制"})
        })
        .catch(err => {
          if(ifShowMsg){showMsg('error','复制失败'+err)}
          resolve({code:401,message:"复制失败"+err})
        });
    }else{
      //Document.execCommand() 方法实现
      const codeElement = document.createElement('pre');
      codeElement.style.position = 'absolute';
      codeElement.style.left = '-9999px';
      codeElement.textContent = codeText;
      document.body.appendChild(codeElement);

      const range = document.createRange();
      range.selectNodeContents(codeElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          if(ifShowMsg){showMsg('success','代码已复制')}
          resolve({code:200,message:"代码已复制"})
        } else {
          if(ifShowMsg){showMsg('error','复制失败')}
          resolve({code:401,message:"复制失败"})
        }
      } catch (err) {
        if(ifShowMsg){showMsg('error','复制失败'+err)}
        resolve({code:401,message:"复制失败"+err})
      }

      document.body.removeChild(codeElement);
      selection.removeAllRanges();
    }
  })
}
/**
 * 改变颜色
 * @param colorValue 16进制颜色值 或 rgb() 或 rgba()
 * @param degree 改变的程度,负数加深颜色、透明度变小；正数颜色变浅、透明度变大
 * @param originally 返回结果和原本类型一致,false时输出16进制颜色值
 * @returns 返回改变后的颜色值
 */
export const changeColor = (colorValue: string, degree: number, originally: boolean = true): string => {
  // 将十六进制颜色值转为 RGB 组件
  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0, a = 1;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    } else if (hex.length === 9) { // #RRGGBBAA 格式
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
      a = parseInt(hex[7] + hex[8], 16) / 255;
    }
    return { r, g, b, a };
  };

  // 将 RGB 组件转为十六进制颜色值
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // 将 RGBA 转为带透明度的十六进制颜色值
  const rgbaToHex = (r: number, g: number, b: number, a: number) => {
    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `${rgbToHex(r, g, b)}${toHex(a)}`;
  };

  // 解析颜色值
  let r, g, b, a = 1;
  let isHex = false;
  let hasAlpha = false;

  if (colorValue.startsWith('#')) {
    isHex = true;
    ({ r, g, b, a } = hexToRgb(colorValue));
    hasAlpha = colorValue.length === 9;
  } else if (colorValue.startsWith('rgb')) {
    const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
    const match = regex.exec(colorValue);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
      if (match[4]) {
        a = parseFloat(match[4]);
        hasAlpha = true;
      }
    }
  } else {
    throw new Error('Invalid color value');
  }

  // 改变颜色组件的值
  const changeColorComponent = (component: number, degree: number) => {
    const newComponent = degree > 0
      ? Math.min(255, component + degree)
      : Math.max(0, component + degree);
    return newComponent;
  };

  // 改变透明度值
  const changeAlpha = (a: number, degree: number) => {
    const newAlpha = degree > 0
      ? Math.min(1, a + degree / 100)
      : Math.max(0, a + degree / 100);
    return newAlpha;
  };

  // 应用颜色和透明度变化
  if (hasAlpha) {
    a = changeAlpha(a, degree);
  } else {
    r = changeColorComponent(r, degree);
    g = changeColorComponent(g, degree);
    b = changeColorComponent(b, degree);
  }

  if (originally) {
    // 如果 originally 为 true,返回与输入类型一致的颜色值
    if (isHex) {
      return hasAlpha ? rgbaToHex(r, g, b, a) : rgbToHex(r, g, b);
    } else {
      return hasAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }
  } else {
    // 如果 originally 为 false,返回十六进制颜色值,带有透明度
    return hasAlpha ? rgbaToHex(r, g, b, a) : rgbToHex(r, g, b);
  }
};







































