//严格模式
'use strict';

//导入组件
import * as Tools from "./tools"
import {xyTest} from "./lib/xy-test";
import {xyCalendar} from "./lib/xy-calendar";
import {xyImgCropping} from "./lib/xy-img-cropping"


//挂载组件

const install = (app) =>{
    const components = [xyTest,xyCalendar,xyImgCropping];
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