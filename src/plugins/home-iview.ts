import Vue from 'vue'
import {
  // Message,
  Layout,
  Header,
  Row,
  Col,
  Divider,
  Message
} from 'view-design'

// Vue.component('Button', Button)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Row', Row)
Vue.component('i-col', Col)
Vue.component('Divider', Divider)
Vue.prototype.$MessageShow = (type: string = 'info', contentV: string) => {
  (Message as any)[type]({
    content: contentV,
    background: true
  })
}
import 'view-design/dist/styles/iview.css'
