<template>
  <div class="RecipeContainer">
    <div class="underContainer allowScroll" ref="container" @wheel="a">
      <SingleRecipe v-for="(recipe, key) in this.recipes.results"
      :key="key"
      v-bind="recipe"/>
      <EmptySpace ref="empty_space" />
    </div>
  </div>
</template>

<script>
import SingleRecipe from '@/components/SingleRecipe.vue';
import EmptySpace from './EmptySpace.vue';

export default {
  components: {
    SingleRecipe,
    EmptySpace
  },
  props: ['recipes'],
  data() {
    return {
    }
  },
  methods: {
  },
  watch: {
    recipes: function(val) {
      console.log(val.results)
    }
  },
  mounted() {
    console.log(this.recipes)
  }
}
</script>

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
