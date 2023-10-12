<template>
    <div :ref="'scroll_'+id" class="recipeContainer">
        <div :ref="id" class="Recipe active" @click="toggleRecipe()">
            <h2>{{ title + id }}</h2>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
    components: {

    },
    props: ['id','title'],
    data() {
        return {
            selected: false
        }
    },
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
            const array = Array.from(container.refs.container.children)
            array.forEach((elem,i) => {
                array[i] = elem.children[0]
            })

            // Toggle functionality
            if (this.selected) {
                this.selected = false
                array.forEach( elem => {
                    if (elem != recipe) {
                        elem.classList.remove('hide')
                        elem.classList.add('active')
                    }
                })
                
                recipe.classList.remove('big')
                
                // Parent div controls
                container.refs.container.classList.remove('disableScroll')
                container.refs.container.classList.add('allowScroll')

                recipe.scrollIntoView({ behavior: 'instant'})
            } else {
                this.selected = true
                
                // Parent div controls
                container.refs.container.classList.add('disableScroll')
                container.refs.container.classList.remove('allowScroll')
                

                recipe.classList.add('big')
                recipe.addEventListener('animationend', () => {
                    array.forEach( elem => {
                        if (elem != recipe) {
                            elem.classList.add('hide')
                            elem.classList.remove('active')
                        }
                    })
                })
                this.$refs['scroll_'+this.id].scrollIntoView({ behavior: 'smooth'})
            }
        }
    }
}

</script>

<style scoped>
    * {
        color: black;
        --recipeGap: 25px;
        --transition: v-bind('cssAnimationDelay');
    }

    .big {
        animation-name: enlarge;
        animation-duration: var(--transition);
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }

    @keyframes enlarge {
        from {
            height: 20vh;
        }

        to {
            height: calc(86vh - var(--recipeGap) * 3);
        }
    }

    .hide {
        display: none;
    }
    .active {
        display: flex;
    }

    .recipeContainer {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    .Recipe {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        box-shadow: 0 0 var(--recipeGap) black;
        background-color: white;
        margin: var(--recipeGap);
        border-radius: 20px;
        transition: var(--transition) ease-in-out;
    }
    .Recipe:hover:not(.big) {
        scale: 1.02;
    }

    h2 {
        font-size: 40px;
    }
</style>