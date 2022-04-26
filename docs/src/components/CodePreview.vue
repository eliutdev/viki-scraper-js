<template>
  <div class="code-preview">
    <pre v-html="preview"></pre>
  </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
  props: {
    code: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    preview() {
      const text = JSON.stringify(this.code, null, 2);
      return hljs.highlight(text, { language: 'json' }).value;
    },
  },
};
</script>

<style scoped>
.code-preview {
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  overflow-x: auto;
}
.dark .code-preview {
  border-color: #222;
}
</style>
