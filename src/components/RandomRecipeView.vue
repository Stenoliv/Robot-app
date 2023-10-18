<template>
    <div class="main-container">
        <img :src="image" alt="Image of recipe">
        <div>
            {{ title }}

            <img :src="qr" alt="qr">
        </div>
    </div>
</template>

<script>
export default {
    props: ['title','image','spoonacularSourceUrl'],
    data() {
        return {
            qr: null
        }
    },
    mounted() {
        this.qr = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+this.spoonacularSourceUrl
    }
}
</script>


<style scoped>
    * {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .main-container {
        background-color: #6C3939;
        width: 40vw;
        height: 25vh;
        border-radius: 5vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 25px black;
        margin-left: 10vw;
    }

    .main-container img {
        width: 40%;
        height: 100%;
        object-fit: cover;
        border-radius: 5vh;
    }

    .main-container div {
        width: 60%;
        margin-left: 2vh;
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main-container div img {
        border-radius: 0;
        max-width: 50%;
    }
</style>