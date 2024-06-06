import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/',
      name: 'test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/svgAnimation',
      name: 'svgAnimation',
      component: () => import('@/views/svgAnimation.vue')
    }
  ]
})

export default router
