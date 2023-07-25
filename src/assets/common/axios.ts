/*
 * @Description : d
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 18:25:22
 */
import axios from 'axios'

// axios.defaults.withCredentials = true // 是否携带cookie信息

// 添加请求拦截器
axios.interceptors.request.use(
  (req) => {
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.data && res.data.code >= 400) {
      // Vue.prototype.$toast(res.data.msg)
    }

    return res.data
  },
  (err) => {
    Promise.reject(err)
  }
)

// 用于请求之前对请求数据进行操作
/* axios.defaults.transformRequest = [function (data) {
  var ret = []
  for (var it in data) {
    ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
  }
  return ret.join('&')
}] */

export default axios
