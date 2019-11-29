import Vue from 'vue'
import home from './page-home.vue'
import router from './router'
import '../plugins/home-iview.ts'
import '@/assets/scss/index.scss'
import { parseTime } from '@/utils'
Vue.config.productionTip = false
Vue.filter('timeParse', parseTime)
new Vue({
  router,
  render: (h) => h(home),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#home')
