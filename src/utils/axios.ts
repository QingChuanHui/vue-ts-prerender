import axios from 'axios'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'
import qs from 'qs'
import { Message } from 'view-design'
// 创建axios实例
const service = axios.create({
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers.user_id =  getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (config.method === 'post') {
    if (!config.data.noQS) { // 保存时不需要通过qs加密
      config.data = qs.stringify(config.data)
    } else {
      delete config.data.noQS
    }
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
        removeToken()
        // Message.warning('登录信息丢失, 请重新登录')
        // removeToken()
        // store.commit('SET_TOKEN', '')
        // store.commit('SET_UserInfo', {})
        // store.dispatch('loginModalShow', true) // 登录信息丢失弹出登录框
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
      service.post(process.env.VUE_APP_BASEAPI + code, params)
        .then(response => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          resolve(response)
        }, err => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          (Message as any).warning({
            content: err.message,
            duration: 2,
            background: true
          })
          reject(err)
        })
        .catch((error) => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          (Message as any).error({
            content: error.message,
            duration: 2,
            background: true
          })
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
      service.get(process.env.VUE_APP_BASEAPI + code, params)
        .then(response => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          resolve(response)
        }, err => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          (Message as any).warning({
            content: err.message,
            duration: 2,
            background: true
          })
          reject(err)
        })
        .catch((error) => {
          if (loading) {
            store.dispatch('loadingShow', false)
          }
          (Message as any).error({
            content: error.message,
            duration: 2,
            background: true
          })
          reject(error)
        })
    })
  }
}
