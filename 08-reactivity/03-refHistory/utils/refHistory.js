import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([source.value]);

  watch(
    source,
    (newVal, oldVal) => {
      history.value = [...history.value, newVal]
    },
    { flush: 'sync' },
    { immediate: true }
  );

  return { history };
}
