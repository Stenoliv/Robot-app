<script>

import Restaurants from '../components/RestaurantsPage.vue';

export default {
    components: {
        Restaurants
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
    <RouterLink to="/">
        <span>Back</span>
    </RouterLink>
    <h1>{{ title }}</h1>
    <Restaurants
    />
    

</template>

<style scoped>

</style>