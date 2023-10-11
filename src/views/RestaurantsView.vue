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
                {restaurant: "Fisa"},
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
    <Restaurants
    v-for="r in res" :key="r" v-bind="r"
    />
    

</template>

<style scoped>

</style>