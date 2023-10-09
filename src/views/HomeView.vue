<script>
import HomePageButton from '@/components/HomePageButton.vue'

export default {
  components: {
    HomePageButton
  },
  data() {
    return {
      buttons: [
        { question: 'Do you want to cook food yourself?', link: 'recipe' },
        { question: 'Or eat at a nearby restaurant?', link: 'restaurant' },
        { question: 'Or spin the wheel for a random option', link: 'random' }
      ]
    }
  }
}
</script>

<template>
  <div class="main" id="app">
    <div class="header">HungerBot</div>
    <div class="buttons">
      <div class="title">Don't know what to eat? I can help!</div>
      <HomePageButton v-for="button in buttons" :key="button" v-bind="button" />
    </div>
  </div>
</template>

<style scoped>
/* Main page style \/ */

.main {
  margin: 0;
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 100%;
}

/* Page Header style */

.header {
  margin: 0;
  padding: 0;
  border-bottom: 2px solid white;
  margin-left: -10%;
  margin-right: -10%;
  padding-left: 10%;
  font-size: 5vw;
}

/* restaurant, recipe and random buttons style \/ */

.title {
  text-align-last: justify;
  font-size: 4vw;
  padding-top: 0.5em;
  width: 100%;
  max-lines: 1;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  height: 80%;
}
</style>
