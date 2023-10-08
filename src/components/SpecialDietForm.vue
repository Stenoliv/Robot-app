<template>
   <h2>Do you have any dietary restrictions?</h2>
   <button @click="openform">Dietary restrictions</button>
   <div v-show="visibility">
      <form @submit.prevent="submitForm">
      <span>Dietary preferences</span>

      <input type="radio" value="Vegetarian" v-model="dietPref"/>
      <label>Vegetarian</label>

      <input type="radio" value="Vegan" v-model="dietPref"/>
      <label>Vegan</label>
      <br>
      <br>
      <span>Allergies</span>
      <input type="checkbox" id="peanut" value="Peanut" v-model="allergies">
      <label for="peanut">Peanut</label>

      <input type="checkbox" id="fish" value="Fish" v-model="allergies">
      <label for="fish">Fish</label>

      <input type="checkbox" id="dairy" value="Dairy" v-model="allergies">
      <label for="dairy">Dairy</label>

      <input type="checkbox" id="gluten" value="Gluten" v-model="allergies">
      <label for="gluten">Gluten</label>

      <br>
      <br>
      <input class="submit" type="submit" value="Submit">
      </form>
   </div>
</template>
<script>


export default{
   data(){
      return{
         dietPref: "",
         visibility: false,
         allergies: []
      }
   },
   methods: {
        openform(){
         if(this.visibility == false)this.visibility = true
         else this.visibility = false
        }
   }
    
}
    
  

</script>
