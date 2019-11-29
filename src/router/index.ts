import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout.vue'
import { LoadingBar } from 'view-design'
import { getToken } from '@/utils/auth'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/information/search'
    },
    {
      path: '/information',
      component: layout,
      redirect: '/information/search',
      children: [
        {
          path: 'search',
          name: 'informationSearch',
          component: () => import('@/views/information/information-search.vue')
        },
        {
          path: 'manage',
          name: 'informationManage',
          component: () => import('@/views/information/information-manage.vue')
        }
      ]
    },
    {
      path: '/article',
      component: layout,
      redirect: '/article/manage',
      children: [
        {
          path: 'manage',
          name: 'articleManage',
          component: () => import('@/views/article/article-manage.vue')
        }
      ]
    },
    {
      path: '/question',
      component: layout,
      redirect: '/question/manage',
      children: [
        {
          path: 'manage',
          name: 'questionManage',
          component: () => import('@/views/question/question-manage.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/login/index.vue') }
  ]
})
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to: any, from: any, next: any) => {
  LoadingBar.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      LoadingBar.finish()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      LoadingBar.finish()
    }
  }
})
router.afterEach(to => {
  LoadingBar.finish()
})
export default router
