import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/restaurant',
        name: 'Restaurant',
        component: () => import('@/views/RestaurantsView.vue')
      },
      {
        path: '/recipe',
        name: 'Recipe',
        component: () => import('@/views/RecipeView.vue')
      },
      {
        path: '/random',
        name: 'Random',
        component: () => import('@/views/RandomView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
