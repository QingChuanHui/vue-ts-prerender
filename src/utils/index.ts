// /**
//  * 工具类
//  */
// const smalltoBIG = function smalltoBIG (n) {
//   const fraction = ['角', '分']
//   const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
//   const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
//   const head = n < 0 ? '欠' : ''
//   n = Math.abs(n)
//   var s = ''
//   for (var i = 0; i < fraction.length; i++) {
//     s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
//   }
//   s = s || '整'
//   n = Math.floor(n)
//   for (let i = 0; i < unit[0].length && n > 0; i++) {
//     var p = ''
//     for (var j = 0; j < unit[1].length && n > 0; j++) {
//       p = digit[n % 10] + unit[1][j] + p
//       n = Math.floor(n / 10)
//     }
//     s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
//   }
//   return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
// }
const parseTime = (time: any, cFormat: string) => {
  let timev = time
  if (!timev) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof timev === 'object') {
    date = timev
  } else {
    if (('' + timev).length === 10) { timev = timev * 1000 }
    date = new Date(timev)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timevstr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timevstr
}

const formatTime = (timeValue: any, option: string) => {
  // timeValue = +timeValue * 1000
  const timev = +timeValue * 1000
  const d = new Date(timev)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(timev, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// const getLocalStorage = (...args) => {
//   const storage = {}
//   for (const arg of args) {
//     storage[arg] = window
//       .localStorage
//       .getItem(arg) || ''
//   }
//   return storage
// }

// const setLocalStorage = (data) => {
//   for (const prop in data) {
//     window
//       .localStorage
//       .setItem(prop, data[prop])
//   }
// }

// const removeLocalStorage = (...args) => {
//   for (const arg of args) {
//     window
//       .localStorage
//       .removeItem(arg)
//   }
// }
// // sessionStorage 保存
// const getSessionStorage = (...args: any) => {
//   const storage = {}
//   for (const arg of args) {
//     storage[arg] = window
//       .sessionStorage
//       .getItem(arg) || ''
//   }
//   return storage
// }

// const setSessionStorage = (data: any) => {
//   for (const prop in data) {
//     window.sessionStorage.setItem(prop, data[prop])
//   }
// }
/**
 * 获取url参数
 * @param {*} name  参数名
 */
const getLocationParam = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window
    .location
    .hash.split('?')[1]
    .match(reg)
  if (r != null) { return decodeURIComponent(r[2]) }
  return ''
}
/**
 * 生成GUID
 * @returns {*}
 */
const guid = function newGuid() {
  let guida = formatTime(new Date(), 'yyyyMMdd-HHmm-ss')
  for (let i = 1; i <= 18; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    guida += n
    if ((i === 2) || (i === 6) || (i === 10)) {
      guida += '-'
    }
  }
  return guida
}

// /**
//  * 深度复制 数组 数组中的对象
//  * @param {*} source 数据
//  */
// const objDeepCopy = function objDeepCopy (source) {
//   var sourceCopy = source instanceof Array ? [] : {}
//   for (var item in source) {
//     // if (source[item] === null) sourceCopy[item] = null
//     // else if (source[item] === null) sourceCopy[item] = null
//     sourceCopy[item] = (source[item] === null ? null : (typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]))
//   }
//   return sourceCopy
// }

/**
 * 保留小数位数方法
 * @param number 数
 * @param defaultBit  默认的小数位数
 * @returns
 */
const numberFixed = function NumberFixed(numberValue: any, defaultBit = 0) {
  if (numberValue === 'Infinity' || isNaN(numberValue) || numberValue === undefined || numberValue == null) {
    return 0
  }
  let n = 2
  if (defaultBit !== 0) { // 有默认小数位数读取默认
    n = defaultBit
  }
  return +(+numberValue).toFixed(n)
}

// const localStorageTool = {// localstorage 的方法
//   getLocalStorage,
//   setLocalStorage,
//   removeLocalStorage
// }
// const sessionStorageTool = {// sessionStorageTool 的方法
//   getSessionStorage,
//   setSessionStorage
// }
// /**
//  * @param {Array} arr1
//  * @param {Array} arr2
//  * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
//  */
// const getUnion = (arr1, arr2) => {
//   return Array.from(new Set([...arr1, ...arr2]))
// }

// export const forEach = (arr, fn) => {
//   if (!arr.length || !fn) return
//   let i = -1
//   let len = arr.length
//   while (++i < len) {
//     let item = arr[i]
//     fn(item, i, arr)
//   }
// }

// /**
//  * @param {Array} arr1
//  * @param {Array} arr2
//  * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
//  */
// export const getIntersection = (arr1, arr2) => {
//   let len = Math.min(arr1.length, arr2.length)
//   let i = -1
//   let res = []
//   while (++i < len) {
//     const item = arr2[i]
//     if (arr1.indexOf(item) > -1) res.push(item)
//   }
//   return res
// }
const isExplorer = (exp: string) => {
  const ua = window.navigator.userAgent
  return ua.indexOf(exp) > -1
}
/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  if (ua.indexOf('MSIE') > -1) {
    return 'IE'
  } else if (ua.indexOf('Firefox') > -1) {
    return 'Firefox'
  } else if (ua.indexOf('Chrome') > -1) {
    return 'Chrome'
  } else if (ua.indexOf('Opera') > -1) {
    return 'Opera'
  } else if (ua.indexOf('Safari') > -1) {
    return 'Safari'
  }
}

