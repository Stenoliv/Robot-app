<script>
import SingleRecipe from '@/components/SingleRecipe.vue';

export default {
  components: {
    SingleRecipe
  },
  methods: {

  },
  props: [],
  data() {
    return {
      recipes: [
        {id: 1, title: "Pasta"},
        {id: 2, title: "Pasta"},
        {id: 3, title: "Pasta"},
        {id: 4, title: "Pasta"},
        {id: 5, title: "Pasta"},
        {id: 6, title: "Pasta"},
        {id: 7, title: "Pasta"},
        {id: 8, title: "Pasta"},
        {id: 9, title: "Pasta"},
        {id: 10, title: "Pasta"},
        {id: 11, title: "Pasta"},
      ]
    }
  }
}
</script>

<template>
  <div class="RecipeContainer">
    <div class="underContainer allowScroll" ref="container" @wheel="a">
      <SingleRecipe v-for="(recipe,i) in recipes"
        :key="i"
        v-bind="recipe"
      />
    </div>
  </div>
</template>

<style scoped>
  .RecipeContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    overflow: hidden;
  }
  .underContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
  }

  .allowScroll {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .disableScroll {
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
