import { createRouter, createWebHistory } from 'vue-router'
import Home from '@pages/home.vue'
import routerConfig from './router_config.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    ...routerConfig
  ],
  sensitive: true, // 区分大小写
  strict: false, // 非严格模式
  scrollBehavior(to, from, savedPosition) {
    // 模拟 “滚动到锚点” 的行为
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 路由跳转前拦截，undefined 或返回 true 继续，false 取消当前的导航
router.beforeEach(async (to, from) => {
  if (to.meta.auth) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

// 路由解析完毕拦截，用户无法进入页面时希望避免执行的操作
router.beforeResolve(async to => {

})

// 导航后拦截
router.afterEach((to, from, failure) => {
  // 对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
  if (failure) {
    console.log('导航失败', failure)
  }
})

export default router
