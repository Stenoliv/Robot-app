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
                <div v-show="loading" class="loading" >
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
                <div v-show="!loading" class="recipeInstructions">
                    <InstructionStepView v-for="(step, key, index) in analyzedInstructions[0].steps"
                    :key="index"
                    v-bind="step"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InstructionStepView from '@/components/InstructionStepView.vue'
import { getCurrentInstance } from 'vue'
import axios from 'axios'

export default {
    components: {
        InstructionStepView
    },
    props: ['id','title','image','imageType'],
    data() {
        return {
            selected: false,
            information: null,
            loading: true
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
                
                // Parent div controls
                container.refs.container.classList.remove('disableScroll')
                container.refs.container.classList.add('allowScroll')
            } else {
                this.selected = true
                container.refs.empty_space.show()
                
                this.loading = true
                this.requestInformation()

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
        },
        requestInformation() {
            if (this.information != null) {
                this.loading = false
            } else {
                axios.get("https://api.spoonacular.com/recipes/"+ this.id +"/information?includeNutrition=false&apiKey=" + import.meta.env.VITE_API_KEY)
                .then((response) => {
                    console.log(response)
                    this.information = response.data
                    this.loading = false
                    console.log("steps", this.information.analyzedInstructions[0].steps)
                })
                .catch((error) => {
                    console.log(error)
                })
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


    /*Styling for simple view*/
    .simpleView {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: start;
        align-items: center;
    }

    .simpleView img {
        width: 20rem;
        height: 14rem;
        border-radius: 10px;
        margin: 2rem;
    }

    .simpleView h2 {
        width: 80%;
        text-align: start;
        padding-left: 3rem;
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
        background-color: aqua;
        border: 0px solid white;
        border-radius: 10px;
        width: 15%;
        height: 8%;
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
        overflow: auto;
    }

    /* lånad kod från https://loading.io/css/ */
    .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    }
    .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: black;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
    }
    @keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
    }
    @keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
    }

</style>