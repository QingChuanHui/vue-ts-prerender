import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/page-home/layout/layout.vue'
import { LoadingBar } from 'view-design'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home1',
          component: () => import('@/page-home/home/index.vue')
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      component: layout,
      redirect: '/article/detail',
      children: [
        {
          path: 'articleList',
          name: 'articleList',
          component: () => import('@/page-home/article/article.vue')
        },
        {
          path: 'detail',
          name: 'articleDetail',
          component: () => import('@/page-home/article/article-detail.vue')
        }
      ]
    },
    {
      path: '/interaction',
      name: 'interaction',
      component: layout,
      redirect: '/interaction/main',
      children: [
        {
          path: 'main',
          name: 'interactionMain',
          component: () => import('@/page-home/interaction/interaction-main.vue')
        },
        {
          path: 'detail',
          name: 'interactionDetail',
          component: () => import('@/page-home/interaction/interaction-detail.vue')
        },
        {
          path: 'add',
          name: 'interactionAdd',
          component: () => import('@/page-home/interaction/interaction-add.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})
router.afterEach(to => {
  LoadingBar.finish()
})
export default router
