<template>
    <div :ref="'scroll_'+id" class="recipeContainer">
        <div :ref="id" class="Recipe active" >
            <div v-if="!selected" class="simpleView" @click="toggleRecipe">
                <img :src="image" alt="Image of food" />
                <h2>{{ title }}</h2>
                <h3 class="prepTime">{{ readyInMinutes }}:Minutes</h3>
            </div>
            <div v-else class="detailedView">
                <div class="simpleView">
                    <img :src="image" alt="Image of food" />
                    <div class="closeRecipeButton" @click="toggleRecipe">X</div>
                    <div class="closeMenu">
                        <h2>{{ title }}</h2>
                        <h3 class="prepTime">{{ readyInMinutes }}:Minutes</h3>
                    </div>
                </div>
                <div class="recipeInstructions">
                    <h2 class="title">Ingredients</h2>
                    <div v-for="(original, key, index) in extendedIngredients" :key="index" class="original">{{ original.original }}</div><br>
                    <h2 class="title">Instructions</h2>
                    <InstructionStepView v-for="(step, key, index) in analyzedInstructions[0].steps"
                    :key="index"
                    v-bind="step"/>
                    <div class="qr-code-container">
                        <h2>Link to recipe</h2>
                        <img v-bind:src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.spoonacularSourceUrl" alt="Qr-Code">
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
    props: ['id','title','image','imageType','original','analyzedInstructions','extendedIngredients','spoonacularSourceUrl','readyInMinutes'],
    data() {
        return {
            selected: false,
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
            height: calc(90vh - var(--recipeGap) * 2);
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
        font-size: 2rem;
        color: whitesmoke;
    }
    .prepTime {
        padding: 0;
        margin: 0;
        font-size: 15px;
        color: whitesmoke;
        padding-right: 1rem;
    }

    /*Styling for simple view*/
    .simpleView {
        display: flex;
        flex-direction: row;
        width: 100%;
        max-height: 30dvh;
        justify-content: start;
        align-items: center;
    }

    .simpleView img {
        width: 40%;
        max-height: 30dvh;
        height: fit-content;
        border-radius: 30px;
    }

    .simpleView h2 {
        width: 80%;
        text-align: start;
        padding-right: 2rem;
    }

    @media screen and (max-width: 1000px) {
        * {
            --recipeGap: 10px;
        }
        .simpleView {
            flex-direction: column;
        }
        .simpleView img {
            max-height: 50dvh;
            border-radius: 0;
            margin: 0;
        }
        .simpleView h2 {
            font-size: 15px;
            text-align: center;
        }
        .closeMenu {
            flex-direction: column;
        }
        .prepTime {
            padding-bottom: 1dvh;
        }

        @media screen and (max-height: 600px) {
            .simpleView {
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            .simpleView h2 {
                text-align: start;
                padding-left: 20px;
            }
            .simpleView img {
                border-radius: 30px;
                height: 100%;
            }
            .prepTime {
                margin: 0;
                padding: 0;
            }
        }
    }

    /*Styling of detailedView for recipe AKA "Opened/Selected" reecipe*/

    .detailedView {
        position: relative;
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
        z-index: 10;
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        background-color: rgb(49, 49, 49);
        border-top-right-radius: 30px;
        border-bottom-left-radius: 10px;
        width: 10%;
        height: 5%;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .recipeInstructions {
        height: 100%;
        width: 96%;
        border-bottom-right-radius: 30px;
        overflow: auto;
        margin: 2%;
        margin-top: 0;
        margin-bottom: 0;
    }

    .recipeInstructions::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        background-color: #F5F5F5;
    }

    .recipeInstructions::-webkit-scrollbar {
        width: 15px;
    }

    .recipeInstructions::-webkit-scrollbar-thumb {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #4d2828;
    }
    
    .original{
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

    @media screen and (max-width: 1000px) {
        .recipeInstructions .title {
            font-size: 5dvw;
            padding: 0;
            margin: 12px;
        }
        .original {
            font-size: 4dvw;
            line-height: 1.5;
            margin: 1dvh;
            margin-left: 8dvw;
            padding: 0;
        }
        .closeRecipeButton {
            margin: 0;
            border-radius: 0;
            border-top-right-radius: 30px;
            border-bottom-left-radius: 10px;
            height: 5%;
        }
        .qr-code-container {
            height: 30dvh;
        }
        .qr-code-container h2 {
            font-size: 3.5dvh;
        }
        .qr-code-container img {
            width: 40dvw;
            height: 40dvw;
        }

        @media screen and (max-height: 600px) {
            .detailedView {
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            .Recipe .detailedView .simpleView {
                width: 30%;
                flex-direction: column;
                margin: 0;
                padding: 0;
            }
            .Recipe .detailedView .simpleView h2 {
                text-align: center;
            }
            .Recipe .detailedView .simpleView img {
                width: 75%;
                border-radius: 10px;
                margin-bottom: 10px;
            }
            .Recipe .detailedView .closeMenu {
                flex-direction: column;
                margin: 0;
                padding: 0;
                width: 100%;
            }
            .Recipe .detailedView .closeMenu h2 {
                font-size: 1rem;
                margin: 0;
                padding: 0;
            }
            .Recipe .detailedView .prepTime {
                margin: 0;
                margin-top: 1rem;
                padding: 0;
            }

            .closeRecipeButton {
                left: 0;
                right: auto;
                border-radius: 0;
                border-top-left-radius: 30px;
                border-bottom-right-radius: 10px;
                height: 10%;
            }

            .recipeInstructions {
                width: 70%;
            }
            .recipeInstructions .title {
                font-size: 1rem;
                margin: 0;
                padding: 0;
            }
            .original {
                font-size: 0.75rem;
                margin: 0;
                padding: 0;
            }

            .qr-code-container {
                height: 35dvh;
            }
            .qr-code-container h2 {
                font-size: 3.5dvh;
            }
            .qr-code-container img {
                width: 30dvh;
                height: 30dvh;
            }
        }
    }
</style>