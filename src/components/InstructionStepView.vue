<template>
    <span>Step: {{ number }}</span>
    <div>
        <span>Ingredients</span>
        <div>
            <IngredientView v-for="(ingredient, key) in ingredients"
            :key="key"
            v-bind="ingredient"/>
        </div>
        <div v-show="length!=null">
            <span>Time</span>
            <span>{{ length }}</span>
        </div>
        <p>{{ step }}</p>
    </div>
</template>

<script>
import IngredientView from '@/components/IngredientView.vue';

export default {
    components: {
        IngredientView
    },
    props: ['equipment','ingredients','length','number','step']
}
</script>

<style scoped>
</style>