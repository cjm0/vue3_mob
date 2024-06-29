/// <reference types="vite/client" />
/*
  vite/client 提供以下类型定义补充：
    资源导入 (例如：导入一个 .svg 文件)
    import.meta.env 上 Vite 注入的环境变量的类型定义
    import.meta.hot 上的 HMR API 类型定义
 */

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
