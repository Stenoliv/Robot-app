<script>
import HomePageButton from '@/components/HomePageButton.vue'

export default {
  components: {
    HomePageButton
  },
  data() {
    return {
      buttons: [
        { question: 'Do you want to cook food yourself?', link: 'recipe', image: 0 },
        { question: 'Or eat at a nearby restaurant?', link: 'restaurant', image: 1 },
        { question: 'Or spin the wheel for a random option', link: 'random', image: 2 }
      ]
    }
  }
}
</script>

<template>
  <div class="main" id="app">
    
    <div class="header" style="font-family: Orbitron; letter-spacing:7px;">HungerBot<img id="mainLogo" src="@\assets\images\hungerbot.png" alt="HungerBot logo"></div>
    
    <div class="buttons">
      <div class="title">Don't know what to eat? I can help!</div>
      <HomePageButton v-for="button in buttons" :key="button" v-bind="button" />
    </div>
  </div>
</template>

<style scoped>
/* Main page style \/ */

#mainLogo {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}

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
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items:center;
}

/* restaurant, recipe and random buttons style \/ */

.title {
  text-align-last: justify;
  font-size: 4vw;
  padding-top: 0.5em;
  width: 100%;
  max-lines: 1;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
