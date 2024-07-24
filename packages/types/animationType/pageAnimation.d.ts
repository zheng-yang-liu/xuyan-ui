export type criticalElement = {
  el: HTMLElement;
};
export type criticalStyle = {
  styleName: string;
  value: number | string;
};
export type criticalConfig = {
  critical: number;
  exceed: criticalStyle[];
  noExceed: criticalStyle[];
};
export type setFrameIntertStyleStyle = {
  styleName: string;
  value: number | string;
};
export type setFrameInsertStyle = {
  framePosition: number;
  styles: setFrameIntertStyleStyle[];
};
export type setFramePropertiesKey = {
  basePx?: number;
  specialValueName?: string;
  start: number;
  end: number;
  ifNumber: boolean;
  unit?: string;
  insertStyles?: setFrameInsertStyle[];
};
export type setFrameProperties = {
  [key: string]: setFramePropertiesKey;
};
export type animationItem = {
  element: { elType: string; el: string; additional?: string };
  config?: {[key:string]:string};
};
export type animationItemSet = {
  element: { elType: string; el: string; additional?: string };
};
export type animationCriticalItem = {
  elementID: string;
  config: {
    critical: number,
    exceed?: {styleName:string,value:number}[],
    noExceed?: {styleName:string,value:number}[],
  }
};
export type rangeTargetID = {
  currentID: string;
  rootId: string;
};
export type framesConfig = {
  [key: string]: {
    [key: string]: {
      specialValueName?: string;
      start: number;
      end: number;
      ifNumber?: boolean;
      unit?: string;
      basePx?: number;
    };
  };
};
export type animationRangeItem = {
  [key: string]:{
    start:number;
    end:number;
  }
}

export type TimingType = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | 'steps' | 'cubic-bezier';

//numberAnimate
export type numberAnFunction = (t: number) => number;
export type numberAnimationType = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | 'ease' | string | numberAnFunction;







