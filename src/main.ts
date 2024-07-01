// 全局配置、公共文件
import '@/assets/style/main.less'
import "@/utils/config.ts"
import "@/utils/cookie.ts"
import axios from "@/utils/axios.ts"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPlugin from '@/stores/piniaPlugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPlugin)
app.use(pinia)
app.use(router)

// 全局属性注入
app.provide('$axios', axios)
app.config.globalProperties.$axios = axios

// 全局注册组件
// app.component('TodoDeleteButton', TodoDeleteButton)

// 全局错误处理器：错误对象、触发该错误的组件实例和一个指出错误来源类型信息的字符串
app.config.errorHandler = (err, instance, info) => {
  console.log('vue err', err, instance, info)
}

// 开启 Vue 特有的性能标记，标记在 Chrome 开发者工具的性能时间线上
if (import.meta.env.VITE_APP_BUILD_ENV === 'dev') {
  app.config.performance = true
}

app.mount('#app')
