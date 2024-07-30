import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

// css 自动加前缀：https://github.com/postcss/autoprefixer#readme
import autoprefixer from 'autoprefixer';

// 插件配置
import { createVitePlugins } from './vite_config/plugin.ts'

function getUrl(url: string) {
  return fileURLToPath(new URL(url, import.meta.url))
}
const entry = getUrl('./src/main.ts')
const ISESM = true // 只使用 ESM 现代浏览器

// 文档：https://cn.vitejs.dev/config/shared-options.html
export default defineConfig(({ mode, command }) => {
  // 加载 .env 文件
  const { VITE_BASE_URL, VITE_BUILD_ENV } = loadEnv(mode, getUrl('./env'))

  return {
    root: process.cwd(), // 项目根目录（index.html 文件所在的位置）
    base: VITE_BASE_URL, // 开发或生产环境服务的公共基础路径 /read/
    publicDir: 'public', // 不被处理的文件放这里，设定为 false 可以关闭此项功能
    cacheDir: 'node_modules/.vite', // 缓存文件目录，可手动删除以更新
    envDir: 'env', // 用于加载 .env 文件的目录
    resolve: {
      alias: {
        '@': getUrl('./src'),
      },
    },
    define: {
      __VUE_OPTIONS_API__: true, // true-启用 false-禁用选项API支持，默认 true
      __VUE_PROD_DEVTOOLS__: VITE_BUILD_ENV !== 'prod', // 在生产中启用/禁用 DEVTOOLS 支持，默认 false
    },

    // 服务器代理
    server: { // 本地开发代理
      host: '127.0.0.1',
      port: 9003,
      strictPort: true, // 若端口已被占用则会直接退出，而不是尝试下一个可用端口
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      cors: true, // 允许开发时 ajax 跨域
      open: true, // 自动在浏览器中打开应用程序
      // warmup: { // 预热常用文件：提前转换和缓存文件，提高启动速度并防止转换瀑布
      //   clientFiles: ['./src/components/*.vue', './src/utils/big-utils.js'],
      // },
      proxy: {
        '/api/v2/person': { // 医疗 crm api 请求
          target: 'https://crmtest.pkuih.edu.cn:9004',
          changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
          secure: false, // 设置为 false，接受 https
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io
        '/socket.io': {
          target: 'ws://localhost:5174',
          ws: true,
        },
      },
    },
    preview: { // 预览服务代理
      port: 9002,
    },

    // 插件
    plugins: createVitePlugins(ISESM, entry, VITE_BUILD_ENV),

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
          additionalData: `@import "@/assets/style/mixin.less";`,
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
      sourcemap: VITE_BUILD_ENV !== 'prod', // 非生产环境
      manifest: true, // 在 outDir 中生成 .vite/manifest.json
      minify: 'esbuild', // terser | esbuild
      rollupOptions: { // rollup 配置文档：https://rollupjs.org/configuration-options/
        output: {
          entryFileNames: `static/js/[name].[hash].js`, // 入口文件 [hash8] [hash10]
          chunkFileNames: `static/js/[name].[hash].js`, // 页面文件
          assetFileNames: `static/[ext]/[name].[hash][extname]`, // 资源文件
          compact: true, // 压缩 Rollup 产生的额外代码
          manualChunks: { // 自定义公共 chunk
            app: ['vue', 'vue-router', 'pinia', 'axios'],
            // 把组件按组分块打包
            // 'group-user': [
            //   './src/UserDetails',
            //   './src/UserDashboard',
            // ],
          },
          /*
            manualChunks: id => {
              // 将 node_modules 中的代码打包成一个 js 文件
              if (id.includes('node_modules')) {
                return 'vendor'
              }
              // 将 node_modules 中的代码按需打包成多个 js 文件
              if (id.includes('node_modules')) {
                if (id.includes('ant-design-vue')){
                  return 'ant-design-vue';
                } else if (id.includes('echarts') || id.includes('echarts-wordcloud')){
                  return 'echarts';
                } else {
                  return 'app';
                }
              }
              // 将 node_modules 中的代码包每个都单独打包
              if (id.includes('node_modules')) {
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString();
              }
            }
          */
        },
      },
    },
    esbuild: { // 转译处理
      // pure: ['console.error'], // 只删除 console.error
      drop: VITE_BUILD_ENV === 'prod' ? ['console', 'debugger'] : [], // 删除 console、debugger-线上环境
    },
  }
})
