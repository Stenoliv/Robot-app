<template>
    <div :ref="id" class="Recipe active" @click="toggleRecipe()">
        <h2>{{ title }}</h2>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
    components: {

    },
    props: ['id','title'],
    setup() {
        const instance = getCurrentInstance()
        const AnimationDelay = 500
        const cssAnimationDelay = AnimationDelay + 'ms'
        return {
            instance,
            AnimationDelay,
            cssAnimationDelay
        }
    },
    methods: {
        toggleRecipe() {
            const recipe = this.$refs[this.id]
            const container = this.instance.parent;

            if (recipe.classList.contains('big')) {
                recipe.classList.remove('big')
                
                // Parent div controls
                container.refs.container.classList.remove('disableScroll')
                container.refs.container.classList.add('allowScroll')
            } else {
                recipe.classList.add('big')
                
                // Parent div controls
                container.refs.container.classList.add('disableScroll')
                container.refs.container.classList.remove('allowScroll')
            }

            recipe.scrollIntoView({ behavior: 'instant'})

            if (recipe.classList.contains('big')) {
                const array = Array.from(container.refs.container.children)
                setTimeout(() => {
                    if (recipe.classList.contains('big')) {
                        array.forEach( elem => {
                            if (elem != recipe) {
                                elem.classList.add('hide')
                                elem.classList.remove('active')
                            }
                        })
                    }
                }, this.AnimationDelay)
            } else {
                const array = Array.from(container.refs.container.children)
                array.forEach( elem => {
                    if (elem != recipe) {
                        elem.classList.remove('hide')
                        elem.classList.add('active')
                    }
                });
            }
        }
    }
}

</script>

<style scoped>
    * {
        color: black;
        --recipeGap: 50px;
        --transition: v-bind('cssAnimationDelay');
    }

    .big {
        height: calc(86vh - var(--recipeGap));
    }
    .hide {
        display: none;
    }
    .active {
        display: flex;
    }

    .Recipe {
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
        transition: var(--transition) ease-in-out;
    }
    .Recipe:hover:not(.big) {
        scale: 1.02;
    }

    h2 {
        font-size: 40px;
    }
</style>