/*
 * @Description : useVModel
 * @Author      : chenjianmin
 * @Date        : 2024-09-10 16:35:07
 */
import { getCurrentInstance } from 'vue';

export default function useVModel<P extends object, K extends keyof P>(props: P, key?: K) {
  const instance = getCurrentInstance();
  const emit = instance?.emit;
  key = 'modelValue' as K

  if (!emit) {
    throw new Error('Cannot access emit outside of a setup function or a component lifecycle hook.');
  }

  return computed<P[K]>({
    get() {
      return props[key]
    },
    set(v) {
      emit(`update:${key!.toString()}`, v)
    }
  })
}