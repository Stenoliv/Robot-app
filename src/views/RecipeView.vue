<script>
import { RouterLink } from 'vue-router'
import SpecialDietForm from '../components/SpecialDietForm.vue'

export default {
  components: {
    RouterLink,
    SpecialDietForm
  }
}
</script>

<template>
  <RouterLink to="/">
    <span>Back</span>
  </RouterLink>
  <h1>Recipe</h1>
  <SpecialDietForm></SpecialDietForm>
</template>

<style scoped></style>
