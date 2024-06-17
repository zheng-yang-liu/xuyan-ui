//严格模式
'use strict';

//导入组件
import * as Tools from "./tools"
import {xyTest} from "./lib/xy-test";
import {xyCalendar} from "./lib/xy-calendar";
import {xyImgCropping} from "./lib/xy-img-cropping"
import {xyClassicPage} from "./lib/xy-classic-page"
import {xyMenuLeft,xyMenuItem} from "./lib/xy-menu";
import {xyCodePreview}from "./lib/xy-code-preview"


//挂载组件

const install = (app) =>{
    const components = [xyTest,xyCalendar,xyImgCropping,xyClassicPage,xyMenuLeft,xyMenuItem,xyCodePreview];
    components.forEach(item=>{
        const name = item.name || item.__name;
        app.component(name,item);
    })
}

export {
    Tools
}

export default {
    install,
    Tools
}