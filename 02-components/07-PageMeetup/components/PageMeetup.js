import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data() {
    return {
      result: null,
      error: null,
    };
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  watch: {
    meetupId: {
      handler() {
        this.result = null;
        this.error = null;

        fetchMeetupById(this.meetupId)
          .then((results) => (this.result = results))
          .catch((err) => (this.error = err.message));
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="result" :meetup="result"/>
      
      <UiContainer v-else-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
    </div>`,
});