// /**
//  * @description 绑定事件 on(element, event, handler)
//  */
// export const on = (function () {
//   if (document.addEventListener) {
//     return function (element, event, handler) {
//       if (element && event && handler) {
//         element.addEventListener(event, handler, false)
//       }
//     }
//   } else {
//     return function (element, event, handler) {
//       if (element && event && handler) {
//         element.attachEvent('on' + event, handler)
//       }
//     }
//   }
// })()

// /**
//  * @description 解绑事件 off(element, event, handler)
//  */
// export const off = (function () {
//   if (document.removeEventListener) {
//     return function (element, event, handler) {
//       if (element && event) {
//         element.removeEventListener(event, handler, false)
//       }
//     }
//   } else {
//     return function (element, event, handler) {
//       if (element && event) {
//         element.detachEvent('on' + event, handler)
//       }
//     }
//   }
// })()
/**
 * 获取文件类型方法
 * @param {*} fileName文件名称
 */
export const getFileType = (name: string) => {
  const imgExt = ['png', 'jpg', 'jpeg', 'gif'] // 图片文件的后缀名
  const i = name.lastIndexOf('.')
  let ext = ''
  if (i > -1) {
    ext = name.substring(i + 1)
  }
  if (imgExt.indexOf(ext) >= 0) { // 图片类型的判断
    return 1
  } else if (ext === 'mp4') { // 视频类型的判断
    return 3
  } else if (ext === 'mp3') {
    return 2
  } else {
    return 4
  }
}

export {
  // localStorageTool, // localstorage 工具
  getLocationParam,
  // sessionStorageTool, // sessionstorage 工具
  parseTime,
  formatTime,
  // NumberFixed, // 保留小数位数 js减法计算问题
  // objDeepCopy, // 深度复制
  // Guid, // 生成juid
  // getUnion,
  // smalltoBIG // 人民币转大写
}
/**
 * 返回文件名称
 * @param {*} url
 */
export const getFileName = (url: string) => {
  const fileNames = url.split('/')
  return fileNames[fileNames.length - 1]
}
/**
 * 下载文件
 * @param {*} url
 */
export const downloadWord = (url: string) => {
  const elemIF = document.createElement(`iframe`)
  elemIF.src = url
  elemIF.style.display = `none`
  document.body.appendChild(elemIF)
}
