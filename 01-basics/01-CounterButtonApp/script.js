import { createApp } from './vendor/vue.esm-browser.js';


// Создайте Vue приложение
const app = createApp({
    data() {
        return {
            title: 0,
        }
    }
});
const vm = app.mount('#app');