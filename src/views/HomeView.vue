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
  <div class="main">
    <div class="header-container" style="font-family: Orbitron; letter-spacing:7px;">
      <div class="header-text">
        HungerBot
        <img id="mainLogo" src="@\assets\images\hungerbot.png" alt="HungerBot logo">
      </div>
      <div class="horizontal-line"></div>
      <div class="title">Don't know what to eat? I can help!</div>
    </div>
    <div class="buttons">
      <HomePageButton v-for="button in buttons" :key="button" v-bind="button" />
    </div>
  </div>
</template>

<style scoped>
/* Main page style \/ */
* {
  --gap: 5vh;
}

.main {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

/* Page Header style */

.header-container {
  margin: 0;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 0;
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.header-text {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 8vh;
  margin: 0;
  padding: 0;
  width: 70%;
  padding-left: 15%;
}

#mainLogo {
  padding: 0;
  margin: 0;
  width: 6vh;
  height: 6vh;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}

.horizontal-line {
  width: 100%;
  border-bottom: 4px solid white;
}

.title {
  text-align-last: justify;
  overflow: hidden;
  font-size: 3vw;
  letter-spacing: 0.3vw;
  max-lines: 1;
  padding: 0;
  margin: 0;
  width: 70%;
  padding-left: 15%;
  padding-right: 15%;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}


/* restaurant, recipe and random buttons style \/ */

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  height: 60vh;
  width: 70%;
}

/* Responsive */
@media screen and (max-width: 1000px){

  .header-container {
    height: 15vh;
  }
  .header-text {
    font-size: 3dvh;
  }
  #mainLogo {
    width: 4dvh;
    height: 4dvh;
  }
  .title {
    font-size: 2.5dvh;
    text-align-last: auto;
  }
}

@media screen and (max-height: 700px) {
  * {
    --gap: 1em;
  }
  
  .main {
    flex-direction: row;
  }

  .header-container {
    width: 40%;
    height: 100vh;
    margin-top: 0;
    margin-bottom: 0;
  }

  .header-text {
    font-size: 2vw;
  }
  #mainLogo {
    width: 3dvw;
    height: 3dvw;
  }

  .horizontal-line {
    width: 90%;
    margin: 0 auto;
  }

  .title {
    width: 70%;
    padding-left: 15%;
    font-size: 2vw;
    max-lines: 2;
    text-align-last: auto;
    letter-spacing: 0.2vw;
  }

  .buttons {
    height: 100vh;
    margin-left: 5%;
    margin-right: 2%;
  }
  
  @media screen and (max-width: 800px){

    .main {
      flex-direction: column;
    }

    .header-container {
      width: 100%;
      height: 20vh;
      margin-top: 0;
      margin-bottom: 0;
    }

    .header-text {
      font-size: 5vw;
    }

    .buttons {
      height: 70vh;
      margin-left: 5%;
      margin-right: 2%;
    }
  }
}
</style>
