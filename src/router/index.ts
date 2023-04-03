import { createRouter, createWebHistory } from 'vue-router'
import Home from '@pages/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@pages/about.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: { auth: false, title: '404页面' },
      component: () =>
        import(/* webpackChunkName: '404' */ '@pages/error/index.vue'),
    },
  ],
})

// 路由跳转前拦截
router.beforeEach(async (to, from, next) => {
  // console.log('router', to, from)
  next()
})

export default router
