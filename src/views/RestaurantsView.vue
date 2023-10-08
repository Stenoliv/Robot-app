<script>
import Restaurants from '../components/Restaurants.vue';

export default {
    components: {
        Restaurants
    },
    data() {
        return {
            title: "Restaurants for your pleasure!",
            res: [
                {restaurant: "Unicafe Oliva", place:"Centrum"},
                {restaurant: "Unicafe Kaivopiha", place:"Centrum"},
                {restaurant: "McDonalds", place:"Centrum"},
                {restaurant: "Subway", place:"Centrum"},
                {restaurant: "Umeshu", place:"Centrum"},
                {restaurant: "Luckiefun", place:"Centrum"},
                {restaurant: "Burger King", place:"Centrum"},
            ]
        }
    }
}
</script>

<template>
    <RouterLink to="/">
        <span>Back</span>
    </RouterLink>
    <h1>{{ title }}</h1>
    <div>This is where the map comes</div>
    <div id="map"></div>
    <Restaurants
    v-for="r in res" :key="r" v-bind="r"
    />
    <!--<button type="button" @click.prevent="findRestaurants">GetRestaurants</button>-->

</template>

<style scoped>

</style>