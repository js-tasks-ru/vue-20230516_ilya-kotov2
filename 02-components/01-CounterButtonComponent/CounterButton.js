import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие

  props: {
    count: {
      default: 0,
      type: Number,
    },
  },

  emits: ['update:count'],

  template: `<button 
              type="button" 
              @click="$emit('update:count', count + 1)"
              >
                {{ count }}
              </button>`,
});
