<script setup>
import { ref } from 'vue';
import CodePreview from './components/CodePreview.vue';

const url = ref('https://www.viki.com/tv/38493c-dont-be-shy');
const info = ref({});
const error = ref(null);
const loading = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    const response = await fetch('/api/scraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url.value }),
    });
    const data = await response.json();
    info.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h1>Viki Scraper</h1>
    <form @submit.prevent="handleSubmit">
      <input type="url" v-model="url" />
      <input type="submit" :value="loading ? 'Scraping...' : 'Scrape'" :disabled="loading" />
    </form>
    <div v-if="error">{{ error }}</div>
    <CodePreview v-if="Object.keys(info).length" :code="info" :style="{ marginTop: '1rem' }" />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
}
.container {
  max-width: 1280px;
  margin: auto;
  padding: 1rem;
}
h1,
form {
  text-align: center;
}
input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0.5rem;
}
input[type='submit'] {
  background-color: #000;
  color: #fff;
  cursor: pointer;
}
</style>
