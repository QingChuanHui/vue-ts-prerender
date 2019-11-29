import 'view-design/dist/styles/iview.css'
import Vue from 'vue'
import {
  Button,
  Message,
  Layout,
  Header,
  Row,
  Col,
  Card,
  Input,
  Divider,
  Form,
  FormItem,
  Table,
  Page,
  Modal,
  Select,
  Option
} from 'view-design'

Vue.component('Button', Button)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
// Vue.component('Footer', Footer)
Vue.component('Row', Row)
Vue.component('i-col', Col)
Vue.component('Card', Card)
Vue.component('i-Input', Input)
Vue.component('Input', Input)
Vue.component('Divider', Divider)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.prototype.$MessageShow = (type: string = 'info', contentV: string) => {
  (Message as any)[type]({
    content: contentV,
    background: true
  })
}
Vue.prototype.$Modal = Modal
