<script>
import { RouterLink } from 'vue-router'
import IntoleranceCheckbox from './IntoleranceCheckbox.vue'

export default {
  data() {
    return {
      dietPref: '',
      visibility: false,
      allergies: [],
      Intolerce: [
        { id: 'grain', value: 'Grain', title: 'Grain' },
        { id: 'dairy', value: 'Dairy', title: 'Dairy' },
        { id: 'gluten', value: 'Gluten', title: 'Gluten' },
        { id: 'soybeans', value: 'Soybeans', title: 'Soybeans' },
        { id: 'shellfish', value: 'Shellfish', title: 'Shellfish' },
        { id: 'fish', value: 'Fish', title: 'fish' },
        { id: 'eggs', value: 'Eggs', title: 'Eggs' },
        { id: 'peanut', value: 'Peanut', title: 'Peanut' }
      ]
    }
  },
  methods: {
    openform() {
      if (this.visibility == false) this.visibility = true
      else this.visibility = false
    }
  },
  components: {
    RouterLink,
    IntoleranceCheckbox
  }
}
</script>

<template>
  <div>
    <RouterLink to="/">
    <span>Back</span>
  </RouterLink>
  <h2>Do you have any dietary restrictions?</h2>
  <button @click="openform">Dietary restrictions</button>
  <div v-show="visibility">
    <form @submit.prevent="submitForm">
      <span>Dietary preferences</span>

      <input type="radio" value="Vegetarian" v-model="dietPref" />
      <label>Vegetarian</label>

      <input type="radio" value="Vegan" v-model="dietPref" />
      <label>Vegan</label>
      <br />
      <br />
      <span>Allergies</span>
      <div>
        <IntoleranceCheckbox
          v-for="item in Intolerce"
          :key="item.id"
          v-bind="item"
          v-model="allergies"
        />
      </div>
      <pre>{{ allergies }}</pre>
      <br />
      <br />
    </form>
  </div>
  </div>
</template>

<style scoped>
</style>
