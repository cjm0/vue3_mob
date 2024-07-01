export default [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: { auth: false, title: '404页面' },
    component: () => import('@/pages/error/index.vue'),
  },
];
