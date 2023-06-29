import { defineComponent, compile } from 'vue';

export default function MyComponent(template, bindings, components) {
  return defineComponent({
    components,

    data() {
      return {
        bindings,
      };
    },

    render: compile(template),
  });
}
