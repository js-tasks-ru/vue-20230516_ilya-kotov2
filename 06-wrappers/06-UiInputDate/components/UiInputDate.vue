<template>
  <UiInput 
  v-model="modelValueProxy"
  :type="type"
  :step="step"
  ref="inputUi"
  >
    <template v-for="key in Object.keys($slots)" #[key]>
      <slot :name="key" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: [null, Number],
    step: String,
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        const date = new Date(this.modelValue);

        const year = String(date.getUTCFullYear());
        let month = String(date.getUTCMonth() + 1);
        month = month.padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        
        if (this.type === "date") {
          return `${year}-${month}-${day}`;
        } else if (this.type === "time") {
          return `${hours}:${minutes}`;
        } else {
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        }
      },

      set(value) {
        const time = this.$refs.inputUi.$refs.input.valueAsNumber;
        this.$emit('update:modelValue', time);
      },
    },
  },
};
</script>
