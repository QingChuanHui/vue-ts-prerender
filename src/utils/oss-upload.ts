// let OSS = require('ali-oss')
import OSS from 'ali-oss'
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIcrf89LXSK5ZA',
  accessKeySecret: 'MGf4mSolwgRbBhr9PTW8STd0KT6UkN',
  bucket: 'hzxv2-statics' // hbzf-sys hbzf-tmp-evidences  zft-v2-doc hzxv2-statics
})
/**
 * 根据路径和类别生成文件名称
 * @param {*} type
 * @param {*} path
 */
function storeAsType (fileName: string, path: string) {
  const spl = fileName.split('.')
  const type = '.' + spl[spl.length - 1]
  const atanisi = Math.floor(Math.random() * 999999)
  // 随机6位数
  const myDate = new Date()
  const tY = myDate.getFullYear()
  let tM: string = String(myDate.getMonth() + 1)
  if (tM.length === 1) {
    tM = '0' + tM
  }
  let tD = String(myDate.getDate())
  if (tM.length === 1) {
    tD = '0' + tD
  }
  let tH = String(myDate.getHours())
  if (tH.length === 1) {
    tH = '0' + tH
  }
  let tm = String(myDate.getMinutes())
  if (tm.length === 1) {
    tm = '0' + tm
  }
  let tS = String(myDate.getSeconds())
  if (tS.length === 1) {
    tS = '0' + tS
  }
  return path + '/' + tY + '-' + tM + '-' + tD + '/' + tH + tm + tS + atanisi + type
}
// /**
//  * 大于100 mb 可以使用 分片上传
//  * @param {} files
//  */
// export function ossmultipartUpload (files) {
//   let storeas = storeAs() // 文件名称
//   client.multipartUpload(storeas, files).then((result) => {
//     // console.log(result)
//   })
// }
/**
 * blob 传输
 * @param {*} files
 */
export function ossBlobUpload (files: any, path = 'hzxfile') {
  return new Promise((resolve, reject) => {
    const storeas = storeAsType(files.name, path) // 文件名称
    client.put(storeas, new Blob([files], { type: files.type })).then((result: any) => {
      resolve(result)
    }).catch((error: any) => {
      reject(error)
    })
  })
}
// /**
//  * 普通上传
//  * @param {*} files
//  * @param {*} type
//  */
// export function ossUpload(files: any, type: string, path = 'hzxfile') {
//   return new Promise((resolve, reject) => {
//     const storeas = storeAsType(type, path) // 文件名称
//     client.put(storeas, files).then((result: any) => {
//       resolve(result)
//     }).catch((error: any) => {
//       reject(error)
//     })
//   })
// }
