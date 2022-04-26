<script setup>
import { ref } from 'vue';
import CodePreview from './components/CodePreview.vue';

const url = ref('https://www.viki.com/tv/38493c-dont-be-shy');
const info = ref({
  title: "Don't Be Shy",
  originalTitle: '心动不可耻 还很可爱, Countdown of Love, Shameless and Cute',
  image: 'https://6.vikiplatform.com/image/33f24045524f4be8a0853292a44cba7a/dummy.jpg',
  year: '2022',
  rating: '13',
  episodes: '9',
  genres: ['Romance', ' Fantasy'],
  cast: ['Lu Yun Feng', ' Zhao Huan Ran', ' Wen Mo Yan', ' Li Yu Tong'],
  synopsis:
    '\n        After her father dies, the ruthlessly ambitious businesswoman Shi Qian Jin (Li Yu Tong) takes over as the new CEO of the company he headed. But after a near-death experience, she has a terrible dream where she meets a Grim Reaper-like figure who tells her to change her life for the better. Worse still, he tells her that he will come back to take her life in just 30 days, and shows her a watch that ticks in reverse, counting down the fateful 30 days. When she wakes, she finds the watch is attached to her wrist and she cannot remove it – although it is visible only to her.As it ticks back, threatening her very existence, she makes a remarkable discovery. When she passes a store that is co-run by a pet mortician named Zhou Qing Yan (Lyu Yun Feng), the ticking stops. She tries to buy the store for a huge sum, but he refuses. However, their paths cross again later, and she realizes that it is Zhou Qing Yan’s presence – not the store itself – that has the power to stop (and even reverse) the time on the watch. She resolves to spend more time with him. When romance starts to spark, Shi Qian Jin starts to hope that her fate may not yet be sealed after all!“Don’t Be Shy” is a 2022 Chinese drama series that was directed by Tao Sheng.\n    ',
});
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
    <CodePreview :code="info" :style="{ marginTop: '1rem' }" />
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
