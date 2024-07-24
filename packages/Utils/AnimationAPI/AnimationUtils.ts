import {
  criticalElement,
  criticalConfig,
  setFrameProperties,
  animationItem,
  animationCriticalItem,
  framesConfig,
  animationRangeItem,
  rangeTargetID,
  TimingType,
  animationItemSet, numberAnFunction, numberAnimationType
} from "../../types/animationType/pageAnimation"


class AnimationUtils {
  /**
   * 动画操作函数 -- 根据进度操作元素
   * @param el 需要操作的元素
   * @param config 配置动画效果帧
   * @param rate 进度
   *
   */
   animation(el: { elType: string; el: HTMLElement }, config: object, rate: number): void {
    switch (el.elType) {
      case "video":
        if (rate in config) {
          for (const key in config[rate]) {
            el.el[key] = config[rate][key];
          }
        }
        break;
      default:
        if (rate in config) {
          for (const key in config[rate]) {
            el.el.style[key] = config[rate][key];
          }
        }
        break;
    }
  }
  /**
   * 动画操作函数 -- 根据临界值
   * @param el 需要操作的元素
   * @param config 配置动画效果帧
   * @param rate 进度
   */
   animationByCritical(el: criticalElement, config: criticalConfig, rate: number): void {
    const rateState: string = (Boolean(rate > config.critical)).toString();
    switch (rateState) {
      case "true":
        for (const key in config.exceed) {
          el.el.style[config.exceed[key].styleName] = config.exceed[key].value;
        }
        break;
      case "false":
        for (const key in config.noExceed) {
          el.el.style[config.noExceed[key].styleName] = config.noExceed[key].value;
        }
        break;
      default:
        break;
    }
  }
  /**
   * 生成帧
   * @param startFrame 开始帧
   * @param endFrame 结束帧
   * @param properties 需要生成的属性
   * @return frames 生成的帧
   */
   generateFrames(startFrame: number, endFrame: number, properties: setFrameProperties): object {
    let frames: { [key: number]: { [styleName: string]: string | number } } = {};

    for (let i = startFrame; i <= endFrame; i++) {
      const progress = (i - startFrame) / (endFrame - startFrame);
      let frame: { [styleName: string]: string | number } = {};

      for (const styleName in properties) {
        const property = properties[styleName];
        const startValue = property.start;
        const endValue = property.end;
        const ifNumber = ('ifNumber' in property) ? (property.ifNumber !== false) : true;
        let unit: string = property.unit || 'px';
        const basePx: number = property.basePx || 16;
        const specialValueName = property.specialValueName;
        let value: number | string = startValue + progress * (endValue - startValue);

        value = value.toFixed(2);
        if (unit === 'rem') {
          value = Number(value)  / basePx;
        }
        if (!ifNumber) {
          value = value + unit;
        }

        if (specialValueName) {
          value = `${specialValueName}(${value})`;
        }

        frame[styleName] = value;

        if (property.insertStyles) {
          property.insertStyles.forEach(insertStyle => {
            const insertFrame = insertStyle.framePosition;
            if (i === insertFrame) {
              insertStyle.styles.forEach(style => {
                frame[style.styleName] = style.value;
              });
            } else {
              frames[insertFrame] = { ...frames[insertFrame], ...frame };
            }
          });
        }
      }

      frames[i] = frame;
    }

    return frames;
  }
  /**
   * 根据Id获取元素
   * @param id 元素id数组
   * @return element获取到的元素
   */
   getElementById(id: string[]): { [key: string]: HTMLElement | null } {
    const element: { [key: string]: HTMLElement | null } = {};
    id.forEach(item => {
      element[item] = document.getElementById(item);
    });
    return element;
  }
  /**
   * 计算当前元素的之前元素的clientHeight有高
   * @param id 当前元素id
   * @param fatherId 父元素id
   * @return height 计算出的高度
   */
   getCurrentElementBeforeHeight(id: string, fatherId: string): number {
    let height = 0;
    const father = document.getElementById(fatherId);
    const children = father ? father.children : [];

    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        break;
      }
      height += children[i].clientHeight;
    }
    return height;
  }
  /**
   * 动画监听器-执行动画
   * @param observerId 需要进行监听交叉操作的元素ID
   * @param elementIDList 所有需要操作的元素id
   * @param currentPlatingElement 当前页面的id和根元素id(app)
   * @param animationList 需要操作的元素的配置
   * @param animationCriticalList 需要操作的元素的临界值配置
   */
   animationObserver(
    observerId: string,
    elementIDList: string[],
    currentPlatingElement:rangeTargetID,
    animationList: animationItem[],
    animationCriticalList?: animationCriticalItem[]
  ): void {
    const elementList = this.getElementById(elementIDList);
    const currentElementBeforeHeight = this.getCurrentElementBeforeHeight(
      currentPlatingElement.currentID,
      currentPlatingElement.rootId
    );

    let iframe = false;
    let getRate: any = null;
    let pageScrollRate: any = null;
    let rate = 0;

    const getElementFrames = () => {
      const pageScrollHeight = elementList[currentPlatingElement.currentID].clientHeight - elementList[observerId].clientHeight;

      const getRatethrottel = (fn: Function, iframe: boolean = true) => {
        if (iframe) {
          let oldRate: any = null;
          return () => {
            const newRate = rate;
            if (newRate - oldRate !== 0) {
              fn();
              oldRate = newRate;
            }
          };
        }
      };

      getRate = getRatethrottel(() => {
        animationList.forEach((item) => {
          this.animation({ elType: item.element.elType, el: elementList[item.element.el] as HTMLElement }, item.config, rate);
        });
        animationCriticalList?.forEach((item) => {
          this.animationByCritical({ el: elementList[item.elementID] as HTMLElement }, item.config as criticalConfig, rate);
        });
      }, iframe);

      pageScrollRate = () => {
        rate = Math.ceil(((elementList[observerId].offsetTop - currentElementBeforeHeight) / pageScrollHeight) * 100);
      };
    };

    const callback = (entries: any) => {
      const pageEntries = entries[0];
      if (pageEntries.isIntersecting) {
        iframe = true;

        getElementFrames();

        window.addEventListener('scroll', getRate);
        window.addEventListener('scroll', pageScrollRate);
      } else {
        iframe = false;
        window.removeEventListener('scroll', getRate);
        window.removeEventListener('scroll', pageScrollRate);
      }
    };

    const observerElement = document.getElementById(observerId) as HTMLElement;
    const observerConfig = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(callback, observerConfig);
    observer.observe(observerElement);
  }
  /**
   * 生成animationList的config
   * @param animationList 动画配置列表 -- 均匀变化
   * @param framesConfigs 动画帧配置列表
   * @param animationRange 动画帧范围
   * @return 完善后的动画配置列表
   */
   setAnimationListConfig(
    animationList: animationItemSet[],
    framesConfigs: framesConfig,
    animationRange: animationRangeItem
  ): animationItem[] {
    const newAnimationList = animationList;
    for (const key in framesConfigs) {
      for (let i = 0; i < newAnimationList.length; i++) {
        if (newAnimationList[i].element.additional) {
          if (key === newAnimationList[i].element.additional) {
            //@ts-ignore
            newAnimationList[i].config = this.generateFrames(
              animationRange[key].start,
              animationRange[key].end,
              <setFrameProperties>framesConfigs[key]
            );
          }
        } else {
          if (newAnimationList[i].element.el === key) {
            //@ts-ignore
            newAnimationList[i].config = this.generateFrames(
              animationRange[key].start,
              animationRange[key].end,
              <setFrameProperties>framesConfigs[key]
            );
          }
        }
      }
    }
    return newAnimationList;
  }

  /**
   * SVG描边动画
   * @param time 动画时间
   * @param timingFunction 动画速度曲线
   * @param lineClassName 类名
   * @param color 颜色
   * @param strokeWidth 线宽
   * @param strokeLinecap 线头样式
   * @param fill 填充
   */
  svgAnimation(
    time: number = 2,
    timingFunction:TimingType='ease',
    lineClassName: string = ".svgLine",
    color: string = "#000",
    strokeWidth: string = "6",
    strokeLinecap: string = "round",
    fill: string = "none"
  ): void {
    // 定义关键帧动画
    const styleSheet = document.styleSheets[0];
    const keyframesRule = `@keyframes d11ff255b682de{to{stroke-dashoffset:0;}}`;
    // @ts-ignore
    const existingIndex = Array.from(styleSheet.cssRules).findIndex(
      rule => rule.cssText === keyframesRule
    );
    if (existingIndex === -1) {
      styleSheet.insertRule(keyframesRule, styleSheet.cssRules.length);
    }

    const paths = document.querySelectorAll(lineClassName);
    paths.forEach((p: Element) => {
      const path = p as SVGPathElement;
      const l = path.getTotalLength() + 1;

      // Reset animation by removing and re-adding animation properties
      path.style.animation = "none";
      path.getBoundingClientRect(); // Trigger reflow to apply the reset
      path.style.stroke = color;
      path.style.strokeWidth = strokeWidth;
      path.style.strokeDasharray = `${l}`;
      path.style.strokeDashoffset = `${l}`;
      path.style.strokeLinecap = strokeLinecap;
      path.style.fill = fill;

      // Add the animation properties back
      setTimeout(() => {
        path.style.animation = `d11ff255b682de ${time}s ${timingFunction} forwards`;
      }, 0);
    });
  }



  parseSteps(n: number, status: 'start' | 'end'): numberAnFunction {
    return (t: number) => {
      const step = Math.floor(t * n);
      return status === 'start' ? step / n : (step + 1) / n;
    };
  }

  parseCubicBezier(p1x: number, p1y: number, p2x: number, p2y: number): numberAnFunction {
    function cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
      return ((1 - t) ** 3) * p0 +
        3 * ((1 - t) ** 2) * t * p1 +
        3 * (1 - t) * (t ** 2) * p2 +
        (t ** 3) * p3;
    }

    return (t: number) => cubicBezier(0, p1y, p2y, 1, t);
  }

  /**
   * 数字动画函数
   * @param duration 动画持续时间 ms
   * @param from 起始值
   * @param to 结束值
   * @param callback 回调函数
   * @param animationType 动画类型
   */
  numberAnimate(
    duration: number,
    from: number,
    to: number,
    callback: (value: number) => void,
    animationType: numberAnimationType = 'linear'
  ): void {
    const startTime = Date.now();
    const delta = to - from;

    // 定义各种动画函数
    const animations: Record<string, numberAnFunction> = {
      linear: (t) => t,
      'ease-in': (t) => t * t * t,
      'ease-out': (t) => 1 - Math.pow(1 - t, 3),
      'ease-in-out': (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2,
      'step-start': (t) => (t > 0 ? 1 : 0),
      'step-end': (t) => (t >= 1 ? 1 : 0),
      ease: (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    };

    // 解析 animationType 字符串
    const parseAnimationType = (type: string | numberAnFunction): numberAnFunction => {
      if (typeof type === 'function') {
        return type;
      }

      // @ts-ignore
      if (type.startsWith('steps(')) {
        const match = type.match(/^steps\((\d+),\s*(start|end)\)$/);
        if (match) {
          const n = parseInt(match[1], 10);
          const status = match[2] as 'start' | 'end';
          return this.parseSteps(n, status);
        }
      } else { // @ts-ignore
        if (type.startsWith('cubic-bezier(')) {
              const match = type.match(/^cubic-bezier\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)\)$/);
              if (match) {
                const [_, p1x, p1y, p2x, p2y] = match.map(Number);
                return this.parseCubicBezier(p1x, p1y, p2x, p2y);
              }
            }
      }

      return animations[type] || animations['linear'];
    };

    const animate:numberAnFunction = parseAnimationType(animationType);
    function _run(): void {
      const now:number = Date.now();
      const time:number = now - startTime;
      const timeFraction:number = Math.min(time / duration, 1);

      const progress:number = from + delta * animate(timeFraction);
      callback(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(_run);
      } else {
        // 确保动画完成时调用最终值
        callback(to);
      }
    }

    _run();
  }
}

export default new AnimationUtils();
