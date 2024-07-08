import {
  criticalElement,
  criticalConfig,
  setFrameProperties,
  animationList,
  animationCriticalItem,
  framesConfig,
  animationRangeItem,
  rangeTargetID
} from "../types/pageAnimation"


class AnimationUtils {
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

   getElementById(id: string[]): { [key: string]: HTMLElement | null } {
    const element: { [key: string]: HTMLElement | null } = {};
    id.forEach(item => {
      element[item] = document.getElementById(item);
    });
    return element;
  }

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

   setAnimationListConfig(
    animationList: animationItem[],
    framesConfigs: framesConfig,
    animationRange: animationRangeItem
  ): animationList[] {
    const newAnimationList = animationList;
    for (const key in framesConfigs) {
      for (let i = 0; i < newAnimationList.length; i++) {
        if (newAnimationList[i].element.additional) {
          if (key === newAnimationList[i].element.additional) {
            newAnimationList[i].config = this.generateFrames(
              animationRange[key].start,
              animationRange[key].end,
              <setFrameProperties>framesConfigs[key]
            );
          }
        } else {
          if (newAnimationList[i].element.el === key) {
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
}

export default new AnimationUtils();
