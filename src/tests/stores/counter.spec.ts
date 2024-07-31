/*
 * @Description : stores/counter 测试
 * @Author      : chenjianmin
 * @Date        : 2024-07-31 12:15:29
 */
import { describe, it, expect, beforeEach } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useStoreCounter } from '@/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    // 而不需要手动传递：`useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const storeCounter = useStoreCounter()
    expect(storeCounter.count).toBe(0)
    storeCounter.increment()
    expect(storeCounter.count).toBe(1)
  })

  it('increments by amount', () => {
    const storeCounter = useStoreCounter()
    storeCounter.increment(10)
    expect(storeCounter.count).toBe(10)
  })
})