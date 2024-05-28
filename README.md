# 精简版

## 项目目录

```
xuyan-ui 组件库项目

    |__ packages  -- 存放开发的组件

    |__ test-ui  -- 测试组件库
    
```



## 组件库实现逻辑

文件结构

```
packages
	|__ lib
		|__ compName
            |__ compName.vue
            |__ index.js -- 导出组件
    |__ index.js -- 注册组件
    |__ index.d.ts -- 类型标注
    |__ package.json -- 包信息
	
```

导出组件 compName/index.js

```
import compName from "./compName.vue"
export {compName}
```

注册组件 packages/index.js

```
//严格模式
'use strict';

//导入组件
import {xyTest} from "./lib/xy-test";


//导出\注册组件

const install = (app) =>{
    const components = [xyTest];
    components.forEach(item=>{
        const name = item.name || item.__name;
        app.component(name,item);
    })
}

export default {
    install
}
```

类型声明 packages/index.d.ts

```
export declare const install: (app: import("vue").App<any>) => void;
```

包信息 packages/package.json

```
{
  "name": "yanyan-ui",  //组件库名
  "version": "2.0.8", //版本号
  "private": false, //是否公共
  "description": "适用于vue3的前端xy组件库", //说明
  "main": "index.js", //入口文件
  "typings": "index.d.ts", //类型声明文件
  "keywords": ["yanyan-ui", "vue3", "xy", "组件库","ui"], //关键字
  "dependencies": {  //依赖
    "vue": "^3.4.26"
  }
}
```

发布

```
npm publish --registry=https://registry.npmjs.org/
```

## 测试组件库
```
test-ui

    |__main.ts

test-ui/main.ts -- 导入库
```


```
import xy from "../../packages/index.js"
app.use(xy)
```

# 注意
```
    建议设置git不忽略大小写
    git config core.ignorecase false 
```