import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@assets/css/main';
import axios from "@assets/js/axios";
import "@assets/js/index";

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局属性挂载
app.config.globalProperties.$axios = axios

// 全局注册组件
// app.component('TodoDeleteButton', TodoDeleteButton)

// 全局错误处理器
app.config.errorHandler = (err) => {
  console.log('vue err', err)
}

app.mount('#app')
