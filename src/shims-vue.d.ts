import Vue from 'vue'
// import { Message } from 'view-design'
// import VueRouter from 'vue-router';
// import { Route } from 'vue-router';
declare module '*.vue' {
  export default Vue
}
// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $MessageShow: any;
  }
}
declare global {
  interface PageD {
    pagesize: number
    total: number
    pagenum: number
  }
  // interface route {
  //   path: string
  //   name: string
  //   component: any
  //   meta?: meta
  //   alias?: string
  // }

  // interface variable {
  //   [propName: string]: any
  // }
}