import axios from '@/utils/axios'

/**
 * 登录接口
 * @param {*参数} param
 */
export function login(param: any) {
  return axios.fetchPost('/user/login', param, false)
}
