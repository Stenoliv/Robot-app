<template>
  <div class="container-recipe-view">
    <SpecialDietForm class="container-form"/>
    <DisplayRecipe :recipes="recipes" class="container-recipe-list"/>
  </div>
</template>

<script>
import SpecialDietForm from '@/components/SpecialDietForm.vue'
import DisplayRecipe from '@/components/DisplayRecipes.vue'
import axios from 'axios'
import jsonData from "@/assets/json/request_data.json";

export default {
  components: {
    SpecialDietForm,
    DisplayRecipe
  },
  data() {
    return {
      margin_top: 5 + 'vh',
      query: "",
      diet: "",
      intolerances: "",
      // Användeds som default för att inte API quotan sku ta slut
      recipes: jsonData
    }
  },
  methods: {
    loadInRecipes() {
      axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + import.meta.env.VITE_API_KEY 
        + "&query=" + this.query 
        + "&diet=" + this.diet
        + "&intolerances=" + this.intolerances
        + "&addRecipeInformation=" + true
        + "&instructionsRequired= " + true
        + "&fillIngredients=" + true
        + "&number=" + 10 // How many recipe responses
        )
        .then((response) => {
          if (response.status == 200) {
            this.recipes = response.data
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            console.log('API key required')
          }
        })
    },
    getDetails(id) {
      axios.get("https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false")
      .then((response) => {
        this.recipes = response.data
      })
      .catch((error) => {
        if (error.response.status == 401) {
          console.log('API key required')
        }
      }) 
    },
    toggleMargin(value) {
      console.log('switching margin top')
      if (value) {
        this.margin_top = 25 + 'vh'
      } else {
        this.margin_top = 5 + 'vh'
      }
    }
  },
  mounted() {
    // load in recipes at page load
    // this.loadInRecipes()
  }
}
</script>

<style scoped>
  .container-recipe-view {
    position: relative;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-form {
    position: absolute;
    top: 0;
    width: 100vw;
  }

  .container-recipe-list {
    margin-top: v-bind('margin_top');
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
