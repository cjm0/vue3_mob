# vue3

vue3 vite5 移动端项目模版

## 快速开始

```bash
git clone git@github.com:cjm0/vue3_mob.git

npm install

// 本地开发，启动开发服务器
npm run dev

// 为生产环境构建产物
npm run build - 打包 env.test，无 ts 校验
npm run test - 打包 env.test
npm run pre - 打包 env.pre
npm run prod - 打包 env.prod

//  本地预览生产构建产物
npm run preview

// lint 检查
npm run lint

// 单元测试
npm run test:unit

// e2e测试
npm run test:e2e:dev

// 构建包e2e测试
yarn build
yarn test:e2e
```

## 编辑器插件

[VSCode](https://code.visualstudio.com/)

[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

## 参考地址

[Vue3](https://cn.vuejs.org/guide/introduction.html)

[Vite5](https://cn.vitejs.dev/guide)

[Vitest](https://vitest.dev/)

[Cypress](https://www.cypress.io/)

[ESLint](https://eslint.org/)

## 版本

- node >= 18
- vue ^3.4.29
- vite 5.3.1
- vue-router ^4.3.3
- pina ^2.1.7
- eslint ^8.57.0

## Git 提交规范

dev 分支上线后要及时删除

- feat：新增feature
- fix：修复bug
- perf：优化相关，比如提升性能、体验
- refactor：代码重构，没有加新功能或者修复bug
- docs：仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
- style：仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
- test：测试用例，包括单元测试、集成测试等
- chore：改变构建流程、或者增加依赖库、工具等
- revert：回滚到上一个版本