/**
 * @Description : 常量
 * @Use         : import { injectKey } from @/utils/keys
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 17:02:46
 */
import type { InjectionKey } from 'vue'

const injectKey = Symbol() as InjectionKey<string>

export {
  injectKey
}