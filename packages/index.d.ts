import {formatDateNum, MessageTypes} from './types/tools'
import {MessageBoxState} from "element-plus";
import {VNode,DefineComponent } from "vue"
import{
  animationItem,
  animationCriticalItem,
  rangeTargetID,
  framesConfig,
  animationRangeItem
}from"./types/pageAnimation"
/**
 * 安装插件到Vue应用中
 * @param app Vue应用实例
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
  convertTimeFormat: (format: string, date: formatDateNum | Date | number) => string;
  /**
   * 数组分类函数
   * @param array 需要分类的数组
   * @param rules 分类规则
   * @returns {object | { true: [], false: [] }}返回一个对象，包含分类后的数组
   */
  groupBy: (array: object[], rules: string | Function) => object | { true: [], false: [] };
  /**
   * 数字动画函数
   * @param duration 动画持续时间 ms
   * @param from 起始值
   * @param to 结束值
   * @param callback 回调函数
   */
  figureAnimate: (duration: number, from: number, to: number, callback: Function) => void;
  /**
   * 深拷贝
   * @param data 需要拷贝的元素
   * @returns  {Array<any> | object}深拷贝后的元素
   */
  deepCopy: (data: Array<any> | object) => Array<any> | object;
  /**
   * 更具key数组去重
   * @param array 需要去重的数组
   * @param key 去重的key
   * @returns  {Array<any>}
   */
  accordingToKeyUnique: (array: Array<any>, key?: string) => Array<any>;
  /**
   * 防抖函数
   * @param fn 需要防抖的函数
   * @param delay 防抖时间
   */
  debounce: (fn: Function, delay: number) => Function;
  /**
   * base64转file
   * @param urlData base64数据
   * @param fileName 文件名
   * @returns  {File}返回一个file对象
   */
  base64ToFile: (urlData: string, fileName: string = 'test.png') => File;
  /**
   * file转base64
   * @param file file对象
   * @param callBack 回调函数
   */
  fileToBase64: (file: File, callBack) => void;
  /**
   * 显示消息框
   * @param type      消息类型（success / info / warning / error）
   * @param message   消息内容
   * @param offset    消息框距离窗口顶部的偏移量
   * @param duration  显示时间, 毫秒。设为 0 则不会自动关闭
   * @param grouping  合并内容相同的消息，不支持 VNode 类型的消息
   * @param dangerouslyUseHTMLString  是否将 message 属性作为 HTML 片段处理
   */
  showMsg: (
    type: MessageTypes,
    message: string | VNode,
    offset: number = 60,
    duration: number = 3000,
    grouping: boolean = true,
    dangerouslyUseHTMLString?: boolean
  ) => void;
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
  showConfirm: (
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
  ) => void;
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
  showAlert: (
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
  ) => void;
  /**
   * svg动画
   * @param time 动画时间
   * @param lineClassName 类名
   * @param color 颜色
   * @param strokeWidth 线宽
   * @param strokeLinecap 线头样式
   * @param fill 填充
   */
  svgAnimation: (
    time: number = 2,
    lineClassName: string = ".svgLine",
    color: string = "#000",
    strokeWidth: string = "5",
    strokeLinecap: string = "round",
    fill: string = "none"
  ) => void;
  /**
   * 返回数据类型
   * @param sourceData 源数据
   */
  getType: <T>(sourceData: T) => string;
  /**
   * 列表各项添加深度
   * @param targetList 目标列表
   * @param indentStep 缩进步进值
   * @param initialIndentValue 初始缩进值
   * */
  calculateItemDepth: (
    targetList: any[],
    indentStep: number = 1,
    initialIndentValue: number = 2
  ) => any[];
  /**
   * 深度搜索
   * @param dataList 目标数组
   * @param findRules 查找规则
   * @returns {Array<any>}返回一个数组，包含查找到的元素
   */
  deepLookup: (dataList: Array<any>, findRules: Function) => Array<any>;
  /**
   * 节流函数
   * @param fn 需要节流的函数
   * @param delay 节流时间
   */
  throttle:(fn:Function, delay:number)=>Function;
  /**
   * 复制代码
   * @param text 文本
   * @param ifShowMsg 是否显示消息
   * @returns {Promise<{code:number,message:string}>}返回一个Promise对象 code=200成功，code=100失败
   */
  copyText:(text:string,ifShowMsg:Boolean=true)=>Promise<{code:number,message:string}>
  /**
   * 改变颜色
   * @param colorValue 16进制颜色值 或 rgb() 或 rgba()
   * @param degree 改变的程度,负数加深颜色/透明度变小；正数颜色变浅/透明度变大
   * @param originally 返回结果和原本类型一致,false时输出16进制颜色值
   * @returns 返回改变后的颜色值
   */
  changeColor:(colorValue: string, degree: number, originally: boolean = true)=>string;
  /**
   * 区间随机整数
   * @param min 最小值
   * @param max 最大值
   * @returns {number}返回一个随机整数
   */
  randomInterval:(min,max) => number;
};

/**
 * 动画类集合
 */
export declare const AnimationUtils: {
  /**
   * 公共监听设置动画函数
   * @param observerId 需要进行监听交叉操作的元素ID
   * @param elementIDList 需要操作的元素id
   * @param currentPlatingElement 当前页面的id和根元素id(app)
   * @param animationList 需要操作的元素的配置
   * @param animationCriticalList 需要操作的元素的临界值配置
   */
   animationObserver(
    observerId: string,
    elementIDList: string[],
    currentPlatingElement: rangeTargetID,
    animationList: animationItem[],
    animationCriticalList?: animationCriticalItem[]
  ): void;

  /**
   * 生成animationList的config
   * @param animationList 动画配置列表 -- 均匀变化
   * @param framesConfigs 动画帧配置列表
   * @param animationRange 动画帧范围
   * @return NewanimationList 完善后的动画配置列表
   */
   setAnimationListConfig(
    animationList: animationItem[],
    framesConfigs: framesConfig,
    animationRange: animationRangeItem
  ): animationItem[];
};

