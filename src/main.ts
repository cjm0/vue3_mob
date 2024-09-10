// 全局配置、公共文件
import '@/assets/style/main.less'
import "@/utils/config"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from '@/utils/locales/i18n'
import piniaPlugin from '@/stores/piniaPlugin'
import router from '@/router/index'

const app = createApp(App)
const pinia = createPinia()
app.use(i18n)
pinia.use(piniaPlugin)
app.use(pinia)
app.use(router)

// 全局错误处理器：错误对象、触发该错误的组件实例、一个指明错误来源类型信息的字符串
app.config.errorHandler = (err, instance, info) => {
  console.log('Vue errorHandler', err, instance, info)
}
// 开启 Vue 特有的性能标记，标记在 Chrome 开发者工具的性能时间线上
if (import.meta.env.VITE_BUILD_ENV === 'dev') {
  app.config.performance = true
}

app.mount('#app')
