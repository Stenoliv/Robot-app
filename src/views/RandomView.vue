<script>
import { RouterLink } from 'vue-router';
import RandomWheel from '@/components/RandomWheel.vue';

export default {
    components: {
        RouterLink,
        RandomWheel
    },
    data() {
        return {

        }
    }
}
</script>

<template>
    <RouterLink to="/">
        <span>Back</span>
    </RouterLink>
    <h1>Random</h1>
    <RandomWheel />
</template>

<style scoped>
</style>