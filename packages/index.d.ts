import {formatDateNum} from './types/tools'
/**
 * 安装插件到Vue应用中
 * @param app Vue应用实例
 * @returns 无返回值
 */
export declare const install: (app: import("vue").App<any>) => void;

/**
 * 工具类集合
 */
export declare const Tools: {
  /**
   * 转换时间格式
   * @param format 时间格式
   * @param date 时间  formatDate对象 | Date对象 | 时间戳
   * @returns 返回一个字符串，格式为对应的时间格式
   */
  convertTimeFormat :(format:string,date:formatDateNum|Date|number)=>string;
  /**
   * 数组分类函数
   * @param array 需要分类的数组
   * @param rules 分类规则
   * @returns 返回一个对象，包含分类后的数组
   */
  groupBy:(array:object[], rules: string | Function)=>object|{true:[],false:[]};
  /**
   * 数字动画函数
   * @param duration 动画持续时间 ms
   * @param from 起始值
   * @param to 结束值
   * @param callback 回调函数
   */
  figureAnimate:(duration:number, from:number, to:number, callback:Function)=>void;
  /**
   * 深拷贝
   * @param data 需要拷贝的元素
   * @returns  深拷贝后的元素
   */
  deepCopy:(data:Array<any>|object)=>Array<any>|object;
  /**
   * 更具key数组去重
   * @param array 需要去重的数组
   * @param key 去重的key
   * @returns  {*}
   */
  accordingToKeyUnique:(array:Array<any>, key?:string)=>Array<any>;
  /**
   * 防抖函数
   * @param fn 需要防抖的函数
   * @param delay 防抖时间
   */
  debounce:(fn:Function, delay:number)=>Function;
  /**
   * base64转file
   * @param urlData base64数据
   * @param fileName 文件名
   * @returns  返回一个file对象
   */
  base64ToFile:(urlData:string, fileName:string='test.png')=>File;
  /**
   * file转base64
   * @param file file对象
   * @param callBack 回调函数
   */
 fileToBase64:(file:File,callBack)=>void;
};