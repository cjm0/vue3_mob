import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 兼容不支持 ESM 浏览器：https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy'

// css 自动加前缀：https://github.com/postcss/autoprefixer#readme
import autoprefixer from 'autoprefixer';

// gzip 压缩：https://github.com/vbenjs/vite-plugin-compression/tree/main#readme
import viteCompression from 'vite-plugin-compression';

// 打包分析：https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer'

// 手机网页 vConsole：https://github.com/vadxq/vite-plugin-vconsole
import { viteVConsole } from 'vite-plugin-vconsole'

function getUrl(url: string) {
  return fileURLToPath(new URL(url, import.meta.url))
}

// 只使用 ESM 现代浏览器
const ISESM = true

// 文档：https://cn.vitejs.dev/config/shared-options.html
export default defineConfig(async ({ mode, command }) => {
  const env = loadEnv(mode, getUrl('./env')) // 加载 .env 文件
  const BUILD_ENV = env.VITE_APP_BUILD_ENV

  return {
    root: process.cwd(), // 项目根目录（index.html 文件所在的位置）
    base: env.VITE_APP_BASE_URL, // 开发或生产环境服务的公共基础路径 /read/
    publicDir: 'public', // 不被处理的文件放这里，设定为 false 可以关闭此项功能
    cacheDir: 'node_modules/.vite', // 缓存文件目录，可手动删除以更新
    envDir: 'env', // 用于加载 .env 文件的目录
    resolve: {
      alias: {
        '@': getUrl('./src'),
        '@assets': getUrl('./src/assets'),
        '@utils': getUrl('./src/assets/utils'),
        '@components': getUrl('./src/components'),
        '@hooks': getUrl('./src/hooks'),
        '@pages': getUrl('./src/pages'),
        '@service': getUrl('./src/service'),
        '@stores': getUrl('./src/stores'),
      },
    },
    define: {
      __VUE_OPTIONS_API__: true, // true-启用 false-禁用选项API支持，默认 true
      __VUE_PROD_DEVTOOLS__: BUILD_ENV !== 'prod', // 在生产中启用/禁用 DEVTOOLS 支持，默认 false
    },

    // 服务器代理
    server: { // 本地开发代理
      // host: '127.0.0.1',
      port: 9003,
      strictPort: true, // 若端口已被占用则会直接退出，而不是尝试下一个可用端口
      cors: true, // 允许开发时 ajax 跨域
      open: true, // 自动在浏览器中打开应用程序
      proxy: {
        '/api/v2/person': { // 医疗 crm api 请求
          target: 'https://crmtest.pkuih.edu.cn:9004',
          changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
          secure: false, // 设置为 false，接受 https
          ws: true,
        },
      },
    },
    preview: { // 预览服务代理
      port: 9002,
    },

    // 插件
    plugins: [
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
      // 将 chunk 分割为 index 和 vendor
      splitVendorChunkPlugin(),

      {
        // gzip 压缩
        ...viteCompression({
          disable: false, // 是否禁用 false-打开 true-关闭
          threshold: 10240, // 10kb 以上压缩
          algorithm: 'gzip', // 压缩算法 'zip'、'brotliCompress'、'deflate'、'deflateRaw'
          ext: '.gz', // .gz 生成的压缩包的后缀
          verbose: true, // 是否在控制台输出压缩结果
          deleteOriginFile: false, // 压缩后是否删除源文件
        }),
        apply: 'build',
      },
      {
        // 打包分析
        ...visualizer({
          emitFile: false, // 汇总输出，默认 false
          filename: 'report.html', // 打包到项目根目录
          open: false, // 自动打开
          gzipSize: true, // 生成 gzip 压缩大小报告
        }),
        apply: 'build',
      },
      {
        // 加 vConsole
        ...viteVConsole({
          entry: getUrl('./src/main.ts'),
          localEnabled: false, // command server
          enabled: ['test', 'pre'].includes(BUILD_ENV), // command build-测试和预发环境打开
          config: { // vconsole options
            maxLogNumber: 1000,
            theme: 'light',
          },
        }),
        apply: 'build',
      },
      {
        // 仅在开发模式下可用、仅支持 Vue3.0+ 、仅支持单实例 Vue 应用程序、不支持 SSR (Nuxt 请使用 nuxt/devtools)
        ...vueDevTools(),
        apply: 'serve',
      }
    ],

    // 样式处理
    css: {
      postcss: {
        plugins: [
          autoprefixer() // 自动添加前缀
        ]
      },
      preprocessorOptions: {
        less: {
          // 自动为 vue 文件注入 mixin.less
          additionalData: `@import "@/assets/css/mixin.less";`,
        },
      },
    },

    // 打包输出处理
    build: {
      outDir: 'dist', // 指定输出路径
      /*
        Vite 只处理语法转译，默认不包含任何 polyfill
        最终构建的浏览器兼容目标，默认 ['modules'] = ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
        如果有原生动态导入支持，传 esnext，将会转译得尽可能小
      */
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      cssCodeSplit: true, // 启用 css 代码拆分，关闭则所有 css 打包到一个文件
      assetsInlineLimit: 4096, // 小于 4kb 的资源内联为 base64，0 完全禁用此项
      chunkSizeWarningLimit: 500, // 500kb 触发警告的 chunk 大小
      reportCompressedSize: false, // true gzip 压缩大小报告，有大文件可关闭提高速度
      sourcemap: BUILD_ENV !== 'prod', // 非生产环境
      manifest: true, // 在 outDir 中生成 .vite/manifest.json
      minify: 'esbuild', // terser | esbuild
      rollupOptions: { // rollup 配置文档：https://rollupjs.org/configuration-options/
        output: {
          entryFileNames: `static/js/[name].[hash].js`, // 入口文件 [hash8] [hash10]
          chunkFileNames: `static/js/[name].[hash].js`, // 页面文件
          assetFileNames: `static/[ext]/[name].[hash][extname]`, // 资源文件
          /* manualChunks: { // 定义分块
             'home': [
                './src/pages/home.vue',
              ],
              'about': [
                './src/pages/about.vue',
              ],
              '404': [
                './src/pages/error/index.vue',
              ],
          } */
          /* manualChunks: id => {
            // 将 node_modules 中的代码单独打包成一个 JS 文件
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            // 每个第三方依赖都单独打包
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          } */
        },
      },
    },
    esbuild: { // 转译处理
      // pure: ['console.error'], // 只删除 console.error
      drop: BUILD_ENV === 'prod' ? ['console', 'debugger'] : [], // 删除 console、debugger-线上环境
    },
  }
})
