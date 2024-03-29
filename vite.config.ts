import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 兼容不支持 ESM 浏览器：https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy'

// css 自动加前缀：https://github.com/postcss/autoprefixer#readme
import autoprefixer from 'autoprefixer';

// 打包分析：https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer'

// 手机网页 vConsole：https://github.com/vadxq/vite-plugin-vconsole
import { viteVConsole } from 'vite-plugin-vconsole'

// gzip 压缩：https://github.com/vbenjs/vite-plugin-compression/tree/main#readme
// import viteCompression from 'vite-plugin-compression';

function getUrl(url: string) {
  return fileURLToPath(new URL(url, import.meta.url))
}

// 只使用 ESM 现代浏览器
const onlyESM = true

// 文档：https://cn.vitejs.dev/config/shared-options.html
export default defineConfig(async ({ mode, command }) => {
  const env = loadEnv(mode, getUrl('./env')) // 加载 .env 文件
  const BUILD_ENV = env.VITE_APP_BUILD_ENV

  return {
    root: process.cwd(), // 项目根目录（index.html 文件所在的位置）
    base: env.VITE_APP_BASE_URL, // 开发或生产环境服务的公共基础路径 /foo/
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
      splitVendorChunkPlugin(), // 将 chunk 分割为 index 和 vendor
      !onlyESM && legacy({ // 自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill
        targets: ['last 2 versions and not dead, > 1%, Firefox ESR', 'not IE 11'], // 传统浏览器目标
        renderLegacyChunks: true, // 额外编译一份针对传统浏览器的代码
        // polyfills: ['es.promise.finally'], // 为传统浏览器注入 polyfill，根据 @babel/preset-env useBuiltIns: 'usage' 自动注入
        // modernPolyfills: ['es.promise.finally'], // 为现代浏览器注入 polyfill
      }),
      visualizer({
        emitFile: false, // 打包到项目根目录
        filename: 'report.html',
        open: false, // 自动打开
      }),
      viteVConsole({
        entry: getUrl('./src/main.ts'),
        localEnabled: false, // command server
        enabled: BUILD_ENV !== 'prod', // command build-非线上环境
        config: { // vconsole options
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),
      /* viteCompression({ // gzip 压缩
        disable: false, // 是否禁用
        threshold: 10240, // 10kb 以上压缩
        algorithm: 'gzip', // 压缩算法 'zip'、'brotliCompress'、'deflate'、'deflateRaw'
        ext: '.gz', // .gz 生成的压缩包的后缀
        verbose: true, // 是否在控制台输出压缩结果
        deleteOriginFile: false, // 压缩后是否删除源文件
      }), */
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
          additionalData: '@import "@/assets/css/mixin.less";',
        },
      },
    },

    // 服务器代理
    server: { // 本地开发代理
      host: '127.0.0.1',
      port: 9001,
      strictPort: true, // 若端口已被占用则会直接退出，而不是尝试下一个可用端口
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

    // 打包输出处理
    build: {
      outDir: 'dist', // 指定输出路径
      // Vite 只处理语法转译，默认不包含任何 polyfill
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'], // 最终构建的浏览器兼容目标
      sourcemap: BUILD_ENV !== 'prod', // 非生产环境
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
      reportCompressedSize: false, // true gzip 压缩大小报告，有大文件可关闭提高速度
      assetsInlineLimit: 4096, // 小于 4kb 的资源内联为 base64，0 完全禁用此项
      chunkSizeWarningLimit: 500, // 500kb 触发警告的 chunk 大小
      minify: 'esbuild',
      rollupOptions: { // rollup 配置文档：https://rollupjs.org/configuration-options/
        output: {
          entryFileNames: `assets/js/[name].[hash].js`, // 入口文件 [hash8] [hash10]
          chunkFileNames: `assets/js/[name].[hash].js`, // 页面文件
          assetFileNames: `assets/[ext]/[name].[hash][extname]`, // 资源文件
          // manualChunks: { // 定义分块
          //    'home': [
          //       './src/pages/home.vue',
          //     ],
          //     'about': [
          //       './src/pages/about.vue',
          //     ],
          //     '404': [
          //       './src/pages/error/index.vue',
          //     ],
          // }
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
