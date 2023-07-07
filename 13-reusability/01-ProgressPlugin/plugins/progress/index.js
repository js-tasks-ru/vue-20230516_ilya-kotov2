import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const createNewConteiner = () => document.body.appendChild(document.createElement('div'));
  const progress = createApp(TheTopProgressBar).mount(container ?? createNewConteiner());

  if (router) {
    router.beforeEach((to, from) => {
      progress.start();
    });

    router.afterEach((to, from) => {
      progress.finish();
    });

    router.onError(progress.fail);
  }

  progress.install = (app) => {
    app.component('TheTopProgressBar', TheTopProgressBar);
    app.provide(PROGRESS_KEY, progress);
  };

  return progress;
}
