<template>
  <div class="filter-container-main">
    <div class="top-bar">
      <RouterLink to="/">
        <span class="back-button">Back</span>
      </RouterLink>
      <h1>Search for recipes</h1>
      <div class="show-hide-button" @click="toggleFilter()">
        <span v-if="show">Filter</span>
        <span v-else>Open</span>
      </div>
    </div>
    <div class="filter-container" v-if="show">
      <div class="filter-container-left">
        <div class="filter-container-box">
          <div class="filter-containter-search">
            <span>Search For Recipes</span>
            <div>
              <input type="text" id="search-query" placeholder='Example: "pasta" or "rice"...'>
            </div>
          </div>
          <div class="filter-container-max-time">
            <button @click="decrementMaxTime">-</button>
            <span>{{ max_time }}</span>
            <button @click="incrementMaxTime">+</button>
          </div>
        </div>
        <div class="filter-container-box">
          <span>Dietary preferences</span>
          <div class="filter-preferences-container">
            <FilterButton v-for="(diet) in dietary_list"
            :key="diet.id"
            v-bind="diet"
            v-model="dietary"/>
          </div>
        </div>
      </div>
      <div class="filter-container-right">
        <div class="filter-container-box">
          <span>Allergies</span>
          <div class="filter-allergies-container">
            <FilterButton
              v-for="item in Intolerce"
              :key="item.id"
              v-bind="item"
              v-model="allergies"
            />
          </div>
        </div>
        <div class="filter-container-box">
          <span>Cuisines</span>
          <div class="filter-cuisine-container">
            <FilterButton v-for="cuisine in cuisine_list"
            :key="cuisine.id"
            v-bind="cuisine"
            v-model="cuisines"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import FilterButton from '@/components/FilterButton.vue'

export default {
  data() {
    return {
      show: false,
      max_time: 60,
      dietary: [],
      allergies: [],
      cuisines: [],
      dietary_list: [
        { id: 1, value: 'vegetarian', title: 'Vegetarian'},
        { id: 2, value: 'vegan', title: 'Vegan'},
        { id: 3, value: 'gluten free', title: 'Gluten Free'},
      ],
      Intolerce: [
        { id: 'grain', value: 'Grain', title: 'Grain' },
        { id: 'dairy', value: 'Dairy', title: 'Dairy' },
        { id: 'gluten', value: 'Gluten', title: 'Gluten' },
        { id: 'soybeans', value: 'Soybeans', title: 'Soybeans' },
        { id: 'shellfish', value: 'Shellfish', title: 'Shellfish' },
        { id: 'fish', value: 'Fish', title: 'fish' },
        { id: 'eggs', value: 'Eggs', title: 'Eggs' },
        { id: 'peanut', value: 'Peanut', title: 'Peanut' }
      ],
      cuisine_list: [
        { id: 'cuisine-italian', value: 'italian', title: 'Italian'},
        { id: 'cuisine-greek', value: 'greek', title: 'Greek'},
        { id: 'cuisine-american', value: 'american', title: 'American'},
        { id: 'cuisine-indian', value: 'indian', title: 'Indian'},
        { id: 'cuisine-chinese', value: 'chinese', title: 'Chinese'},
        { id: 'cuisine-japansese', value: 'japansese', title: 'Japanese'},
        { id: 'cuisine-thai', value: 'thai', title: 'Thai'},
        { id: 'cuisine-vietnamese', value: 'vietnamese', title: 'Vietnamese'},
      ]
    }
  },
  methods: {
    toggleFilter() {
      if (this.show) {
        this.show = false
        // this.$parent.loadInRecipes()
      } else {
        this.show = true
      }
    },
    incrementMaxTime() {
      this.max_time += 60
    },
    decrementMaxTime() {
      this.max_time -= 60
    }
  },
  components: {
    RouterLink,
    FilterButton
  }
}
</script>

<style scoped>
* {
  --top-button-border-radius: 20px;
  --top-buttons-width: 20vw;
  --top-bar-height: 5vh;
}

.filter-container-main {
  background-color: rgb(133, 170, 202);
  position: relative;
  width: 100vw;
  height: auto;
  margin: 0;
  padding: 0;
  box-shadow: 0px 5px 50px black;
}

.top-bar {
  width: 100%;
  height: var(--top-bar-height);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.back-button {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--top-buttons-width);
  height: var(--top-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: wheat;
  text-decoration: none;
  border-radius: 0px 0px var(--top-button-border-radius) 0px;
}

.show-hide-button {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--top-buttons-width);
  height: var(--top-bar-height);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
  text-decoration: none;
  border-radius: 0px 0px 0px var(--top-button-border-radius);
}

.top-bar h1{
  color: black;
}

.filter-container {
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.filter-container-left {
  width: 49.5%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-right: 0.5%;
}

.filter-container-right {
  width: 49.5%;
  height: 20vh;
  margin-left: 0.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.filter-container-box {
  width: 90%;
  height: 5vh;
  margin: 1vh 0vh;
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: start;
  align-items: center;
}


/* Styles for different parts */

.filter-allergies-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
}

.filter-preferences-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
}

.filter-cuisine-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
}

</style>
