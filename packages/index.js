//严格模式
'use strict';

//导入组件
import * as Tools from "./Utils/Tools"
import AnimationUtils from "./Utils/AnimationAPI/AnimationUtils";
import Graph from "./Utils/canvasAPI/canvasGraph/Graph";
import DrawGraph from "./Utils/canvasAPI/canvasGraph/DrawGraph";
import vueHighlightJS from"./directives/vueHighlightJS";
import {xyTest} from "./lib/xy-test";
import {xyCalendar} from "./lib/xy-calendar";
import {xyImgCropping} from "./lib/xy-img-cropping"
import {xyClassicPage} from "./lib/xy-classic-page"
import {xyMenuLeft,xyMenuItem,xyMenuCatalog} from "./lib/xy-menu";
import {xyCodePreview,xyEffectPreview,xyAttributeTable,xyShowcasePage}from "./lib/xy-effect-preview"
import {xyTooltip} from "./lib/xy-tooltip";
import {xyDialog} from "./lib/xy-dialog";
import {xyButton} from "./lib/xy-button";
import {xyIcon} from "./lib/xy-icon";
import {xyInput} from "./lib/xy-input";

//挂载组件
const install = (app) =>{
    const components = [
        xyTest,
        xyCalendar,
        xyImgCropping,
        xyClassicPage,
        xyMenuLeft,
        xyMenuItem,
        xyCodePreview,
        xyEffectPreview,
        xyAttributeTable,
        xyTooltip,
        xyShowcasePage,
        xyMenuCatalog,
        xyDialog,
        xyButton,
        xyIcon,
        xyInput
    ];
    components.forEach(item=>{
        const name = item.name || item.__name;
        app.component(name,item);
    })
    // 安装自定义指令
    app.use(vueHighlightJS);
}

export {
    Tools,
    xyTest,
    AnimationUtils,
    Graph,
    DrawGraph
}

export default {
    install,
    Tools,
    AnimationUtils,
    Graph,
    DrawGraph

}