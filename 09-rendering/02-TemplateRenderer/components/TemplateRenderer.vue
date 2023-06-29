<script>
import { h } from 'vue';
import { MyComponent } from '../createComponent';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    renderFunction() {
      return MyComponent(this.template, this.bindings, this.components);
    },
  },

  render() {
    return h(this.renderFunction);
  },
};
</script>
