# vue3

vue3 vite5 移动端项目模版

## 快速开始

```bash
git clone git@github.com:cjm0/vue3_mob.git

npm install

// 本地开发，启动开发服务器
npm run dev

// 打包构建
npm run build - 打包 env.test，无 ts 校验
npm run test - 打包 env.test
npm run pre - 打包 env.pre
npm run prod - 打包 env.prod

// 本地预览打包构建产物
npm run preview

// 单元测试
npm run test:unit
npm run test:unit:coverage // 出测试覆盖率报告
npm run test:unit:ui // 访问本地 Vitest UI 界面查看测试报告

// e2e测试
npm run test:e2e:dev

// 构建包e2e测试
npm run build
npm run test:e2e

// 格式检查
npm run lint // lint 检查
npm run format // prettier 格式化修复

// debug
npm run plugin-transform // 检查 Vite 各文件转换所需的时间
npm run transform // 检查频繁使用的文件
npm run hmr // 检查 Vite 循环依赖路径
```

## 项目结构

原则：层级浅、资源集中、相对独立互不影响

```js
├── src                             // 开发目录
│   ├── api                         // 接口 api 请求
│   ├── assets                      // 公共静态资源
│       ├── img                     // 公共图片
│       ├── style                   // 公共样式
│   ├── components                  // 公共组件
│   ├── hooks                       // hooks 方法
│   ├── pages                       // 页面目录
│       ├── img                     // 两个以上页面都用到的图片单独抽离
│       ├── home                    // 首页
│           ├── home.vue            // 页面文件
│           ├── home.less           // 页面样式
│           ├── good.png            // 本页独自使用的图片
│   ├── router                      // 路由文件
│   ├── stores                      // pinia 共享数据
│   ├── tests                       // 单元测试
│   └── utils                       // 公共方法
├── .husky                          // 代码提交检查
│   ├── commit-msg                  // git commit 检查
│   ├── pre-commit                  // eslint 检查
├── back_file                       // 存放废弃文件
├── dist                            // 打包产出目录
├── env                             // 自定义环境变量
├── public                          // 不打包直接复制
├── report                          // 报告文件
│   ├── unit-ui                     // 测试报告
│   ├── visualizer.html             // 打包分析
├── types                           // ts 公共类型定义
│   ├── commit-msg                  // git commit 检查
│   ├── pre-commit                  // eslint 检查
├── vite_config                     // vite 插件配置
├── vite.config.ts                  // vite 配置文件
├── vitest.config.ts                // vitest 测试配置文件
├── cypress                         // cypress e2e 测试目录
├── cypress.config.ts               // cypress e2e 测试配置文件
├── .browserslistrc                 // 浏览器兼容配置文件
├── commitlint.config.js            // git commit 提交规范文件
├── CHANGELOG.md                    // 版本更新日志
└── README.md                       // 项目文档
```

## 注意事项

1. commit 失败 

要先执行 npm install 下载插件包

## 编辑器插件

[VSCode 插件集合](https://code.visualstudio.com/)

[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

## 插件版本

- vue ^3.4.34
- vue-router ^4.4.0
- pina ^2.2.0
- @vueuse/core ^11.0.3
- vite 5.3.1
- axios ^1.7.2
- eslint ^8.57.0
- node ^18.0.0 || >=20.0.0

## 插件地址

- [Vue3](https://cn.vuejs.org/guide/introduction.html)

- [Vue Router](https://router.vuejs.org/zh/guide)

- [Pina](https://pinia.vuejs.org/zh/introduction.html)

- [Axios](https://www.axios-http.cn/docs/intro)

- [VueUse](https://vueuse.org/guide/)

- [Vite5](https://cn.vitejs.dev/guide)
- [Vite 资源集合](https://github.com/vitejs/awesome-vite)
- [Vite 社区](https://dev.to/t/vite)

- [VitePress](https://vitepress.dev/zh/guide/getting-started)

- [Vitest](https://cn.vitest.dev/)

- [Cypress](https://www.cypress.io/)

- [ESLint](https://eslint.org/)

- [ESbuild](https://www.esbuild.cn/)

- [Rollup](https://www.rollupjs.com/)

## Git 提交规范

1. dev 分支上线后要及时删除

2. 提交示例：

```bash
  fix(pages/home): update title

  The old title is overdated

  Issues: https://github.com/conventional-changelog/commitlint/issues/2507

  <type>[scope]: <subject>

  [body]

  [footer]
```

3. 类型
- feat：增加新功能（feature）
- fix：修复bug
- test：添加测试或者修改现有测试
- revert：回滚到上一个版本
- release：正式,打包tag等发版

- refactor：代码重构，没有加新功能或者修复bug
- perf：优化了性能的代码改动
- docs：只改动了文档相关的内容
- style：不影响代码含义的改动，例如去掉空格、改变缩进、增删分号

- build：构造工具的或者外部依赖的改动，例如 webpack，npm
- chore：改变构建流程、或者增加依赖库、工具等
