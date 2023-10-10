<script>
import SpecialDietForm from '../components/SpecialDietForm.vue'
import DisplayRecipe from '../components/DisplayRecipes.vue'

export default {
  components: {
    SpecialDietForm,
    DisplayRecipe
  }
}
</script>

<template>
  <SpecialDietForm class="container"/>
  <DisplayRecipe class="RecipeContainer"/>
</template>

<style scoped>
 .container {
    height: 16vh;
  }
  .RecipeContainer {
    height: 84vh;
  }
</style>
