import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import routerConfig from './config'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/:path(home)?', // 匹配 /、/home
      name: 'home',
      component: Home,
    },
    ...routerConfig
  ],
  sensitive: true, // 区分大小写
  strict: false, // 是否禁止尾部斜线
  // 自定义路由切换时页面如何滚动
  scrollBehavior(to, from, savedPosition) {
    // 滚动到锚点
    if (to.hash) {
      return {
        el: to.hash, // #main
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      // 保持原先的滚动位置
      return savedPosition
    } else {
      // 滚动到顶部
      return { top: 0 }
    }
  },
})

// 路由跳转前：false 取消当前导航
router.beforeEach(async (to) => {
  if (to.meta.auth) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
  return true
})

// 路由跳转后 DOM 更新前
router.afterEach((to, from, failure) => {
  // 分析、更改页面标题、声明页面
  if (failure) {
    console.log('导航失败', failure)
  }
})

// 导航错误处理器：同步和异步被抛出的错误、导航守卫中返回或传入 next 的错误、解析一个异步组件时发生的错误
router.onError((error) => {
  console.log('导航错误', error)
})

export default router
