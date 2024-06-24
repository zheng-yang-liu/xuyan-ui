import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/iiiiiii',
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
