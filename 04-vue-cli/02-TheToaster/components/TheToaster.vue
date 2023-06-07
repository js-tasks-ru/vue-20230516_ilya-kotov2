<template>
  <div class="toasts">
    <!-- Без :key работает не правильно. Не смог понять как это обойти -->
    <UiToast 
      v-for="toast in arrToasters" 
      :key="toast.id"
      :message="toast.message" 
      :toaster-type="toast.toasterType"
      @remove-toaster="removeToaster(toast.id)"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      arrToasters: [],
      counterId: 0,
    }
  },

  methods: {
    success(message) {
      this.arrToasters.push({message, toasterType: "success", id: this.counterId});
      this.counterId++;
    },

    error(message) {
      this.arrToasters.push({message, toasterType: "error", id: this.counterId});
      this.counterId++;
    },

    removeToaster(id) {
      this.arrToasters = this.arrToasters.filter(el => el.id !== id);
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
.toast + .toast {
  margin-top: 20px;
}
</style>
