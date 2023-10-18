<script>
import Restaurants from '@/components/RestaurantsPage.vue';
import { RouterLink } from 'vue-router';

export default {
    components: {
        Restaurants,
        RouterLink
    },
    data() {
        return {
            title: "Restaurants for your pleasure!",
            res: [
                {restaurant: ""},
            ]
        }
    },
    mounted() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Lat: " + position.coords.latitude + " Lon: " +  position.coords.longitude);
    });
  }
}
</script>


<template>
    <div class="restaurant-container-main">
        <RouterLink class="back-button" to="/">
            Back
        </RouterLink>
        <h1>{{ title }}</h1>
        <div class="get-restaurants-button" type="button" @click="this.$refs.restaurants.getLocation">Get Restaurants</div>
    </div>
    <Restaurants ref="restaurants" />
</template>

<style scoped>
* {
    --top-button-border-radius: 20px;
    --top-buttons-width: 20vw;
    --top-bar-height: 5vh;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.restaurant-container-main {
    width: 100%;
    height: var(--top-bar-height);
    background-color: rgb(99, 99, 99);
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: wheat;
    box-shadow: 0 5px 50px black;
}

.back-button {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--top-buttons-width);
    height: var(--top-bar-height);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: wheat;
    text-decoration: none;
    border-radius: 0px 0px var(--top-button-border-radius) 0px;
    font-size: 1.75rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.get-restaurants-button {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--top-buttons-width);
  height: var(--top-bar-height);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
  text-decoration: none;
  border-radius: 0px 0px 0px var(--top-button-border-radius);
  font-size: 1.75rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#return {
    width: 10vw;
    height: 5vh;
}
</style>