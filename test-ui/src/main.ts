
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import xy from "../../packages"
console.log(xy);
import"../../packages/assets/iconFont/iconfont.css"
// @ts-ignore
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(xy)

app.mount('#app')
