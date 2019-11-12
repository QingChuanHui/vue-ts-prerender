import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(Router);
const router = new Router({
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
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ]
})
// const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   LoadingBar.start()
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       LoadingBar.finish()
//     } else {
//       if (!hasKey(store.getters.userInfo)) { // 空对象
//         store.dispatch('GetInfo').then(res => { // 获取用户信息，res 返回用户信息
//           let copyRouter = [...routerList]
//           copyRouter = copyRouter.filter((item) => { // 筛选路由第一层是否有权限
//             if (item.meta && item.meta.moduleCode) { // 设置权限判断权限是否存在返回
//               return isHaveModule(item.meta.moduleCode)
//             } else return item
//           })
//           for (let c of copyRouter) {
//             if (c.children && c.children.length > 0) {
//               c.children = c.children.filter((item) => { // // 筛选路由第二层是否有权限
//                 if (item.meta && item.meta.moduleCode) { // 设置权限判断权限是否存在返回
//                   return isHaveModule(item.meta.moduleCode)
//                 } else return item
//               })
//             }
//           }
//           router.options.routes = router.options.routes.concat(copyRouter)
//           router.addRoutes(copyRouter)
//           next({
//             ...to,
//             replace: true
//           }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login')
//       LoadingBar.finish()
//     }
//   }
// })
// router.afterEach(to => {
//   LoadingBar.finish()
// })
export default router
