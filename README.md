# vue3

vue3 项目模版

## 快速开始

```sh

git clone git@github.com:cjm0/vue3_mob.git

npm install

npm run dev 本地开发

npm run build 打包-env.test 无 ts 校验

npm run test 打包-env.test

npm run pre 打包-env.pre

npm run prod 打包-env.prod

npm run preview 预览

npm run lint lint 检查
```

## 编辑器插件

[VSCode](https://code.visualstudio.com/)

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

## 参考地址

[Vite Configuration Reference](https://vitejs.dev/config/)

[Vitest](https://vitest.dev/)

[Cypress](https://www.cypress.io/)

[ESLint](https://eslint.org/)

## 版本

- node >= 16

- vue ^3.2.47

- vite ^4.1.4

- vue-router ^4.1.6

- pina ^2.0.32

- eslint ^8.34.0
