<script>
import { RouterLink } from 'vue-router';
import RandomWheel from '@/components/RandomWheel.vue';

export default {
    components: {
        RouterLink,
        RandomWheel
    }
}
</script>

<template>
    <div class="random-container-main">
        <RouterLink to="/" class="back-button">
            <span>Back</span>
        </RouterLink>
        <h1>Random</h1>
    </div>
    <RandomWheel />
</template>


<style scoped>
    * {
        --top-button-border-radius: 20px;
        --top-buttons-width: 20vw;
        --top-bar-height: 5vh;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .random-container-main {
        width: 100%;
        height: var(--top-bar-height);
        background-color: rgb(99, 99, 99);
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: wheat;
        box-shadow: 0 5px 50px black;
    }

    .back-button {
        position: absolute;
        left: 0;
        top: 0;
        width: var(--top-buttons-width);
        height: var(--top-bar-height);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        color: wheat;
        text-decoration: none;
        border-radius: 0px 0px var(--top-button-border-radius) 0px;
        font-size: 1.75rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    @media screen and (max-width: 1000px) {
        .random-container-main {
            font-size: 0.75rem;
        }
        .back-button {
            font-size: 1.2rem;
        }

        @media screen and (max-width: 600px) {
            .random-container-main {
                font-size: 0.75rem;
            }
        }
    }
</style>
