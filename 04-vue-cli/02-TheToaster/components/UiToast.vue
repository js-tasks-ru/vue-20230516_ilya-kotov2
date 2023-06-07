<template>
    <div :class="toastClass">
      <UiIcon class="toast__icon" :icon="toastIcon" />
      <span>{{ message }}</span>
    </div>

</template>

<script>
import UiIcon from './UiIcon.vue';

const specificToaster = {
    'success': {class: 'toast_success', icon: 'check-circle'},
    'error': {class: 'toast_error', icon: 'alert-circle'},
};

export default {
    name: 'UiToaster',

    specificToaster,

    components: { UiIcon },

    props: {
        message: {
            type: String,
            required: true,
        },
        toasterType: {
            type: String,
            required: true,
        },
        timeToDelete: {
            type: Number,
            default: 5000,
        }
    },

    emits: [
        'removeToaster',
    ],

    methods: {
        closeToaster() {
            this.$emit('removeToaster');
        }
    },

    computed: {
        toastClass() {
            const resultClass = ["toast"];
            const newClass = this.$options.specificToaster[this.toasterType].class;
            resultClass.push(newClass);

            return resultClass;
        },

        toastIcon() {
            return this.$options.specificToaster[this.toasterType].icon;
        }
    },

    mounted() {
        setTimeout(() => this.closeToaster(), 
                this.timeToDelete
            );
    }
}
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>