/**
 * @Description : 常用方法函数
 * @Use         : import { formatDate } from @utils
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 17:02:46
 */

/**
 * 格式化时间 formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
 * @param {date} time new Date()
 * @param {string} format yyyy yy,MM M,dd d,HH H,mm m, ss s,
 * @return {String}
 */
function formatDate(time, format) {
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'H+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'f+': time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}
/**
 * 根据生日获取年龄，国际惯例按周岁算法计算
 * @param {number} y 年
 * @param {number} m 月
 * @param {number} d 日
 * @return {number} age 年龄
 */
function getAge(y, m, d) {
  // 周岁算法：出生时为零岁，每到一个公历生日长一岁
  // 虚岁算法：一出生一岁，每过一个春节长一岁
  const now = formatDate(new Date(), 'yyyy-MM-dd').split('-')
  const month = now[1] - m
  const day = now[2] - d
  let age = now[0] - y - 1
  if (month > 0 || (month === 0 && day > 0)) {
    age += 1
  }
  age = age >= 0 ? age : 0
  return age
}

// 获取数据类型 boolean array asyncfunction generatorfunction
function getTypeOf(obj) {
  const str = Object.prototype.toString.call(obj);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}
// 有效值
function truthy(val) {
  if (val && val != 'undefined' && val != 'null' && val != 'NaN') {
    return true
  }
  return false
}

// 数字加前缀 0
function fullNumber(n) {
  return n > 9 ? n : '0' + n
}
// 去除头尾空白字符
function trim(s) {
  return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
// 电话号码加 *
function encryptPhone(s){
  if (!s) {
    return '';
  }
  return s.slice(0, 3) + '****' + s.slice(7);
}
// 证件号加 *
function encryptId(s) {
  if (!s) {
    return '';
  }
  return s.slice(0, 4) + '****' + s.slice(s.length - 4)
}

// 随机字符串
function getRandomStr() {
  return Math.random().toString(36).substr(2, 15)
}
// 时间戳，字符串
function getTimeStamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}

// 解析地址获取参数
function getUrlParams(url, type) {
  let tag;
  if (document) {
    tag = document.createElement('a');
    tag.href = url;
  } else {
    tag = new URL(url);
  }

  if (type === 'urlPath') {
    return tag.origin + tag.pathname;
  }
  return {
    origin: tag.origin,
    protocol: tag.protocol,
    host: tag.host,
    hostname: tag.hostname,
    port: tag.port,
    pathname: tag.pathname,
    search: tag.search,
    hash: tag.hash,
  }
}
// 对象转字符串
function obj2str(obj, encode) {
  let str = ''
  Object.keys(obj).forEach(k => {
    str += `&${k}=${encode ? encodeURIComponent(obj[k]) : obj[k]}`
  })
  return str.slice(1)
}

export {
  formatDate,
  getAge,
  getTypeOf,
  truthy,
  fullNumber,
  trim,
  encryptPhone,
  encryptId,
  getRandomStr,
  getTimeStamp,
  getUrlParams,
  obj2str,
}
