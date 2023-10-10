<script>
import { getCurrentInstance } from 'vue'

export default {
    components: {

    },
    props: ['id','title'],
    setup() {
        const instance = getCurrentInstance()
        return {
            instance
        }
    },
    methods: {
        openRecipe() {
            const recipe = this.$refs[this.id]
            const container = this.instance.parent;
            if (recipe.classList.contains('big')) {
                recipe.classList.remove('big')
                
                // Parent controls
                container.refs.container.classList.remove('disableScroll')
                container.refs.container.classList.add('allowScroll')
            } else {
                recipe.classList.add('big')
                
                // Parent controls
                container.refs.container.classList.add('disableScroll')
                container.refs.container.classList.remove('allowScroll')
            }
            recipe.scrollIntoView({ behavior: 'smooth' })
        }
    }
}
</script>

<template>
    <div :ref="id" class="Recipe" @click="openRecipe()">
        <h2>{{ title }}</h2>
    </div>
</template>

<style scoped>
    * {
        color: black;
        --recipeGap: 50px;
    }

    .big {
        height: calc(84vh - var(--recipeGap) / 2);
    }

    .Recipe {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        background-color: beige;
        margin: var(--recipeGap);
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        box-shadow: 0 0 30px black;
        transition: 450ms;
    }
    .Recipe:hover:not(.big) {
        scale: 1.02;
    }

    h2 {
        font-size: 40px;
    }
</style>