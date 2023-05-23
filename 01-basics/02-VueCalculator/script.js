import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const app = createApp({
  data() {
    return {
      firstNumber: null,
      secondNumber: null,
      mathSign: '',
    };
  },

  computed: {
    calculationResult() {
      let result = 0;
      
      switch (this.mathSign) {
        case 'sum':
          result = parseInt(this.firstNumber) + parseInt(this.secondNumber);
          break;
        case 'subtract':
          result = this.firstNumber - this.secondNumber;
          break;
        case 'multiply':
          result = this.firstNumber * this.secondNumber;
          break;
        case 'divide':
          result = this.firstNumber / this.secondNumber;
          break;
      }

      return result;
    },
  },
});

const vm = app.mount('#app');
