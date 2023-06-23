import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => computed(() => {
    


    const localArgs = args.map(el => isRef(el) ? el.value : el);

    /* const localArgs = [];
    for (let arg of args) {
      if (isRef(arg)) {
        localArgs.push(arg.value)
      } else {
        localArgs.push(arg)
      }
    } */

    
    return func(...localArgs)
  });
}
