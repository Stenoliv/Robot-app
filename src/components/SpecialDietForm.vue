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
            <input type="text" id="search-query" placeholder='Example: "pasta" or "rice"...' v-model="query">
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
      query: null,
      dietary: [],
      allergies: [],
      cuisines: [],
      dietary_list: [
        { id: 1, value: 'vegetarian', title: 'Vegetarian'},
        { id: 2, value: 'vegan', title: 'Vegan'},
        { id: 3, value: 'gluten free', title: 'Gluten Free'},
      ],
      Intolerce: [
        { id: 'grain', value: 'grain', title: 'Grain' },
        { id: 'dairy', value: 'dairy', title: 'Dairy' },
        { id: 'gluten', value: 'gluten', title: 'Gluten' },
        { id: 'soybeans', value: 'soybeans', title: 'Soybeans' },
        { id: 'shellfish', value: 'shellfish', title: 'Shellfish' },
        { id: 'fish', value: 'fish', title: 'fish' },
        { id: 'eggs', value: 'eggs', title: 'Eggs' },
        { id: 'peanut', value: 'peanut', title: 'Peanut' }
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
        this.$parent.setVariables(this.query, this.max_time, this.allergies, this.dietary, this.cuisines)
        this.$parent.loadInRecipes()
      } else {
        this.show = true
      }
    },
    incrementMaxTime() {
      const currentTime = this.max_time
      if (currentTime < 120) {
        this.max_time += 15
      } else {
        this.max_time += 60
      }
    },
    decrementMaxTime() {
      const currentTime = this.max_time
      if (currentTime <= 15) {
        this.max_time = 15
        return
      }
      if (currentTime > 120) {
        this.max_time -= 60
      } else {
        this.max_time -= 15
      }
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
  --search-radius: 5px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

span {
  font-size: 1.75rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 2.5rem;
}

.filter-container-main {
  background-color: rgb(99, 99, 99);
  position: relative;
  z-index: 1000;
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
  color: wheat;
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
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-right: 0.5%;
}

.filter-container-right {
  width: 49.5%;
  height: 40vh;
  margin-left: 0.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.filter-container-box {
  width: 95%;
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
.filter-containter-search {
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: left;
}


.filter-containter-search span {
  text-decoration: underline;
}

.filter-containter-search input {
  width: 100%;
  height: 50%;
  font-size: 1.2rem;
  border: none;
  border-bottom: var(--search-radius) black solid;
  border-radius: var(--search-radius);
  padding: 0;
  margin: 0;
}

.filter-container-max-time {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.filter-container-max-time span {
  width: 30%;
  height: 35%;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: var(--search-radius) black solid;
  transform: scaleX(1.1);
}

.filter-container-max-time span::after {
  content: " min";
  display: block;
}

.filter-container-max-time button {
  width: 35%;
  height: 40%;
  font-size: 2rem;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-bottom: var(--search-radius) black solid;
  border-left: var(--search-radius) black solid;
  border-radius: var(--search-radius);
}

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
