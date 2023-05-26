import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
      default: 'Demo meetup',
    },
    image: {
      type: String,
      required: false,
    },
  },

  computed: {
    styleImg() {
      return this.image ? {'--bg-url': `url(${this.image})`} : null;
    }
  },

  template: `
    <div class="meetup-cover" :style="styleImg">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
