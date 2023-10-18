<template>
  <div class="cuisine-button-container">
      <div class="radial-checkmark-container">
      </div>
      <input ref="checkbox" :id="id" type="checkbox" :value="value" v-model="model" @click="switchCuisine"/>
      <label :for="id"> {{ title }} </label>
      <span class="checkmark"></span>
  </div>
</template>

<script>
export default {
  props: ['id', 'value', 'title', 'modelValue'],
  emits: ['update:modelValue'],
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(model) {
        this.$emit('update:modelValue', model)
      }
    }
  },
  data() {
      return {
          selected: false,
          bg_color: null,
          bgc_checked: 'rgb('+50+','+120+','+50+')',
          bgc_unchecked: 'rgb('+120+','+50+','+50+')'
      }
  },
  methods: {
      switchCuisine() {
          if (this.selected) {
              this.selected = false
              
              this.bg_color = this.bgc_unchecked
          } else {
              this.selected = true
              
              this.bg_color = this.bgc_checked
          }
      }
  },
  mounted() {
      this.selected = this.$refs.checkbox.checked
      if (this.selected) {
          this.bg_color = this.bgc_checked
      } else {
          this.bg_color = this.bgc_unchecked
      }
  }
}
</script>

<style scoped>
* {
  color: #ccc;
}
.cuisine-button-container {
    background-color: v-bind('bg_color');
    display: flex;
    position: relative;
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    margin: 0.5% 1%;
    padding: 0;
    overflow: hidden;
    height: 55%;
    border-radius: 0.8vw;
}

.cuisine-button-container label {
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: left;
    padding-left: 8;
    align-items: center;
}

.cuisine-button-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.radial-checkmark-container {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.checkmark {
    position: absolute;
    left: 0.5vw;
    height: 2vh;
    width: 2vh;
    background-color: #eee;
    border-radius: 50%;
}

.cuisine-button-container input:checked ~ .checkmark {
    background-color: #2196F3;
}

.checkmark:after {
    content: '';
    position: absolute;
    display: none;
}

.cuisine-button-container input:checked ~ .checkmark:after {
  display: block;
}

.cuisine-button-container .checkmark:after {
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: white;
}

</style>