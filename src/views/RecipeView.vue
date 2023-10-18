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
      query: "",
      diet: "",
      intolerances: "",
      max_time: 60,
      cuisines: "",
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
        + "&cuisine=" + this.cuisines
        + "&maxReadyTime=" + this.max_time
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
        console.log(this.query, this.diet, this.intolerances, this.max_time, this.cuisines)
    },
    setVariables(query, max_time, diet, allergies, cuisine) {
      if (query != "" && query != null) {
        this.query = query
      } else {
        this.query = ""
      }
      this.max_time = max_time
      //Diet filter
      if (diet != "" && diet != null) {
        this.diet = diet.toString()
      } else {
        this.diet = ""
      }
      //Allergies filter
      if (allergies != "" && allergies != null) {
        this.intolerances = allergies.toString()
      } else {
        this.intolerances = ""
      }
      //Cuisine filter
      if (cuisine != "" && cuisine != null) {
        this.cuisines = cuisine.toString()
      } else {
        this.cuisines = ""
      }
    }
  },
  mounted() {
    // load in recipes at page load
    this.loadInRecipes()
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
    margin-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
