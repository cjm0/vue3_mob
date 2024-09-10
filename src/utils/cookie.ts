/**
 * @Description : 封装 cookie 方法
 * @Use         : import { getCookie } from @utils/cookie
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 17:02:46
 */

interface Cookie {
  name: string,
  value: string,
  domain?: string,
  path?: string,
  day?: number
}

const getCookie = (name:Cookie['name']):Cookie['value'] => {
  const value = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)')
  return value ? decodeURIComponent(value[1]) : ''
}

const setCookie = (option:Cookie):void => {
  let str = option.name + '=' + encodeURIComponent(option.value)
  if (option.domain) {
    str += '; domain=' + option.domain
  }
  if (option.path) {
    str += '; path=' + option.path
  }
  if (option.day) {
    const time = new Date()
    time.setTime(time.getTime() + option.day * 24 * 60 * 60 * 1000)
    str += '; expires=' + time.toUTCString()
  }
  document.cookie = str
}

const clearCookie = (name:Cookie['name']):void => {
  setCookie({
    name: name,
    value: getCookie(name),
    day: -1,
  })
}

export {
  getCookie,
  setCookie,
  clearCookie,
}
