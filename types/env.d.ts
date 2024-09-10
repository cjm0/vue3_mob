/// <reference types="vite/client" />
/*
  vite/client 提供以下类型定义补充：
    资源导入 (例如：导入一个 .svg 文件)
    import.meta.env 上 Vite 注入的环境变量的类型定义
    import.meta.hot 上的 HMR API 类型定义
 */

// 自定义全局环境变量
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_BUILD_ENV: string
}

// 给 Window 添加属性和方法
declare interface Window {
  readonly WXEnvironment: any,
  readonly WeixinJSBridge: any,
  $config: object,
}

