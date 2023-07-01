<template>
  <div class="pagination-container">
    <ul>
      <li v-for="onePage in currentPages" :key="onePage.id">
        <slot :item="onePage" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    currentPages() {
      return this.items.slice(this.page, this.page + this.perPage);
    },
  },
};
</script>

<style></style>
