import axios from '@/utils/axios'

/**
 * 4.1 问题列表
 * @param {*参数} param
 */
export function questionList(param: any) {
  param.noQS = 1
  return axios.fetchPost('question/list', param)
}
/**
 * 4.3 删除问题
 * @param {*参数} param
 */
export function questionDelete(param: any) {
  return axios.fetchPost('question/delete', param)
}
/**
 * 4.5 问题详情（含答案）
 * @param {*参数} param
 */
export function questionInfo(param: any) {
  return axios.fetchPost('question/info', param)
}
/**
 * 4.2 新增问题
 * @param {*参数} param
 */
export function questionAdd(param: any) {
  param.noQS = 1
  return axios.fetchPost('question/add', param)
}
/**
 * 4.4 回答问题
 * @param {*参数} param
 */
export function questionAnswer(param: any) {
  param.noQS = 1
  return axios.fetchPost('question/answer', param)
}
