
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import xy from "../../packages"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(xy)

app.mount('#app')
