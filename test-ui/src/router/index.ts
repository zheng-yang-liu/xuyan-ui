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
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/svgAnimation',
      name: 'svgAnimation',
      component: () => import('@/views/svgAnimation.vue')
    },
    {
      path:"/cropping",
      name:"cropping",
      component:()=>import("@/views/cropping.vue")
    }
  ]
})

export default router
