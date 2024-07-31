/*
 * @Description : components/TheWelcome 组件测试
 * @Author      : chenjianmin
 * @Date        : 2024-07-31 12:15:24
 */
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheWelcome from '@/components/TheWelcome.vue'

describe('TheWelcome', () => {
  it('renders properly', () => {
    const wrapper = mount(TheWelcome, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
