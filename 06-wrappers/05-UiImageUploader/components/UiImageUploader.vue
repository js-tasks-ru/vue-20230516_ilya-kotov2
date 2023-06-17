<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': componentStatus === 'loading' }"
      :style="{ '--bg-url': `url('${imageLink}')` }"
      @[eventName].prevent="deleteImg"
    >
      <span class="image-uploader__text">{{ downloadStatus }}</span>
      <input
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="gettingFile"
        ref="input"
      />
    </label>
  </div>
</template>

<script>
const statuses = {
  download: 'Загрузить изображение',
  loading: 'Загрузка...',
  remove: 'Удалить изображение',
};

const linkBasicImg = '/link.jpeg';

export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      imageLink: null,
      componentStatus: 'download',
    };
  },

  methods: {
    gettingFile(event) {
      const file = event.target.files[0];
      const previousStatusLink = this.imageLink;
      this.imageLink = URL.createObjectURL(file);

      this.$emit('select', file);

      if (this.uploader) {
        this.uploaderFile(file, previousStatusLink);
      } else {
        this.determineState();
      }

      event.target.value = null;
    },

    uploaderFile(file, prevLink) {
      this.componentStatus = 'loading';

      this.uploader(file)
        .then(
          (result) => this.$emit('upload', result),
          (error) => {
            this.$emit('error', error);
            this.imageLink = prevLink;
          },
        )
        .finally(this.determineState);
    },

    determineState() {
      if (this.imageLink === linkBasicImg) {
        this.componentStatus = 'download';
      } else {
        this.componentStatus = 'remove';
      }
    },

    deleteImg() {
      this.imageLink = linkBasicImg;
      this.determineState();
      this.$emit('remove');
    },
  },

  computed: {
    downloadStatus() {
      return statuses[this.componentStatus];
    },

    eventName() {
      return this.componentStatus === 'remove' ? 'click' : null;
    },
  },

  created() {
    this.imageLink = this.preview ? this.preview : linkBasicImg;
    this.determineState();
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
