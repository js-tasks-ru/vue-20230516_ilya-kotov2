<template>
  <button @click="addCounter">{{ localCounter }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCounter: this.count,
    };
  },

  methods: {
    addCounter() {
      this.localCounter += 1;
      this.$emit('update:count', this.localCounter);
    },
  },

  watch: {
    count() {
      this.localCounter = this.count;
    },
  },
};
</script>
