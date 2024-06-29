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

## 编辑器插件

[VSCode 插件集合](https://code.visualstudio.com/)

[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

## 文档地址

- [Vue3](https://cn.vuejs.org/guide/introduction.html)

- [Vue Router](https://router.vuejs.org/zh/guide)

- [Pina](https://pinia.vuejs.org/zh/introduction.html)

- [Axios](https://www.axios-http.cn/docs/intro)

- [Vite5](https://cn.vitejs.dev/guide)
- [Vite 资源集合](https://github.com/vitejs/awesome-vite)
- [Vite 社区](https://dev.to/t/vite)

- [Vitest](https://cn.vitest.dev/)

- [Cypress](https://www.cypress.io/)

- [ESLint](https://eslint.org/)

- [esbuild](https://www.esbuild.cn/)

- [Rollup](https://www.rollupjs.com/)

## 插件版本

- node >= 18
- vue ^3.4.29
- vue-router ^4.3.3
- pina ^2.1.7
- axios ^1.7.2
- vite 5.3.1
- eslint ^8.57.0

## Git 提交规范

1. dev 分支上线后要及时删除

2. 提交示例：
  ```bash
  fix(pages/home): update title

  The old title is overdated

  Issues: https://github.com/conventional-changelog/commitlint/issues/2507
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
