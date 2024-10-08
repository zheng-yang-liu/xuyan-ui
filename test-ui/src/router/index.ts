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
      component: () => import('@/views/test2.vue')
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
