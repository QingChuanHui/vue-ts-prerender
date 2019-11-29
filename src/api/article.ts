import axios from '@/utils/axios'

/**
 * 信息列表
 * @param {*参数} param
 */
export function articleList(param: any) {
  param.noQS = 1
  return axios.fetchPost('article/list', param)
}
/**
 * 文章类型3.1 所属栏目下拉框绑定
 */
export function articleType() {
  return axios.fetchPost('article/type/list', {})
}
/**
 * 3.4 删除
 * @param {*参数} param
 */
export function articleDelete(param: any) {
  return axios.fetchPost('article/delete', param)
}
/**
 * 3.5 详情
 * @param {*参数} param
 */
export function articleInfo(param: any) {
  return axios.fetchPost('article/info', param)
}
/**
 * 3.3 编辑
 * @param {*参数} param
 */
export function articleEdit(param: any) {
  param.noQS = 1
  return axios.fetchPost('article/edit', param)
}
