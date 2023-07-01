<template>
  <template v-if="result">
    <slot name="fulfilled" :result="result" />
  </template>
  <template v-else-if="error">
    <slot name="rejected" :error="error" />
  </template>

  <template v-else>
    <slot name="pending" />
  </template>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      handler() {
        this.result = null;
        this.error = null;

        this.promise.then(
          (result) => (this.result = result),
          (error) => (this.error = error),
        );
      },
      immediate: true,
    },
  },
};
</script>
