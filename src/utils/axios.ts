import axios from 'axios'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'
// import qs from 'qs'
// 创建axios实例
const service = axios.create({
  timeout: 15000 // 请求超时时间
})
const getApi = () => {
  // console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') { // 发布版本
    if (window.location.host.indexOf('t') >= 0) {
      return process.env.VUE_APP_TESTAPI
    } else {
      return process.env.VUE_APP_BASEAPI
    }
  } else {
    return process.env.VUE_APP_TESTAPI
    // return process.env.VUE_APP_BASEAPI
  }
}
const warningModal = (content: string, title: string = '数据提示') => {
  // Modal.warning({
  //   title: title,
  //   content: content,
  //   duration: 0,
  //   scrollable: true,
  //   closable: true // esc 可以关闭
  // })
}
// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    // if (!config.data.noQS) { // 保存时不需要通过qs加密
    //   config.data = qs.stringify(config.data)
    // } else {
    //   delete config.data.noQS
    // }
  }
  return config
}, error => {
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 2000) { // 不等于2000是错误异常
      if (res.code === 401) { // token失效需要重新登录
        // Modal.warning({
        //   title: '登录',
        //   content: '登录信息丢失, 请重新登录',
        //   duration: 0,
        //   scrollable: true,
        //   closable: true, // esc 可以关闭
        //   onOk: () => {
        //     // this.messageDel()
        //     removeToken()
        //     store.commit('SET_TOKEN', '')
        //     store.commit('SET_UserInfo', {})
        //     // setTimeout(() => {
        //     //   window.location.reload()
        //     // }, 1000)
        //     store.dispatch('loginModalShow', true)
        //   }
        // })
      } else {
        return Promise.reject(res)
      }
    } else {
      return response.data
    }
  },
  error => {
    // console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default {
  // 封装POST请求
  fetchPost: (code: string, params: any, loading: boolean = true) => {
    return new Promise((resolve, reject) => {
      if (loading) {
        store.dispatch('loadingShow', true)
      }
      let urlIP = getApi() + code
      if (store.getters.token) {
        urlIP = urlIP + '?access_token=' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      service.post(urlIP, params)
        .then(response => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          resolve(response)
        }, err => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          warningModal(err.message)
          reject(err)
        })
        .catch((error) => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          warningModal(error.message)
          reject(error)
        })
    })
  },
  // 封装GET请求
  fetchGet: (code: string, params: any, loading = true) => {
    return new Promise((resolve, reject) => {
      if (loading) {
        store.dispatch('loadingShow', true)
      }
      service.get(getApi() + code + '?access_token=' + getToken(), params)
        .then(response => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          resolve(response)
        }, err => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          warningModal(err.message)
          reject(err)
        })
        .catch((error) => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          warningModal(error.message)
          reject(error)
        })
    })
  }
}
