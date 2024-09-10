/*
 * @Description  : 挂号订单相关-server
 * @Author       : chenjianmin
 * @Date         : 2020-12-29 16:37:02
 * @LastEditTime: 2024-09-04 15:50:27
 */

import $axios from '@/utils/axios'

const api = 'https://coopmain.reader.qq.com'

// 获取全部挂号订单数据-订单列表页
const getAdConfig = async () => {
  return await $axios.post(`${api}/browser/huawei/adConfig`)
}

export {
  getAdConfig
}
