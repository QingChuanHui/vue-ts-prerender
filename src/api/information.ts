import axios from '@/utils/axios'

/**
 * 信息列表
 * @param {*参数} param
 */
export function informationList(param: any) {
  param.noQS = 1
  return axios.fetchPost('information/list', param)
}
/**
 * 2.9 上传评估报告或者保单
 * @param {*参数} param
 */
export function informationUpload(param: any) {
  return axios.fetchPost('information/file/upload', param)
}

/**
 * 2.10 删除某条信息
 * @param {*参数} param
 */
export function informationDelete(param: any) {
  return axios.fetchPost('information/delete', param, false)
}

/**
 * 2.1 市区下拉框绑定
 */
export function cityData() {
  return axios.fetchPost('information/select/city', {}, false)
}
/**
 * 2.2 县区下拉框绑定
 * @param {*参数} param
 */
export function countyData(param: any) {
  return axios.fetchPost('information/select/county', param, false)
}

/**
 * 2.3 行业大类下拉框绑定
 */
export function bigClassData() {
  return axios.fetchPost('information/select/bigClass', {}, false)
}

/**
 * 2.4 行业小类下拉框绑定
 *  * @param {*参数} param
 */
export function smallClassData(param: any) {
  return axios.fetchPost('information/select/smallClass', param, false)
}

/**
 * 2.5 风险等级下拉框绑定
 */
export function riskLevelData() {
  return axios.fetchPost('information/select/riskLevel', {}, false)
}
/**
 * 2.6 保险公司下拉框绑定
 */
export function insuranceCompanyData() {
  return axios.fetchPost('information/select/insuranceCompany', {}, false)
}
/**
 * 2.7 经济公司下拉框绑定
 */
export function economicCompanyData() {
  return axios.fetchPost('information/select/economicCompany', {}, false)
}
