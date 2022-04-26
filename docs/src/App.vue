<script setup>
import { ref } from 'vue';

const url = ref('https://www.viki.com/tv/38493c-dont-be-shy');

const handleSubmit = async () => {
  const response = await fetch('/api/scraper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url.value }),
  });
  const info = await response.json();
  console.log(info);
};
</script>

<template>
  <h1>Viki Scraper</h1>
  <form @submit.prevent="handleSubmit">
    <input type="url" v-model="url" />
    <input type="submit" value="Scrape" />
  </form>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
