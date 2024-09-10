/*
 * @Description : 本地多语言适配
 * @Author      : chenjianmin
 * @Date        : 2024-09-09 18:24:19
 */

import { createI18n } from 'vue-i18n';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';

// 获取浏览器语言
const localLang = localStorage.getItem('local_lang');
const lang = localLang || navigator.language.toLowerCase();

const i18n = createI18n({
  locale: lang, // 使用语言
  fallbackLocale: 'zh-CN', // 回退言语
  legacy: false, // 支持 Composition API
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
});

export default i18n;