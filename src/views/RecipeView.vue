<template>
  <SpecialDietForm class="container"/>
  <DisplayRecipe class="RecipeContainer" :recipes="recipes"/>
</template>

<script>
import SpecialDietForm from '@/components/SpecialDietForm.vue'
import DisplayRecipe from '@/components/DisplayRecipes.vue'
import axios from 'axios'

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
      // Användeds som default för att inte API quotan sku ta slut
      recipes: {
        results:[
          {id:782585,title:"Cannellini Bean and Asparagus Salad with Mushrooms",image:"https://spoonacular.com/recipeImages/782585-312x231.jpg",imageType:"jpg"},
          {id:716426,title:"Cauliflower, Brown Rice, and Vegetable Fried Rice",image:"https://spoonacular.com/recipeImages/716426-312x231.jpg",imageType:"jpg"},
          {id:715497,title:"Berry Banana Breakfast Smoothie",image:"https://spoonacular.com/recipeImages/715497-312x231.jpg",imageType:"jpg"},
          {id:715415,title:"Red Lentil Soup with Chicken and Turnips",image:"https://spoonacular.com/recipeImages/715415-312x231.jpg",imageType:"jpg"},
          {id:716406,title:"Asparagus and Pea Soup: Real Convenience Food",image:"https://spoonacular.com/recipeImages/716406-312x231.jpg",imageType:"jpg"},
          {id:644387,title:"Garlicky Kale",image:"https://spoonacular.com/recipeImages/644387-312x231.jpg",imageType:"jpg"},
          {id:715446,title:"Slow Cooker Beef Stew",image:"https://spoonacular.com/recipeImages/715446-312x231.jpg",imageType:"jpg"},
          {id:782601,title:"Red Kidney Bean Jambalaya",image:"https://spoonacular.com/recipeImages/782601-312x231.jpg",imageType:"jpg"},
          {id:795751,title:"Chicken Fajita Stuffed Bell Pepper",image:"https://spoonacular.com/recipeImages/795751-312x231.jpg",imageType:"jpg"},
          {id:766453,title:"Hummus and Za'atar",image:"https://spoonacular.com/recipeImages/766453-312x231.jpg",imageType:"jpg"}
        ],
        offset:0,
        number:10,
        totalResults:5220
      }
    }
  },
  methods: {
    loadInRecipes() {
      axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + import.meta.env.VITE_API_KEY 
        + "&query=" + this.query 
        + "&diet=" + this.diet
        + "&intolerances=" + this.intolerances)
        .then((response) => { 
          this.recipes = response.data
        })
    },
    getDetails(id) {
      axios.get("https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false")
      .then((response) => {
        this.recipes = response.data
      })
    }
  },
  mounted() {
    console.log("loaded")
    console.log(this.recipes)
    //this.loadInRecipes()
  }
}
</script>

<style scoped>
 .container {
    height: 16vh;
  }
  .RecipeContainer {
    height: 84vh;
  }
</style>
