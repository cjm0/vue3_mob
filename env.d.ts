/// <reference types="vite/client" />

// 宿主变量类型定义
declare interface Window {
  WXEnvironment: any,
  WeixinJSBridge: any,
  $config: object,
  $cookie(name: string, value: any, options: any): any
}

// 自定义全局环境变量
interface ImportMetaEnv {
  readonly VITE_APP_BUILD_ENV: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
