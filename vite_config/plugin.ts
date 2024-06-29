import { splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 兼容不支持 ESM 浏览器：https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy'

// gzip 压缩：https://github.com/vbenjs/vite-plugin-compression/tree/main#readme
import viteCompression from 'vite-plugin-compression';

// 打包分析：https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer'

// 手机网页 vConsole：https://github.com/vadxq/vite-plugin-vconsole
import { viteVConsole } from 'vite-plugin-vconsole'

export function createVitePlugins(ISESM, entry, VITE_BUILD_ENV) {
  return [
    vue({
      template: {
        compilerOptions: {
          // 将所有标签名 custom- 开头的都视为自定义元素
          isCustomElement: (tag) => tag.startsWith('custom-')
        }
      }
    }),
    vueJsx(),
    // 自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill
    !ISESM && legacy({
      targets: ['last 2 versions and not dead, > 1%, Firefox ESR', 'not IE 11'], // 传统浏览器目标
      renderLegacyChunks: true, // 额外编译一份针对传统浏览器的代码
      // polyfills: ['es.promise.finally'], // 为传统浏览器注入 polyfill，根据 @babel/preset-env useBuiltIns: 'usage' 自动注入
      // modernPolyfills: ['es.promise.finally'], // 为现代浏览器注入 polyfill
    }),
    /*
      1. 默认第三方包和业务在一个 chunk 中
      2. splitVendorChunkPlugin 将 chunk 分割为 index 和 vendor
      3. 用了 manualChunks 自定义就不能用 splitVendorChunkPlugin
     */
    splitVendorChunkPlugin(),

    {
      // gzip 压缩
      ...viteCompression({
        //  指定哪些资源不压缩 /\.(js|mjs|json|css|html)$/i
        filter: /\.(js|mjs|json|css)$/i,
        disable: false, // 是否禁用 false-打开 true-关闭
        threshold: 10240, // 10kb 以上压缩
        algorithm: 'gzip', // 压缩算法 'zip'、'brotliCompress'、'deflate'、'deflateRaw'
        ext: '.gz', // .gz 生成的压缩包的后缀
        verbose: true, // 是否在控制台输出压缩结果
        deleteOriginFile: false, // 压缩后是否删除源文件
      }),
      apply: 'build',
    },
    // 打包分析，测试和预发环境打开
    ['test', 'pre'].includes(VITE_BUILD_ENV) && visualizer({
      emitFile: false, // 汇总输出，默认 false
      filename: './dist/report.html', // 输出地址
      open: false, // 自动打开
      gzipSize: true, // 生成 gzip 压缩大小报告
    }),
    {
      // 加 vConsole
      ...viteVConsole({
        entry: [entry],
        enabled: ['test', 'pre'].includes(VITE_BUILD_ENV), // 测试和预发环境打开
        config: {
          maxLogNumber: 1000,
          theme: 'light',
        },
        // 动态修改主题：https://github.com/vadxq/vite-plugin-vconsole/issues/21
        dynamicConfig: {
          theme: `document.documentElement.classList.contains('dark') ? 'dark' : 'light'`,
        },
        eventListener: `
          const targetElement = document.querySelector('html'); // 择要监听的元素
          const observerOptions = {
            attributes: true, // 监听属性变化
            attributeFilter: ['class'] // 只监听class属性变化
          };

          // 定义回调函数来处理观察到的变化
          function handleAttributeChange(mutationsList) {
            for(let mutation of mutationsList) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (window && window.vConsole) {
                  window.vConsole.dynamicChange.value = new Date().getTime();
                }
              }
            }
          }

          // 创建观察者实例并传入回调函数
          const observer = new MutationObserver(handleAttributeChange);

          // 开始观察目标元素
          observer.observe(targetElement, observerOptions);

          // 当不再需要观察时，停止观察
          // observer.disconnect();
        `,
      }),
      apply: 'build',
    },
    {
      // 仅支持：开发模式、Vue3.0+、仅支持单实例 Vue 应用程序、不支持 SSR (Nuxt 请使用 nuxt/devtools)
      ...vueDevTools(),
      apply: 'serve',
    },
  ]
}
