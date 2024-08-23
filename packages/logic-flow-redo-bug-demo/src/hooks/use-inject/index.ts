import { inject, ref, type InjectionKey, type Ref } from 'vue';

/**
 * 注入 Ref 响应式类型的数据，会添加一个空的响应式数据的默认值
 * @param key 要获取的 key
 * @returns
 */

export function useInjectRef<T>(key: InjectionKey<Ref<T>>) {
  return inject(key, ref());
}
