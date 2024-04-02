import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',  redirect: '/stock' },
    { path: '/stock', name: 'stock-page', component: () => import('../views/Stock.vue')},
    { path: '/stock/add', name: 'add-stock-page', component: () => import('../views/AddStock.vue')},
    { path: '/:pathMatch(.*)*', name: 'not-found-page', component: () => import('../views/PageNotFound.vue')},
    // { path: '/:pathMatch(.*)*', name: 'not-found-page', component: () => import('../views/PageNotFound.vue')},

    // { path: '/', name: 'home', component: () => import('../views/HomeView.vue')},
    // { path: '/about', name: 'about', component: () => import('../views/AboutView.vue')}
  ]
})

export default router
