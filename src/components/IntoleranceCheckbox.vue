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
  }
}
</script>

<template>
  <input type="checkbox" :id="id" :value="value" v-model="model" :key="id" />
  <label for="id">{{ title }}</label>
</template>
