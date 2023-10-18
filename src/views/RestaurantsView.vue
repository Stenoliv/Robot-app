<script>
import Restaurants from '../components/RestaurantsPage.vue';
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
    <RouterLink id="returnLink" to="/">
        <img id="return" src="src\assets\images\return-svgrepo-com.svg" alt="Return Image">
    </RouterLink>
    <h1>{{ title }}</h1>
    <Restaurants />
</template>

<style scoped>
h1 {
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    font-size: 45px;
}

#returnLink {
    position:absolute;
    top: 0;
    width: 10vw;
    height: 5vh;
    background-color: white;
    font-size: 50px;
    padding: 10px;
    border-bottom-right-radius: 10px;
    display: inline-block;
}
#returnLink:hover {
    background-color: rgb(215, 215, 215);
}

#return {
    width: 10vw;
    height: 5vh;
}
</style>