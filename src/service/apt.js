/*
 * @Description  : 挂号订单相关-server
 * @Author       : chenjianmin
 * @Date         : 2020-12-29 16:37:02
 * @LastEditTime: 2023-04-03 19:43:39
 */

import { inject } from 'vue'

const $axios = inject('$axios')
const api = '/gj/v1'

// 获取挂号订单数据-预约结果页融合 ih 获取更准确预约状态
const getAptOrder = async (data) => {
  return await $axios(`${api}/apt_order`, {
    params: data
  })
}

// 获取全部挂号订单数据-订单列表页
const getAptOrderAll = async (data) => {
  return await $axios.post(`${api}/apt_order`, data)
}

// 获取今天以及以后预约的数量
const getAptNum = async () => {
  return await $axios(`${api}/apt_num`)
}

export {
  getAptOrder,
  getAptOrderAll,
  getAptNum,
}
