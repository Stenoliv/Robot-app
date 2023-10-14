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
    />
    

</template>

<style scoped>

</style>