<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  props: ['question', 'link','image'],
}
</script>

<template>
  <RouterLink :to="link" class="button-box recipe">
    <div class="question">{{ question }}</div>
    <img :id="question" class="home-img" v-if="this.image == 0" src="@/assets/images/recipe.jpg" alt="recipe-img" />
    <img :id="question" class="home-img" v-if="this.image == 1" src="@/assets/images/restaurant.jpg" alt="recipe-img" />
    <img :id="question" class="home-img" v-if="this.image == 2" src="@/assets/images/random.jpg" alt="recipe-img" />
  </RouterLink>
</template>

<style scoped>
.button-box {
  position: relative;
  width: 99%;
  height: 20%;
  z-index: 10;
  background-color: var(--interact-color);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  border: 3px solid black;
  color: white;
}

.question {
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  width: 20%;
  height: 100%;
  font-size: 2vw;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.home-img {
  position: absolute;
  inset: 0 0;
  width: 80%;
  height: 100%;
  clip-path: polygon(0 100%, 90% 100%, 100% 0, 0 0);
  object-fit: cover;
}

/* Button animation effects */

.button-box::after {
  content: '';
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.button-box:hover {
  transform: scale(1.05, 1.05);
}

.button-box:hover::after {
  opacity: 1;
}
</style>
