/*
 * @Description : useAngular
 * @Usage       :
                  const count = useAngular(0)
                  count() // 访问值
                  count.set(1) // 设置值
                  count.update((v) => v + 1) // 通过前值更新
 * @Author      : chenjianmin
 * @Date        : 2024-09-08 20:23:22
 */

import { shallowRef } from 'vue'

export default function useAngular(initialValue) {
  const r = shallowRef(initialValue)
  const s = () => r.value
  s.set = (value) => {
    r.value = value
  }
  s.update = (updater) => {
    r.value = updater(r.value)
  }
  return s
}