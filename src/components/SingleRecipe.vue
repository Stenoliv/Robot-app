<template>
    <div :ref="'scroll_'+id" class="recipeContainer">
        <div :ref="id" class="Recipe active" >
            <div v-if="!selected" class="simpleView" @click="toggleRecipe()">
                <img :src="image" alt="Image of food" />
                <h2>{{ title }}</h2>
            </div>
            <div v-else class="detailedView">
                <div class="simpleView">
                    <img :src="image" alt="Image of food" />
                    <div class="closeMenu">
                        <div class="closeRecipeButton" @click="toggleRecipe()">
                            X
                        </div>
                        <h2>{{ title }}</h2>
                    </div>
                </div>
                <div class="recipeInstructions">
                    <h2 class="title">Ingredients</h2>
                    <div v-for="(original, key, index) in extendedIngredients" :key="index" id="original">{{ original.original }}</div><br>
                    <h2 class="title">Instructions</h2>
                    <InstructionStepView v-for="(step, key, index) in analyzedInstructions[0].steps"
                    :key="index"
                    v-bind="step"/>
                    <div class="qr-code-container">
                        <h2>Link to recipe</h2>
                        <img :src="qr" alt="Qr-Code">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InstructionStepView from '@/components/InstructionStepView.vue'
import { getCurrentInstance } from 'vue'
export default {
    components: {
    InstructionStepView,
},
    props: ['id','title','image','imageType','original','analyzedInstructions','extendedIngredients','spoonacularSourceUrl'],
    data() {
        return {
            selected: false,
            qr: null
        }
    },
    setup() {
        const instance = getCurrentInstance()
        const AnimationDelay = 400
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
            array.forEach( (elem,i) => {
                array[i] = elem.children[0]
            })

            // Toggle functionality
            if (this.selected) {
                this.selected = false
                container.refs.empty_space.hide()
                array.forEach( elem => {
                    if (elem != recipe) {
                        elem.classList.remove('hide')
                        elem.classList.add('active')
                    }
                })
                
                recipe.classList.remove('big')
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        this.$refs['scroll_'+this.id].scrollIntoView({ behavior: 'auto' })
                    }, 20)
                })

                // Parent div controls
                container.refs.container.classList.remove('disableScroll')
                container.refs.container.classList.add('allowScroll')
            } else {
                this.selected = true
                container.refs.empty_space.show()

                // Parent div controls
                container.refs.container.classList.add('disableScroll')
                container.refs.container.classList.remove('allowScroll')
                
                // Add animation to box
                recipe.classList.add('big')
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        this.$refs['scroll_'+this.id].scrollIntoView({ behavior: 'smooth' })
                    }, 20)
                })
                
                // Listen for animation end and hide all other children
                recipe.addEventListener('animationend', () => {
                    array.forEach( elem => {
                        if (elem != recipe) {
                            elem.classList.add('hide')
                            elem.classList.remove('active')
                        }
                    })
                    container.refs.empty_space.hide()
                })
            }
        }
    },
    mounted() {
        this.qr = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+this.spoonacularSourceUrl
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
            height: calc(95vh - var(--recipeGap) * 2);
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
        background-color: #6C3939;
        margin: var(--recipeGap);
        border-radius: 30px;
        transition: var(--transition) ease-in-out;
    }
    .Recipe:hover:not(.big) {
        scale: 1.02;
    }

    h2 {
        font-size: 40px;
        color: whitesmoke;
    }


    /*Styling for simple view*/
    .simpleView {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: start;
        align-items: center;
    }

    .simpleView img {
        width: 50%;
        height: fit-content;
        margin-right: 30px ;
        border-radius: 10%;
    }

    .simpleView h2 {
        width: 90%;
        text-align: start;
        margin-right: 100px;
    }

    /*Styling of detailedView for recipe AKA "Opened/Selected" reecipe*/

    .detailedView {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        width: 100%;
        height: 100%;
    }

    .closeMenu {
        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .closeRecipeButton {
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
        color: white;
        background-color: rgb(49, 49, 49);
        border: 0px solid white;
        border-radius: 10%;
        width: 80px;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .closeRecipeButton:hover {
        cursor: pointer;
    }

    .loading {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-items: center;
    }

    .recipeInstructions {
        height: 100%;
        width: 100%;
        overflow: auto;
        width: 100%;
    }
    #original{
        font-size: 30px;
        margin: 25px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: whitesmoke;
    }
    .title{
        margin: 25px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: whitesmoke;
    }

    .qr-code-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 60vh;
    }

    .qr-code-container img {
        width: 40vh;
        height: 40vh;
        padding-bottom: 5vh;
    }

    .qr-code-container h2 {
        font-size: 3rem;
        padding: 0;
        margin: 0;
    }
</style>